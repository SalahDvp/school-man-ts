"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { auth } from '@/firebase/firebase-config'
import {  onAuthStateChanged,} from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/lib/auth";
import { getDocs,collection,query,where,orderBy,getDoc} from 'firebase/firestore';
import { db } from "@/firebase/firebase-config"

export const AppContext = createContext();

// Create the provider component
export const  FetchDataProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const getLevels = async () => {
      try {
        const levelsSnapshot = await getDocs(collection(db, 'Levels'));
      
        const levelsData = levelsSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           start:new Date(doc.data().start.toDate()),
           end:new Date(doc.data().end.toDate()),
           registrationDeadline:new Date(doc.data().registrationDeadline.toDate())}));
           console.log('Levels data:', levelsData);
        setLevels(levelsData);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    getLevels();
  }, []);

  return (
    <AppContext.Provider value={{levels,setLevels}}>
      {children}
    </AppContext.Provider>
  );
};
export const  useData =()=>{


 
    const value=useContext(AppContext)
    try{
    if(!value){
        throw new Error("Error not wrapped inside layout  ",)
    }   }catch(e){
        console.log(e);
    }
    return value
}
