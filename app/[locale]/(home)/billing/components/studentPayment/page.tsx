
"use client"
import React from "react"

import StudentPaymentForm from "./components/studentPaymentForm"
import { StudentPaymentTable } from "./components/studentPaymentTable"


import {TransactionDataTableDemo} from './components/transactionTable'
import EditStudentPaymentForm from './components/editStudentPaymentForm'

 function Studentpayment() {

  return (
  
    <div className="flex flex-row min-h-screen w-full flex-col ">


      <div className="flex flex-col sm:gap-4 sm:py-4 ">
   
        <div className="grid flex items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="flex grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

        
         
          <StudentPaymentTable />
          <TransactionDataTableDemo />

        

          </div>

          <StudentPaymentForm />


       




        </div>
      </div>
    </div>

     


       
 
  )
}
export default Studentpayment


//