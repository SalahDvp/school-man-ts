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
import { DataTableDemo } from "./components/table"
import StudentForm from "./components/studentForm"
import { useState } from "react"
import SheetDemo from "./components/editStudent"
import { Overview } from "./components/area-chart"
import {useTranslations} from "next-intl"
import { useData } from "@/context/admin/fetchDataContext";
function Dashboard() {
  const [open,setOpen]=useState(false)
  const t=useTranslations()
  const {students,classes,profile}= useData()

  console.log('num of classes',classes.length);
  const number_of_students = students.length
  const number_of_classes = classes.length
  const avrPerClass = (number_of_students/number_of_classes).toFixed(2)
  const school_capacity = profile.capacity
  return (
  
    <div className="flex-1 space-y-4 p-8 pt-6">

<div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{t('Students')}</h2>

          </div>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        
            <Card
                x-chunk="dashboard-05-chunk-0"
              >
      <CardHeader className="pb-2">
      <CardDescription>{t('Students')}</CardDescription>
                  <Overview/>
           
           
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>{t('total-students')}</CardDescription>
                  <CardTitle className="text-4xl">{number_of_students}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                     </div>
                </CardContent>
                <CardFooter>
                  <Progress value={(number_of_students/school_capacity)*100} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>{t('studetns-per-class')}</CardDescription>
                  <CardTitle className="text-4xl">{avrPerClass}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('average-number-of-students-per-class')} </div>
                </CardContent>
                <CardFooter>
                  <Progress value={(avrPerClass/25)*100} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card
             x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>{t('create-student')}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
            {t('Anyone with the link can create this document.')}

                  </CardDescription>
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
            <DataTableDemo setOpen={setOpen}/>
            <SheetDemo open={open} setOpen={setOpen}/>
          </div>
          <div>
        <StudentForm/>
          </div>
        </main>
      </div>


  )
}
export default Dashboard