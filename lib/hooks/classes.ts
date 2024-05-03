import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import classSchema from "@/validators/classSchema";
import { z } from "zod";
type ClassFormValue=z.infer<typeof classSchema>
export const addClass = async (cls:ClassFormValue) => {
    try {
        const classRef = await addDoc(collection(db, "Classes"), cls);
        console.log("class added successfully:", classRef.id);
        return classRef.id; // Assuming you want to return the ID of the added class
    } catch (error) {
        console.error("Error adding class:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateClass = async(updatedclass:ClassFormValue,classId:string)=>{
    try {
            await updateDoc(doc(db, "classs",classId), updatedclass);
        console.log("class updated successfully:");
        return true; // Assuming you want to return the ID of the added class
    } catch (error) {
        console.error("Error updating class:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteClass = async(classId:string)=>{
    try {
            await deleteDoc(doc(db, "Classs",classId));
        console.log("class deleted successfully:");
        return true; // Assuming you want to return the ID of the added class
    } catch (error) {
        console.error("Error deleting class:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}