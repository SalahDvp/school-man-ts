
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
import TeacherForm from "./components/TeacherForm"
import { useState } from "react"
import SheetDemo from "./components/editTeacher"
import { Overview } from "./components/area-chart"


 function Dashboard() {

  const [open,setOpen]=useState(false)

  return (
  

    <div className="flex flex-row min-h-screen w-full flex-col bg-muted/40">
      <SheetDemo open={open} setOpen={setOpen}/>
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
   
        <div className="grid flex items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="flex grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      
              <Card
                x-chunk="dashboard-05-chunk-0"
              >
      <CardHeader className="pb-2">
      <CardDescription>Teachers</CardDescription>
                  <Overview/>
           
           
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">15 </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Teached Classes
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={80} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">45 </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Teached Classses
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={67} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card
             x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Create Teacher</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
            Anyone with the link can create this document.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between"> {/* Adjust flex properties */}
    <div className=" flex-grow">
      <Input value="http://example.com/link/to/document" readOnly     />
    </div>
    <Button variant="secondary" className="shrink-0">
      Copy Link
    </Button>
  </CardFooter>
              </Card>
            </div>
      
      
        
         
          <DataTableDemo setOpen={setOpen}/>

        

          </div>

          <TeacherForm />


       




        </div>
      </div>
    </div>
 
  )
}
export default Dashboard