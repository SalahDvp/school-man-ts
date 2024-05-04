"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
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
import { MultiSelect } from "./multiselect"
import { LoadingButton } from "@/components/ui/loadingButton"
import { useData } from "@/context/admin/fetchDataContext"
import { updateClass, updateStudents, updateTeachers } from "@/lib/hooks/classes"

  
type ClassFormValues = z.infer<typeof classSchema> & { [key: string]: string | Date | number | any;};
interface SheetDemoProps {
    cls: ClassFormValues;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; 
}
const EditClassForm: React.FC<SheetDemoProps> = ({ cls,setOpen,open }) => {

  const form = useForm<any>({
    //resolver: zodResolver(classSchema),
    defaultValues: {
      "name": "Math Class",
      "level": {"name":"Elementary","id":"1"},
      "className": "Mathematics",
      "capacity": 30,
      "teachers": [
        {
          "name": "John Doe",
          "id": "123"
        },
        {
          "name": "Jane Smith",
          "id": "456"
        }
      ],
      "mainTeacher": {
        "name": "SALAH EDDINE  SAID",
        "id": "CY0m1u7BhHmgzxJLhC1W"
    },
      "students": [
        {
          "name": "Alice",
          "id": "001"
        },
        {
          "name": "Bob",
          "id": "002"
        }
      ]
    }
  })
const{levels,teachers,students,setClasses,setStudents,setTeachers,profile}=useData()
const allTeachers=teachers.map((teacher:any)=>({name:teacher.teacher,id:teacher.id}))
  const allStudents=students.map((student:any)=>({name:student.student,id:student.id}))
const {toast}=useToast()
const { reset,formState,watch} = form;
const {isSubmitting}=formState
const [selectedTeachers, setSelectedTeachers] = React.useState<({ name: string; id: string; }|undefined)[]>(form.getValues('teachers'));
React.useEffect(() => {
  reset(cls)
}, [cls])
React.useEffect(() => {

  const subscription =  watch((value:any) => {setSelectedTeachers(value.teachers)});
  return () => subscription.unsubscribe();
}, [watch]);


async function onSubmit(values:ClassFormValues) {
  const { value, label, ...updatedData } = values;
 const levelData=levels.find((level:any)=>level.id===values.level.id)

  await updateClass(updatedData,values.id)
  const updatedStudents= await updateStudents(cls.students,values.students,{...cls,level:levelData})
  const updatedTeachers= await updateTeachers(cls.teachers,values.teachers,cls)
updatedStudents.added.map((student)=>{
  setStudents((prev:any[]) => {
    const updatedLevels = prev.map((std:any) =>
      std.id === student.id ? { ...std,
        amountLeftToPay: levelData.fee,
        totalAmount: levelData.fee,
        startDate: levelData.start,
        nextPaymentDate: levelData.start,
        lastPaymentDate: levelData.start,
        level:levelData.level,
        class:{name:values.name,id:values.id}}: std
    );
    return updatedLevels;
  });
})
updatedStudents.deleted.map((student)=>{
  setStudents((prev:any[]) => {
    const updatedLevels = prev.map((std:any) =>
      std.id === student.id ? { ...std,
        amountLeftToPay: 0,
        totalAmount: 0,
        startDate:new Date(),
        nextPaymentDate: new Date(),
        lastPaymentDate: new Date(),
        level:null,
        class:null}: std
    );
    return updatedLevels;
  });
})
updatedTeachers.added.forEach((teacher) => {

  setTeachers((prev:any[]) => {
      const updatedLevels = prev.map((std:any) =>
        std.id === teacher.id ? { ...std,
          class: {
              name: values.name,
              id: values.id
          }
      }: std
      );
      return updatedLevels;
    });
  });
  updatedTeachers.deleted.forEach((teacher) => {

    setTeachers((prev:any[]) => {
        const updatedLevels = prev.map((std:any) =>
          std.id === teacher.id ? { ...std,
            class:null
        }: std
        );
        return updatedLevels;
      });
    });

    setClasses((prev:any[]) => {
      const updatedLevels = prev.map((std:any) =>
        std.id === values.id ? updatedData: std
      );
      return updatedLevels;
    });
  toast({
        title: "changes applied!",
        description: `changes applied Successfully`,
      });
      

  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>


    <SheetContent className="sm:max-w-[850px]">
    <ScrollArea className="h-screen  ">

      <SheetHeader>
        <SheetTitle>Edit Class</SheetTitle>
        <SheetDescription>
          Enter the details for the class, including information and subjects of study.
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
                defaultValue={JSON.stringify(levels.find((level:any)=>level.id===field.value.id))}
                  onValueChange={(value) => {        
                    const parsedValue = JSON.parse(value);
                    const level={level:parsedValue.level,id:parsedValue.id}
                    field.onChange(level);
                  }}
          
                        >
                          <FormControl>
                            <SelectTrigger
                              id={`level`}
                              aria-label={`Select level`}
                            >
                              <SelectValue placeholder="Select level"   />
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
                            {profile.classNames.map((cls:any) => (
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
                  defaultValue={JSON.stringify(selectedTeachers.find((teacher)=>teacher?.id===field.value.id))}
                  onValueChange={(value) => {

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

export default EditClassForm
