import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/ui/GridBackground.jsx'
GridBackground
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  // PRODUCTION M DALNE SE PHLE UPDATE KRDENA URI
  uri: "http://localhost:4000/graphql",  //URL of our graphQL server
  cache: new InMemoryCache(), //apollo client uses this to cache query results after fetching them
  credentials:"include", //this tells apollo client to send cookies along with every request to the server
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
    </BrowserRouter>
  </React.StrictMode>,
)
