"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { auth } from '@/firebase/firebase-config'
import {  onAuthStateChanged,} from "firebase/auth";


export const AppContext = createContext();

// Create the provider component
export const  AppProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  useEffect(()=>{

   const unsub=onAuthStateChanged(auth,(user)=>{
      if(user){
     
          setUser(user)
          setIsAuthenticated(true)
      }else{
          setIsAuthenticated(false)
          setUser(null)
      }
   })
  },[])
 
  return (
    <AppContext.Provider value={{user,isAuthenticated}}>
      {children}
    </AppContext.Provider>
  );
};
export const  useAuth =()=>{


 
    const value=useContext(AppContext)
    try{
    if(!value){
        throw new Error("Error not wrapped inside layout  ",)
    }   }catch(e){
        console.log(e);
    }
    return value
}
