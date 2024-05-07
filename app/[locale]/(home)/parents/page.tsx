"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DataTableDemo } from "./components/parent-table"
import ParentForm from "./components/parentForm"
import { Overview } from "./components/area-chart"
import { useData } from "@/context/admin/fetchDataContext";
import { useTranslations } from "next-intl"

 function Dashboard() {

  const {invoices} = useData()
  const data = Object.values(invoices);
const t=useTranslations()
// Function to calculate the total sum of amountLeftToPay in the records array
function calculateTotalAmountLeftToPay(records: any[]) {
  // Use reduce to sum up all amountLeftToPay values
  const totalAmountLeftToPay = records.reduce((accumulator, record) => {
    return accumulator + (record.amountLeftToPay || 0); // Ensure it doesn't throw errors if value is undefined or null
  }, 0);

  return totalAmountLeftToPay;
}

const totalLeftamountTopay = calculateTotalAmountLeftToPay(data);
console.log("Total amount left to pay:", totalLeftamountTopay);


function calculateTotalAmountPaid(records: any[]) {
  // Use reduce to sum up all amountLeftToPay values
  const totalAmountToPaid = records.reduce((accumulator, record) => {
    return accumulator + (record.paymentAmount|| 0); // Ensure it doesn't throw errors if value is undefined or null
  }, 0);

  return totalAmountToPaid;
}

const totalamountPaid= calculateTotalAmountPaid(data);
console.log("Total amount left to pay:", totalamountPaid);
  
const total = totalamountPaid + totalLeftamountTopay

  return (
  
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('parents')}</h2>
      </div>
   
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      
              <Card
                x-chunk="dashboard-05-chunk-0"
              >
      <CardHeader className="pb-2">
      <CardDescription>{t('parents')}</CardDescription>
                  <Overview/>
           
           
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>{t('paid')}</CardDescription>
                  <CardTitle className="text-2xl">{totalamountPaid} DZD </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('this-month')} </div>
                </CardContent>
                <CardFooter>
                  <Progress value={total/totalamountPaid} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>{t('not-paid')}</CardDescription>
                  <CardTitle className="text-2xl">{totalLeftamountTopay} DZD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('total-amount-to-be-paid-by-the-end-of-the-year')} </div>
                </CardContent>
                <CardFooter>
                  <Progress value={total/totalLeftamountTopay} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card
             x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>{t('create-parent')}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
            {t('anyone-with-the-link-can-create-this-document')} </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between"> {/* Adjust flex properties */}
    <div className=" flex-grow">
      <Input value="http://example.com/link/to/document" readOnly     />
    </div>
    <Button variant="secondary" className="shrink-0">
      {t('copy-link')} </Button>
  </CardFooter>
              </Card>
            </div>
      
      
        
         
          <DataTableDemo/>
        

          </div>
          <div>
          <ParentForm />
          </div>
          </main>
    </div>
 
  )
}
export default Dashboard