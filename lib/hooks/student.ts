import { db } from "@/firebase/firebase-config"
import { z } from "zod";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import  studentRegistrationSchema  from "@/validators/auth";

type StudentFormValues = z.infer<typeof studentRegistrationSchema>;
export const addStudent = async (student:StudentFormValues) => {
    try {
        const studentRef = await addDoc(collection(db, "Students"), student);
        console.log("Student added successfully:", studentRef.id);
        return studentRef.id; // Assuming you want to return the ID of the added Student
    } catch (error) {
        console.error("Error adding Student:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateStudent = async(updatedstudent:StudentFormValues,studentId:string)=>{
    try {
            await updateDoc(doc(db, "Students",studentId), updatedstudent);
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