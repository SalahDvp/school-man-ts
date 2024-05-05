"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {PlusCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

  import { ScrollArea } from "@/components/ui/scroll-area";
import classSchema from "@/validators/classSchema"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { MultiSelect } from "./multiselect"
import { LoadingButton } from "@/components/ui/loadingButton"
import { useData } from "@/context/admin/fetchDataContext"
import { addClass } from "@/lib/hooks/classes"



  
export type ClassFormValues = z.infer<typeof classSchema>;
export function ClassForm() {
  const{levels,teachers,students,setClasses,setStudents,setTeachers,profile}=useData()
  const allTeachers=teachers.map((teacher:any)=>({name:teacher.teacher,id:teacher.id}))
  const allStudents=students.map((student:any)=>({name:student.student,id:student.id}))
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
        teachers: [],
        students: [],
  
},
  })

const {toast}=useToast()
const { reset, formState,watch} = form;
const {isSubmitting}=formState
const [selectedTeachers, setSelectedTeachers] = React.useState<({ name: string; id: string; }|undefined)[]>(form.getValues('teachers'));

React.useEffect(() => {

  const subscription =  watch((value:any) => {console.log(value);
   setSelectedTeachers(value.teachers)});
  return () => subscription.unsubscribe();
}, [watch]);


async function onSubmit(values:ClassFormValues) {
  const classRef=await addClass(values)
  setClasses((prev:ClassFormValues[])=>[{...values,id:classRef,
    value:values.className,
    label:values.className,
    level:{level:values.level.level,id:values.level.id},
    levelName:values.level.level},...prev])
    values.students.forEach((student) => {

    setStudents((prev:any[]) => {
                const updatedLevels = prev.map((std:any) =>
                  std.id === student.id ? { ...std,
                    amountLeftToPay: values.level.fee,
                    totalAmount: values.level.fee,
                    startDate: values.level.start,
                    nextPaymentDate: values.level.start,
                    lastPaymentDate: values.level.start,
                    level:values.level.level,
                    class:{name:values.name,id:classRef}}: std
                );
                return updatedLevels;
              });
            });
            values.teachers.forEach((teacher) => {

            setTeachers((prev:any[]) => {
                const updatedLevels = prev.map((std:any) =>
                  std.id === teacher.id ? { ...std,
                    class: {
                        name: values.name,
                        id: classRef
                    }
                }: std
                );
                return updatedLevels;
              });
            });
    toast({
        title: "changes applied!",
        description: `changes applied Successfully`,
      });
        reset()

  }
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button className="gap-1">
        
      <PlusCircle className="h-3.5 w-3.5" />
      
                    Add Class
             
      </Button>
    </SheetTrigger>
    <SheetContent className="sm:max-w-[850px]">
    <ScrollArea className="h-screen  ">

      <SheetHeader>
        <SheetTitle>Add New Class</SheetTitle>
        <SheetDescription>
          Enter the details for the new class, including information and subjects of study.
        </SheetDescription>
      </SheetHeader>
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                              <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>class level</FormLabel>
                  <FormControl>
                  <Select
      
                  onValueChange={(value) => {
                   console.log(JSON.parse(value));
                   
                    const parsedValue = JSON.parse(value);
                    const level=parsedValue
                    field.onChange(level);
                  }}
          
                        >
                          <FormControl>
                            <SelectTrigger
                              id={`level`}
                              aria-label={`Select level`}
                            >
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {levels.map((level:any,index:number) => (
                              <SelectItem key={index} value={JSON.stringify(level)}>
                                {level.level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                      <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class </FormLabel>
                  <FormControl>
                  <Select
                      onValueChange={field.onChange}
                        value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              id={`className`}
                              aria-label={`Select class`}
                            >
                              <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {profile.classNames.map((cls:string) => (
                              <SelectItem key={cls} value={cls}>
                                {cls}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                  <Input {...field} placeholder="Enter capacity of class"  type="number"  onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
    control={form.control}
    name="teachers"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Select Teachers</FormLabel>
                <MultiSelect
                    selected={field.value}
                 options={allTeachers}
                    {...field}
                    className="sm:w-[510px]"
                />
            <FormMessage />
        </FormItem>
    )}
 />
                         <FormField
              control={form.control}
              name="mainTeacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Teacher</FormLabel>
                  <FormControl>
                  <Select
      
                  onValueChange={(value) => {
                   console.log(value);
                   
                    const parsedValue = JSON.parse(value);
                    const mainteacher={name:parsedValue.name,id:parsedValue.id}
                    field.onChange(mainteacher);
                  }}
     
                        >
                          <FormControl>
                            <SelectTrigger
                              id={`mainTeacher`}
                              aria-label={`Select Main Teacher`}
                            >
                              <SelectValue placeholder="Select Main Teacher" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {selectedTeachers.map((teacher,index) => (
                              <SelectItem key={index} value={JSON.stringify(teacher)}>
                                {teacher && teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
    control={form.control}
    name="students"
    render={({ field }) => (
        <FormItem>
            <FormLabel>add students</FormLabel>
                <MultiSelect
                    selected={field.value}
                 options={allStudents}
                    {...field}
                    className="sm:w-[510px]"
                />
            <FormMessage />
        </FormItem>
    )}
 />

         
<SheetFooter className=" pb-20">
            <SheetClose asChild>
              
              <LoadingButton
                loading={isSubmitting}
                type="submit"
    
              >
                  Save changes
              </LoadingButton>
              </SheetClose>
              </SheetFooter>
      </form>
    </Form>
    
    </ScrollArea>
    </SheetContent>
  </Sheet>
  )
}
