
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DataTableDemo } from "./components/table"
import PaymentForm from "./components/teacher-salary-form"
import { Overview } from "./components/area-chart"
import { useTranslations } from "next-intl"
import { useData } from "@/context/admin/fetchDataContext";



 function TeacherSalaryDashBoard() {

const t=useTranslations()
const{teachers,analytics}=useData()
const number_of_teachers = teachers.length
const total_teacher_expences = analytics.teachersExpenses
const total_expences = analytics.totalExpenses
console.log("number_of_teachers",number_of_teachers);
console.log("total_teacher_expences",total_teacher_expences);
console.log("total_expences",total_expences);
const persentageofTeacheeExpPertotal =( (total_teacher_expences/total_expences)*100).toFixed(2)




  return (
  

    <div className="flex flex-row min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
   
        <div className="grid flex items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="flex grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      
              <Card
                x-chunk="dashboard-05-chunk-0"
              >
      <CardHeader className="pb-2">
      <CardDescription>{t('teacher-payments')}</CardDescription>
                  <Overview/>
           
           
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>{t('total-teacher-expences')}</CardDescription>
                  <CardTitle className="text-4xl">{total_teacher_expences} DZD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('this-year')} </div>
                </CardContent>
                <CardFooter>
                  <Progress value={80} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>{t('number-of-teachers')}</CardDescription>
                  <CardTitle className="text-4xl">{number_of_teachers}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('this-year')} </div>
                </CardContent>
                <CardFooter>
                  <Progress value={67} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>{t('the-teacher-expenses-percentage')}</CardDescription>
                  <CardTitle className="text-4xl">{persentageofTeacheeExpPertotal} %</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('teacher-expenses-over-total-expenses')}s</div>
                </CardContent>
                <CardFooter>
                  <Progress value={67} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
      
        
         
          <DataTableDemo />

        

          </div>

          <PaymentForm />


       




        </div>
      </div>
    </div>
 
  )
}
export default TeacherSalaryDashBoard