import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, increment, updateDoc } from "firebase/firestore"
import { studentPaymentSchema } from "@/validators/studentPaymentSchema";
import { z } from "zod";
type StudentPaymentFormValues = z.infer<typeof studentPaymentSchema> & {documents?:any[]};
export const addPaymentTransaction = async (transaction:StudentPaymentFormValues) => {
    try {
        const transactionRef = await addDoc(collection(db, "Billing","payments","Invoices"),{...transaction,student:{student:transaction.student.student,
            id:transaction.student.id,nextPaymentDate:transaction.student.nextPaymentDate},paymentPlan:{period:transaction.paymentPlan.period,name:transaction.paymentPlan.name,price:transaction.paymentPlan.price}
        });
        await updateDoc(doc(db, "Billing", "analytics"), {
            totalIncome: increment(transaction.paymentAmount),
            "data.jan.income": increment(transaction.paymentAmount)
        });
        await updateDoc(doc(db,"Students",transaction.student.id),{
            nextPaymentDate:transaction.nextPaymentDate,
            amountLeftToPay:transaction.amountLeftToPay-transaction.paymentAmount
        })
        console.log("parent added successfully:");
        return transactionRef.id; // Assuming you want to return the ID of the added parent
    } catch (error) {
        console.error("Error adding parent:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
// export const updateParent = async(updatedparent:ParentFormValues,parentId:string)=>{
//     try {
//             await updateDoc(doc(db, "Parents",parentId), updatedparent);
//         console.log("parent updated successfully:");
//         return true; // Assuming you want to return the ID of the added parent
//     } catch (error) {
//         console.error("Error updating parent:", error);
//         // Handle the error here, such as displaying a message to the user or logging it for further investigation
//         throw error; // Optionally re-throw the error to propagate it further if needed
//     } 
// }
// export const deleteParent = async(parentId:string)=>{
//     try {
//             await deleteDoc(doc(db, "Parents",parentId));
//         console.log("parent deleted successfully:");
//         return true; // Assuming you want to return the ID of the added parent
//     } catch (error) {
//         console.error("Error deleting parent:", error);
//         // Handle the error here, such as displaying a message to the user or logging it for further investigation
//         throw error; // Optionally re-throw the error to propagate it further if needed
//     } 
// }