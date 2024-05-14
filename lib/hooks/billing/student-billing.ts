import { db } from "@/firebase/firebase-config"
import { addDoc, collection, deleteDoc, doc, increment, updateDoc } from "firebase/firestore"
import { studentPaymentSchema } from "@/validators/studentPaymentSchema";
import { z } from "zod";
function getMonthInfo(date:Date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth(); // Get the month index (0-11)
    const monthName = months[monthIndex];
    const monthAbbreviation = monthName.slice(0, 3); // Get the first three characters for the abbreviation
    return { fullName: monthName, abbreviation: monthAbbreviation };
  }
type StudentPaymentFormValues = z.infer<typeof studentPaymentSchema> & {documents?:any[]};
export const addPaymentTransaction = async (transaction:StudentPaymentFormValues,months:any[]) => {
    try {
        const month=getMonthInfo(transaction.paymentDate)

        const transactionRef = await addDoc(collection(db, "Billing","payments","Invoices"),{...transaction,student:{student:transaction.student.student,
            id:transaction.student.id,nextPaymentDate:transaction.student.nextPaymentDate},paymentPlan:{period:transaction.paymentPlan.period,name:transaction.paymentPlan.name,price:transaction.paymentPlan.price}
        });
        await updateDoc(doc(db, "Billing", "analytics"), {
            totalIncome: increment(transaction.paymentAmount),
            [`data.${month.abbreviation}.income`]: increment(transaction.paymentAmount)
        });
        await updateDoc(doc(db, "Students", transaction.student.id), {
            nextPaymentDate: transaction.nextPaymentDate,
            amountLeftToPay: transaction.amountLeftToPay - transaction.paymentAmount,
            ...Object.fromEntries(
                months.map((month) => [`monthly_payments.${month}.status`, 'Paid'])
            )
        });
        await updateDoc(doc(db,"Parents",transaction.parent.id),{
            totalPayment:increment(transaction.paymentAmount)
        })
        console.log("parent added successfully:");
        return transactionRef.id; // Assuming you want to return the ID of the added parent
    } catch (error) {
        console.error("Error adding parent:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    }
    
};
export const updateStudentInvoice = async(updatedtransaction:StudentPaymentFormValues,transactionID:string,oldSalary:number)=>{
    try {
        const month=getMonthInfo(updatedtransaction.paymentDate)
           await updateDoc(doc(db, "Billing","payments","Invoices",transactionID), updatedtransaction);

    if(oldSalary!=updatedtransaction.paymentAmount){
        await updateDoc(doc(db,"Students",updatedtransaction.student.id),{
            amountLeftToPay:increment(updatedtransaction.paymentAmount-oldSalary)
        })
        await updateDoc(doc(db,"Parents",updatedtransaction.parent.id),{
            totalPayment:increment(updatedtransaction.paymentAmount-oldSalary)
        })
        await updateDoc(doc(db, "Billing","analytics"), {

            [`data.${month.abbreviation}.income`]: increment(updatedtransaction.paymentAmount-oldSalary),
            totalIncome: increment(updatedtransaction.paymentAmount-oldSalary),
        });
    }
             
        console.log("Tracher Salary updated successfully:",transactionID);
        return true; // Assuming you want to return the ID of the added Tracher Salary
    } catch (error) {
        console.error("Error updating Teacher:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}
export const deleteTeacherSalary = async(transactionID:string)=>{
    try {
            await deleteDoc(doc(db,  "Billing","payments","Invoices",transactionID));
        console.log("Tracher Salary deleted successfully:");
        return true; // Assuming you want to return the ID of the added Tracher Salary
    } catch (error) {
        console.error("Error deleting Tracher Salary:", error);
        // Handle the error here, such as displaying a message to the user or logging it for further investigation
        throw error; // Optionally re-throw the error to propagate it further if needed
    } 
}