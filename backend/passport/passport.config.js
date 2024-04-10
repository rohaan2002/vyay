import passport from "passport";
import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

import {GraphQLLocalStrategy} from 'graphql-passport'

export const configurePassport =async()=>{
    passport.serializeUser((user,done)=>{
        console.log("Serializing User"); //Typically, it serializes the user object to a unique identifier (such as the user's ID) and stores it in the session cookie.
        // The serialized user data is then sent to the client and stored in the session.
        done(null, user.id)
    });

    passport.deserializeUser(async(id,done)=>{
      try{
        const user = await User.findById(d);   //It takes the serialized user data (usually the user's ID) stored in the session and retrieves the corresponding user object from the database or any other data source.
        done(null,user)
      }  catch(err){
        done(err);
      }
    })

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            try{
                const user = await User.findOne({username})
                if(!user) throw new Error("Invalid Username or password")

                const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword) throw new Error("Invalid Username or password")

                return done(null, user);
            }catch(err){
                return done(err);
            }
        })
    )
}