

import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, updateDoc ,setDoc,increment} from "firebase/firestore"
import { teacherPaymentRegistrationSchema } from "@/validators/teacherSalarySchema";
import { z } from "zod";






type TeacherSalaryFormValues = z.infer<typeof  teacherPaymentRegistrationSchema>;
export const addTeacherSalary = async (transaction:TeacherSalaryFormValues) => {
    try {
        const teacherTransRef = await addDoc(collection(db, "Billing","payouts","TeachersTransactions"), transaction);
        await setDoc(doc(db, "Teachers", transaction.teacher.id, "TeacherSalary", teacherTransRef.id), {   ref: teacherTransRef.id, }); 
    
        // Reference to the added document
        console.log("Tracher Salary added successfully:",teacherTransRef.id );    
        await updateDoc(doc(db, "Billing", "payouts"), {
            teachersExpenses: increment(transaction.salaryAmount),
            
        });
        await updateDoc(doc(db, "Billing","analytics"), {
            totalExpenses:increment(transaction.salaryAmount),
            [`data.${transaction.monthOfSalary}.expenses`]: increment(transaction.salaryAmount)

        });
        /*await updateDoc(doc(db, "Billing", "analytics"), {
            totalIncome: increment(transaction.paymentAmount),
            "data.jan.income": increment(transaction.paymentAmount)
        });
        await updateDoc(doc(db,"Teachers",transaction.student.id),{
            nextPaymentDate:transaction.nextPaymentDate,
            amountLeftToPay:transaction.amountLeftToPay-transaction.paymentAmount
        })

        [`data.${month}.expenses`]
        
        */
        return teacherTransRef;
        // Assuming you want to return the ID of the added Tracher Salary
    } catch (error) {
        console.error("Error adding Tracher Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateTeacherSalary = async(updatedtransaction:TeacherSalaryFormValues,transactionID:string)=>{
    try {
            await updateDoc(doc(db, "Billing","payouts","TeachersTransactions",transactionID), updatedtransaction);
        console.log("Tracher Salary updated successfully:");
        return true; // Assuming you want to return the ID of the added Tracher Salary
    } catch (error) {
        console.error("Error updating Teacher:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteTeacherSalary = async(transactionID:string)=>{
    try {
            await deleteDoc(doc(db, "Billing","payouts","TeachersTransactions",transactionID));
        console.log("Tracher Salary deleted successfully:");
        return true; // Assuming you want to return the ID of the added Tracher Salary
    } catch (error) {
        console.error("Error deleting Tracher Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}

//function increment(salaryAmount: any) {
//    throw new Error("Function not implemented.");
//}


