import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {buildContext} from 'graphql-passport';
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from './db/connectDB.js';
import { configurePassport } from './passport/passport.config.js';


dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
})

store.on("error", (err)=> console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave:false,  //if this set to true, then for every request, even if it session is not modified in the request, a session will be saved to store, and one user might end up having multiple session. best to have it as FALSE
    saveUninitialized:false,  //specifies whether to use uninitialized sessions to the store
    cookie: {
      maxAge: 1000*60*60*24*7,  //7days in milliseconds
      httpOnly: true //prevents cross site scripting attack(XSS)
    }
  })
)

app.use(passport.initialize());
app.use(passport.session());



const server = new ApolloServer({
    typeDefs: mergedTypeDefs, 
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors({
    origin: "http://localhost:5173",
    credentials: true
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => buildContext({req}),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/`);

