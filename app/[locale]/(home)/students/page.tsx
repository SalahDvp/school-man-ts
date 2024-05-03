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
import  StudentForm  from "./components/studentForm"
import { useState } from "react"
import SheetDemo from "./components/editStudent"
import { Overview } from "./components/area-chart"
import { Breadcrumb,BreadcrumbList ,BreadcrumbLink,BreadcrumbItem,BreadcrumbSeparator,BreadcrumbPage} from "@/components/ui/breadcrumb"
import Link from "next/link"


function Dashboard() {
  const [open,setOpen]=useState(false)
  return (
  
    <div className="flex-1 space-y-4 p-8 pt-6">

<div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Students</h2>

          </div>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        
            <Card
                x-chunk="dashboard-05-chunk-0"
              >
      <CardHeader className="pb-2">
      <CardDescription>Students</CardDescription>
                  <Overview/>
           
           
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card
             x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Create student</CardTitle>
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