

import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc ,setDoc,increment} from "firebase/firestore"
import { PaymentRegistrationSchema } from "@/validators/paymentSchema";
import { z } from "zod";
import { getMonthInfo } from "./teacherPayment";




type PaymentFormValues = z.infer<typeof  PaymentRegistrationSchema> & {documents?:any};
export const addPayment = async (transaction:PaymentFormValues) => {
    try {
        const month=getMonthInfo(transaction.paymentDate)
        const paymentTransRef = await addDoc(collection(db, "Billing","payouts","Payout"), transaction);
    
        // Reference to the added document
        const key = transaction.typeofPayment; 
        console.log("Payout Salary added successfully:",paymentTransRef.id );  
        await updateDoc(doc(db, "Billing", "payouts"), {
            
            [key]: increment(transaction.paymentAmount),
            
        });
        await updateDoc(doc(db, "Billing","analytics"), {
            totalExpenses:increment(transaction.paymentAmount),
            [`data.${month.abbreviation}.expenses`]: increment(transaction.paymentAmount)

        });
            return paymentTransRef.id; 
    } catch (error) {
        console.error("Error adding Payout Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updatePayment = async(updatedtransaction:PaymentFormValues,transactionID:string,oldAmount:number)=>{
    try {
        const month=getMonthInfo(updatedtransaction.paymentDate)

            await updateDoc(doc(db, "Billing","payouts","Payout",transactionID), updatedtransaction);
       
            if(oldAmount!=updatedtransaction.paymentAmount){
                await updateDoc(doc(db, "Billing", "payouts"), {
                    teachersExpenses: increment(updatedtransaction.paymentAmount-oldAmount),
                    
                });
                await updateDoc(doc(db, "Billing","analytics"), {
                    totalExpenses:increment(updatedtransaction.paymentAmount-oldAmount),
                    [`data.${month.abbreviation}.expenses`]: increment(updatedtransaction.paymentAmount-oldAmount)
        
                });
            }
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