import { db } from "@/firebase/firebase-config"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import levelSchema from "@/validators/level";
import { z } from "zod";
type LevelFormValues = z.infer<typeof levelSchema>;
export const addLevel = async (level:LevelFormValues) => {
    try {
        const levelRef = await addDoc(collection(db, "Levels"), level);
        console.log("Level added successfully:", levelRef.id);
        return levelRef.id; // Assuming you want to return the ID of the added level
    } catch (error) {
        console.error("Error adding level:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateLevel = async(updatedLevel:LevelFormValues,levelId:string)=>{
    try {
            await updateDoc(doc(db, "Levels",levelId), updatedLevel);
        console.log("Level updated successfully:");
        return true; // Assuming you want to return the ID of the added level
    } catch (error) {
        console.error("Error adding level:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}