"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { auth } from '@/firebase/firebase-config'
import {  onAuthStateChanged,} from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/lib/auth";
import { getDocs,collection,query,where,orderBy,getDoc,doc} from 'firebase/firestore';
import { db } from "@/firebase/firebase-config"

export const AppContext = createContext();

// Create the provider component
export const  FetchDataProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const [parents,setParents]=useState([]);
  const [teachers,setTeachers]=useState([]);
  const [students,setStudents]=useState([]);
  const [teachersSalary,setTeachersSalary]=useState([]);
  const [payouts,setPayouts]=useState([]);
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

    const getParents = async () => {
      try {
        const parentsSnapshot = await getDocs(collection(db, 'Parents'));
      
        const parentsData = parentsSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           parent: `${doc.data().firstName} ${doc.data().lastName}`}))
       
     
          //console.table(parentsData);
        setParents(parentsData)
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };


    const getTeachers = async () => {
      try {
        const teachersSnapshot = await getDocs(collection(db, 'Teachers'));
      
        const TeachersData = teachersSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           joiningDate:new Date(doc.data().joiningDate.toDate()),
           teacher: `${doc.data().firstName} ${doc.data().lastName}`}))
       
     
          //console.table(parentsData);
        setTeachers(TeachersData)
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };

   const getStudents = async () => {
      try {
        const studentSnapshot = await getDocs(collection(db, 'Students'));
      
        const StudentsData = studentSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           joiningDate:new Date(doc.data().joiningDate.toDate()),
           lastPaymentDate:new Date(doc.data().joiningDate.toDate()),
           nextPaymentDate:new Date(doc.data().joiningDate.toDate()),
           startDate:new Date(doc.data().joiningDate.toDate()),
           student: `${doc.data().firstName} ${doc.data().lastName}`}))
       
     
          console.table(StudentsData);
        setStudents(StudentsData)
      } catch (error) {
        console.error('Error fetching Students:', error);
      }
    };



    const getTeachersSalary = async () => {
      try {
        const teachersSalarySnapshot = await getDocs(collection(db, "Billing","payouts","TeachersTransactions"));
      
        const TeachersSalaryData = teachersSalarySnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           
           //dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           //joiningDate:new Date(doc.data().joiningDate.toDate()),
           //teacher: `${doc.data().firstName} ${doc.data().lastName}`
          }))
       
     
          //console.table(parentsData);
          setTeachersSalary(TeachersSalaryData)
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };


    const getPayouts = async () => {
      try {
        const PayoutsSnapshot = await getDocs(collection(db, "Billing","payouts","Payout"));
      
      
        const PayoutsData = PayoutsSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           
           payment: `${doc.data().firstName} ${doc.data().lastName}`}))
       
     
          //console.table(parentsData);
        setPayouts(PayoutsData)
      } catch (error) {
        console.error('Error fetching Payouts:', error);
      }
    };
    
    getLevels();
    getParents();
    getTeachers();
    getStudents(); 
    getTeachersSalary();
    getPayouts();

  }, []);


  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileSnapshot = await getDoc(doc(db, 'Profile','GeneralInformation'));
      
        
           
        setProfile({...profileSnapshot.data(),id:profileSnapshot.id})
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();
  }, []);


  


  return (
    <AppContext.Provider value={{levels,setLevels,profile,setProfile,setParents,parents,teachers,setTeachers,students,setStudents,teachersSalary,setTeachersSalary,payouts,setPayouts}}>
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
