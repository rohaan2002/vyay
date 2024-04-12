import { useState } from 'react'
import {Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import TransactionPage from './pages/TransactionPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Header from './components/ui/Header.jsx'
import { useQuery } from '@apollo/client'
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query.js'
import {Toaster} from 'react-hot-toast';

function App() {
  const {loading,data,error} = useQuery(GET_AUTHENTICATED_USER);
  
  console.log("Loading: ",loading);
  console.log("Data of Authenticated User: ",data);
  console.log("Error is: ", error);

  if(loading) return null;

 

  return (
    <>
    {data?.authUser && <Header/>}
      <Routes>
        <Route path="/" element={data?.authUser? <HomePage/>: <Navigate to= '/login'/>}/>
        {/* <Route path="/" element={<HomePage/>}/> */}
        <Route path="/login" element={!data.authUser? <LoginPage/>: <Navigate to='/'/>}/>
        <Route path="/signup" element={!data.authUser?<SignUpPage/>: <Navigate to ='/'/>}/>
        <Route path="/transaction/:id" element={data.authUser? <TransactionPage/>: <Navigate to ='/login'/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
