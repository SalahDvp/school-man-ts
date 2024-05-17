import { db } from "@/firebase/firebase-config"
import { z } from "zod";
import { addDoc, arrayUnion, collection, deleteDoc, doc, increment, updateDoc } from "firebase/firestore"
import studentRegistrationSchema from "@/validators/auth";

type StudentFormValues = z.infer<typeof studentRegistrationSchema> & {documents?:any[]};
export const addStudent = async (student:StudentFormValues) => {
    try {
        const studentRef = await addDoc(collection(db, "Students"), student);
        await updateDoc(doc(db,"Parents",student.parentId),{
            children:arrayUnion({name:`${student.firstName} ${student.lastName}`,id:studentRef.id})
        })
        console.log("Student added successfully:", studentRef.id);
        return studentRef.id; // Assuming you want to return the ID of the added Student
    } catch (error) {
        console.error("Error adding Student:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateStudent = async(updatedstudent:StudentFormValues,studentId:string,student:any,level:any)=>{
    try {
            await updateDoc(doc(db, "Students",studentId), updatedstudent);
            const shortMonth = updatedstudent.joiningDate.toLocaleDateString('en', { month: 'short' });
            if (updatedstudent.feedingFee === 'Paid' && student.feedingFee === 'notPaid') {
                    await updateDoc(doc(db,"Billing","analytics"),{
                        totalIncome: increment(level.feedingFee),
                        [`data.${shortMonth}.income`]: increment(level.feedingFee)
                        
                    })
              }
              
              if (updatedstudent.registrationAndInsuranceFee === 'Paid' && student.registrationAndInsuranceFee === 'NotPaid') {
                await updateDoc(doc(db,"Billing","analytics"),{
                    totalIncome: increment(level.registrationAndInsuranceFee),
                    [`data.${shortMonth}.income`]: increment(level.registrationAndInsuranceFee)
                    
                })
              }
              
        console.log("Student updated successfully:");
        return true; // Assuming you want to return the ID of the added Student
    } catch (error) {
        console.error("Error updating Student:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteStudent = async(studentId:string)=>{
    try {
            await deleteDoc(doc(db, "Students",studentId));
        console.log("Student deleted successfully:");
        return true; // Assuming you want to return the ID of the added Student
    } catch (error) {
        console.error("Error deleting Student:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}