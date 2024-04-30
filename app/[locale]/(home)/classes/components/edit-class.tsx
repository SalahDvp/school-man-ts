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

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
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
  import { useFieldArray,} from "react-hook-form";
  import { ScrollArea } from "@/components/ui/scroll-area";
import classSchema from "@/validators/classSchema"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MultiSelect } from "./multiselect"
import { json } from "stream/consumers"
import { LoadingButton } from "@/components/ui/loadingButton"

 

// Array of teachers with names and IDs
const allTeachers = [
    { name: "Teacher 1", id: "1" },
    { name: "Teacher 2", id: "2" },
    { name: "Teacher 3", id: "3" },
  ];
  
  // Array of students with names and IDs
  const students = [
    { name: "Student A", id: "101" },
    { name: "Student B", id: "102" },
    { name: "Student C", id: "103" },
  ];
  const classNames = [
    "Class A",
    "Class B",
    "Class C",
    "Class D",
    "Class E",
    "Class F",
    "Class G",
    "Class H",
    "Class I",
    "Class J"
  ];
  // Array of levels with names and IDs
  const levels = [
    {
      id: "123",
      name: "Intermediate",
      start: "2024-05-01",
      end: "2024-07-31",
      fee: 100,
      status: "open",
      registrationDeadline: "2024-04-30",
      subjects: [
        { value: "math", label: "Mathematics" },
        { value: "sci", label: "Science" }
      ],
      prices: [
        { name: "Monthly", period: "1 month", price: 30 },
        { name: "Quarterly", period: "2 months", price: 80 },
        { name: "Semester", period: "4 months", price: 150 },
        { name: "Annual", period: "1 year", price: 250 }
      ]
    },
    {
      id: "456",
      name: "Beginner",
      start: "2024-06-15",
      end: "2024-08-30",
      fee: 80,
      status: "open",
      registrationDeadline: "2024-06-01",
      subjects: [
        { value: "art", label: "Art" },
        { value: "music", label: "Music" }
      ],
      prices: [
        { name: "Monthly", period: "1 month", price: 25 },
        { name: "Quarterly", period: "2 months", price: 70 },
        { name: "Semester", period: "4 months", price: 120 },
        { name: "Annual", period: "1 year", price: 200 }
      ]
    },
    {
      id: "789",
      name: "Advanced",
      start: "2024-04-01",
      end: "2024-09-30",
      fee: 150,
      status: "closed",
      registrationDeadline: "2024-03-15",
      subjects: [
        { value: "eng", label: "English" },
        { value: "hist", label: "History" }
      ],
      prices: [
        { name: "Monthly", period: "1 month", price: 40 },
        { name: "Quarterly", period: "2 months", price: 110 },
        { name: "Semester", period: "4 months", price: 200 },
        { name: "Annual", period: "1 year", price: 350 }
      ]
    },
    // Add more levels as needed
  ];
  
type ClassFormValues = z.infer<typeof classSchema>;
interface SheetDemoProps {
    cls: ClassFormValues;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; 
}
const EditClassForm: React.FC<SheetDemoProps> = ({ cls,setOpen,open }) => {

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: cls
  })

const {toast}=useToast()
const { reset, handleSubmit, control, formState,getValues,setValue,register,watch} = form;
const {isSubmitting}=formState
const [selectedTeachers, setSelectedTeachers] = React.useState<({ name: string; id: string; }|undefined)[]>(form.getValues('teachers'));

React.useEffect(() => {

  const subscription =  watch((value:any) => {console.log(value);setSelectedTeachers(value.teachers)});
  return () => subscription.unsubscribe();
}, [watch]);


function onSubmit(values:ClassFormValues) {
    console.log(values)
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
      
                  onValueChange={(value) => {
                   console.log(JSON.parse(value));
                   
                    const parsedValue = JSON.parse(value);
                    const level={name:parsedValue.name,id:parsedValue.id}
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
                            {levels.map((level,index) => (
                              <SelectItem key={index} value={JSON.stringify(level)}>
                                {level.name}
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
                            {classNames.map((cls) => (
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
                 options={students}
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
