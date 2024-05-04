

import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc ,setDoc} from "firebase/firestore"
import { PaymentRegistrationSchema } from "@/validators/paymentSchema";
import { z } from "zod";




type PaymentFormValues = z.infer<typeof  PaymentRegistrationSchema>;
export const addPayment = async (transaction:PaymentFormValues) => {
    try {
        const paymentTransRef = await addDoc(collection(db, "Billing","payouts","Payout"), transaction);
    
        // Reference to the added document
            console.log("Payout Salary added successfully:",paymentTransRef.id );    
        return paymentTransRef;
        
        
        // Assuming you want to return the ID of the added Payout Salary
    } catch (error) {
        console.error("Error adding Payout Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updatePayment = async(updatedtransaction:PaymentFormValues,transactionID:string)=>{
    try {
            await updateDoc(doc(db, "Billing","payouts","Payout",transactionID), updatedtransaction);
        console.log("Payout Salary updated successfully:");
        return true; // Assuming you want to return the ID of the added Payout Salary
    } catch (error) {
        console.error("Error updating payment:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deletePayment = async(transactionID:string)=>{
    try {
            await deleteDoc(doc(db, "Billing","payouts","Payout",transactionID));
        console.log("Payout Salary deleted successfully:");
        return true; // Assuming you want to return the ID of the added Payout Salary
    } catch (error) {
        console.error("Error deleting Payout Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}

function increment(salaryAmount: any) {
    throw new Error("Function not implemented.");
}
