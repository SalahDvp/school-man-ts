"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { getDocs,collection,query,where,orderBy,getDoc, doc} from 'firebase/firestore';
import { db } from "@/firebase/firebase-config"
import {subDays} from "date-fns"

export const AppContext = createContext();

// Create the provider component
export const  FetchParentDataProvider = ({ children,user }) => {
  const [date, setDate] = useState({
    from: subDays(new Date(), 30), // 30 days ago
    to: new Date(), // Today's date
  });
  const [parent,setParent]=useState()

  useEffect(() => {
    const getParentData = async () => {
        try {
            const parentRef = await getDoc(doc(db, "Parents", "BlqHXj53EeNZwO9fodEh"));
            const parentData = { ...parentRef.data(), id: parentRef.id };
            console.log("parent", parentData);

            // Fetch data for each child if children array exists and is not empty
            if (parentData.children && parentData.children.length > 0) {
                const updatedChildren = await Promise.all(parentData.children.map(async (child) => {
                    const childDoc = await getDoc(doc(db, "Students", child.id));
                    const docData = childDoc.data();
                    console.log("data",child.id);
                    return {
                        ...docData,
                        id: childDoc.id,
                        dateOfBirth: docData.dateOfBirth ? new Date(docData.dateOfBirth.toDate()) : null,
                        joiningDate: docData.joiningDate ? new Date(docData.joiningDate.toDate()) : null,
                        lastPaymentDate: docData.lastPaymentDate ? new Date(docData.lastPaymentDate.toDate()) : null,
                        nextPaymentDate: docData.nextPaymentDate ? new Date(docData.nextPaymentDate.toDate()) : null,
                        startDate: docData.joiningDate ? new Date(docData.joiningDate.toDate()) : null,
                        student: `${docData.firstName} ${docData.lastName}`,
                        value: `${docData.firstName} ${docData.lastName}`,
                        label: `${docData.firstName} ${docData.lastName}`,
                        name:`${docData.firstName} ${docData.lastName}`,
                    };
                }));
                setParent({
                    ...parentData,
                    children: updatedChildren,
                });
            }
        } catch (error) {
            console.error("Error fetching parent data:", error);
        }
    };

    getParentData();
}, []);

return (
    <AppContext.Provider value={{date,setDate,parent,setParent}}>
      {children}
    </AppContext.Provider>
  );
};
export const  useParentData =()=>{
    const value=useContext(AppContext)
    try{
    if(!value){
        throw new Error("Error not wrapped inside layout  ",)
    }   }catch(e){
        console.log(e);
    }
    return value
}
