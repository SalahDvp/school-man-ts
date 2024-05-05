import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ParentRegistrationSchema } from "@/validators/parentSchema";
import { z } from "zod";
type ParentFormValues = z.infer<typeof ParentRegistrationSchema> & {documents?:any[]};
export const addParent = async (parent:ParentFormValues) => {
    try {
        const parentRef = await addDoc(collection(db, "Parents"), parent);
        console.log("parent added successfully:", parentRef.id);
        return parentRef.id; // Assuming you want to return the ID of the added parent
    } catch (error) {
        console.error("Error adding parent:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateParent = async(updatedparent:ParentFormValues,parentId:string)=>{
    try {
            await updateDoc(doc(db, "Parents",parentId), updatedparent);
        console.log("parent updated successfully:");
        return true; // Assuming you want to return the ID of the added parent
    } catch (error) {
        console.error("Error updating parent:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteParent = async(parentId:string)=>{
    try {
            await deleteDoc(doc(db, "Parents",parentId));
        console.log("parent deleted successfully:");
        return true; // Assuming you want to return the ID of the added parent
    } catch (error) {
        console.error("Error deleting parent:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}