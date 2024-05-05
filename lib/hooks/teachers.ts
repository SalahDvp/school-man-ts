import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { teacherRegistrationSchema } from "@/validators/teacherSchema";
import { z } from "zod";
type TeacherFormValues = z.infer<typeof teacherRegistrationSchema> & {documents?:any[]};
export const addTeacher = async (teacher:TeacherFormValues) => {
    try {
        const teacherRef = await addDoc(collection(db, "Teachers"), teacher);
        console.log("Teacher added successfully:", teacherRef.id);
        return teacherRef.id; // Assuming you want to return the ID of the added Teacher
    } catch (error) {
        console.error("Error adding Teacher:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateTeacher = async(updatedteacher:TeacherFormValues,teacherId:string)=>{
    try {
            await updateDoc(doc(db, "Teachers",teacherId), updatedteacher);
        console.log("Teacher updated successfully:");
        return true; // Assuming you want to return the ID of the added Teacher
    } catch (error) {
        console.error("Error updating Teacher:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteTeacher = async(teacherId:string)=>{
    try {
            await deleteDoc(doc(db, "Teachers",teacherId));
        console.log("Teacher deleted successfully:");
        return true; // Assuming you want to return the ID of the added Teacher
    } catch (error) {
        console.error("Error deleting Teacher:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}