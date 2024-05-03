"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { getDocs,collection,query,where,orderBy,getDoc, doc} from 'firebase/firestore';
import { db } from "@/firebase/firebase-config"



export const AppContext = createContext();

// Create the provider component
export const  FetchDataProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const [parents,setParents]=useState([])
  const [students,setStudents]=useState([]);
  useEffect(()=>{
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
           student: `${doc.data().firstName} ${doc.data().lastName}`,
           value: `${doc.data().firstName} ${doc.data().lastName}`,
           label: `${doc.data().firstName} ${doc.data().lastName}`,
          
        }))
setStudents(StudentsData)
       
      } catch (error) {
        console.error('Error fetching Students:', error);
      }
    };
    
    getStudents(); 
  },[])


  useEffect(() => {
    const getLevels = async () => {
      try {
        const levelsSnapshot = await getDocs(collection(db, 'Levels'));
      
        const levelsData = levelsSnapshot.docs.map((doc) => ({ ...doc.data(),
           value:doc.data().level,
           label:doc.data().level,
           id: doc.id,
           start:new Date(doc.data().start.toDate()),
           end:new Date(doc.data().end.toDate()),
           registrationDeadline:new Date(doc.data().registrationDeadline.toDate())}));
   
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
           parent: `${doc.data().firstName} ${doc.data().lastName}`,
           value: `${doc.data().firstName} ${doc.data().lastName}`,
           label: `${doc.data().firstName} ${doc.data().lastName}`,

          }))
       
     
          //console.table(parentsData);
        setParents(parentsData)
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
    getLevels();
    getParents();
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
  console.log(students);
  return (
    <AppContext.Provider value={{levels,setLevels,setParents,parents,profile,setProfile,students,setStudents}}>
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
