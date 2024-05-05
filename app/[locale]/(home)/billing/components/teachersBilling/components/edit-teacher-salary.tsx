
"use client"
import React,{useState,useCallback, useEffect} from "react"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Form,FormField,FormItem,FormControl,FormLabel,FormMessage } from "@/components/ui/form"
import ImageUpload from "@/app/[locale]/(home)/students/components/uploadFile"
import {useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { teacherPaymentRegistrationSchema } from "@/validators/teacherSalarySchema"
import CalendarDatePicker from "@/app/[locale]/(home)/students/components/date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
import { z } from "zod";
const fieldNames = [
    "salaryTitle",
    "salaryAmount",
    "salaryDate",
    "typeofTransaction",
    "monthOfSalary",
    "fromWho",
    "teacher"
];
type FormKeys = "salaryTitle" | "salaryAmount" | "salaryDate" | "typeofTransaction" | "monthOfSalary" | "fromWho";
 
type TeacherSalaryFormValues = {
  id: string;
  salaryTitle: string;
  salaryAmount: number;
  salaryDate: Date;
  typeofTransaction: string;
  monthOfSalary: string;
  fromWho: string;
  status: string;
  teacher: {
    name: string;
    id: string;
  };
  [key: string]: string | number | Date | { name: string; id: string } | undefined;
};
  

interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }

  const teachers = [
    {
      id: "1",
      label: "Mr. Smith",
      value: "Mr. Smith",
      subject: "Mathematics",
    },
    {
      id:"2",
      label: "Ms. Johnson",
      value: "Ms. Johnson",
      subject: "English",
    },
    {
      id: "3",
      label: "Mrs. Brown",
      value:"Mrs. Brown",
      subject: "Science",
    },
    {
      id: "4",
      label: "Mr. Davis",
      value: "Mr. Davis",
      subject: "History",
    },
    {
      id: "5",
      label: "Ms. Wilson",
      value:"Ms. Wilson",
      subject: "Physical Education",
    },
  ];
  
  const Typeofpayments = [
    {
      value: "Salary",
      label: "Salary",
    },
    {
      value: "Other",
      label: "other",
    },
    
  ];

  const MonthOfYear = [
    {
      value: "01",
      label: "January",
    },
    {
      value: "02",
      label: "February",
    },
    {
      value: "03",
      label: "March",
    },
    {
      value: "04",
      label: "April",
    },
    {
      value: "05",
      label: "May",
    },
    {
      value: "06",
      label: "June",
    },
    {
      value: "07",
      label: "July",
    },
    {
      value: "08",
      label: "August",
    },
    {
      value: "09",
      label: "September",
    },
    {
      value: "10",
      label: "October",
    },
    {
      value: "11",
      label: "November",
    },
    {
      value: "12",
      label: "December",
    },
  ];
    
  const Salarystatus =[
    
    {
      value:"paid"  ,
      label: "Paid",
    },
    {
      value:"notPaid"  ,
      label: "Not Paid",
    },
  ]
  
  const teacher:TeacherSalaryFormValues = {
   
     // Assuming a valid date string or Date objec
     id:"dqweqew",
     salaryTitle: "Monthly Salary",
     salaryAmount: 5000,
     salaryDate: new Date(),
     typeofTransaction: "Bank Transfer",
     monthOfSalary: "April",
     fromWho: "Company XYZ",
     status:"paid",
     teacher:{name:"joi",id:"2222"}
    
  };
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open }) => {
  const { toast } = useToast();
  const [status, setstatus] = useState(false);
const [monthModal,setMonthModal]=useState(false)
const [teacherModal,setTeacherModal]=useState(false)

  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);

    const form =useForm<TeacherSalaryFormValues>({
      resolver: zodResolver(teacherPaymentRegistrationSchema),
           defaultValues:teacher
      
    });
    const {formState,setValue,getValues } = form;
    const { isSubmitting } = formState;


    const renderInput = (fieldName:string, field:any) => {
        switch (fieldName) {
          case "salaryDate":
            return (
              <CalendarDatePicker
                {...field}
                date={getValues("salaryDate")}
                setDate={(selectedValue) => {
                  if (selectedValue === undefined) {
                    // Handle undefined case if needed
                  } else {
                    form.setValue(fieldName, selectedValue);
                  }
                }}
              />
            );
    
          case "monthOfSalary": 
          return (
            <Combobox
            {...field}
            open={monthModal}
            setOpen={setMonthModal}
            placeHolder="Month"
            options={MonthOfYear}
            value={getValues("monthOfSalary")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }} 
          />
          );
    
          case "status":
            return (
              <Combobox
                {...field}
                open={status}
                setOpen={setstatus}
                placeHolder="status"
                options={Salarystatus}
                value={getValues("status")}
                onSelected={(selectedValue) => {
                  form.setValue(fieldName, selectedValue);
                }} // Set the value based on the form's current value for the field
              />
            );
            case "teacher":
              return (
                <Combobox
                  {...field}
                    open={teacherModal}
                    setOpen={setTeacherModal}
                  placeHolder="Teacher"
                  options={teachers}
                  value={getValues("teacher").name}
                  onSelected={(selectedValue) => {
                    const selectedTeacher = teachers.find(
                        (teacher) => teacher.value === selectedValue
                      );
                   {selectedTeacher && form.setValue(fieldName, {name:selectedTeacher?.value,id:selectedTeacher?.id})}
                  }} // Set the value based on the form's current value for the field
                />
              );
            
          case "typeofTransaction":
            return (
              <Combobox
                {...field}
                open={openTypeofpayment}
                setOpen={setOpenTypeofpayment}
                placeHolder="Typeofpayment"
                options={Typeofpayments}
                value={getValues("typeofTransaction")}
                onSelected={(selectedValue) => {
                  form.setValue(fieldName, selectedValue);
                }}
              />
            );
            case "salaryAmmount":
                return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)
               

          default:
            return <Input {...field} />;
        }
      };

  
      const getChanges = (currentValues:  TeacherSalaryFormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !==teacher[key]) {
            changes += `${key}: ${teacher[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
    function onSubmit(data: TeacherSalaryFormValues) {
        const changes = getChanges(data);
            alert(changes);
            toast({
                title: "changes applied!",
                description: `changes applied Successfully ${changes}`,
              })
      }

    
  return (
    <Sheet open={open}  onOpenChange={setOpen}  >
   
   <SheetContent className=" sm:max-w-[650px]">
      <ScrollArea className="h-screen pb-20 "> 
        <SheetHeader>
          <SheetTitle>Edit payment</SheetTitle>
          <SheetDescription>
            Make changes to your payment here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
            <form>
           
          {fieldNames.map((fieldName,index) => (
             <FormField
             key={index}
             control={form.control}
             name={fieldName as FormKeys} 
             
             render={({ field }) => (
              <FormItem style={{marginBottom:15}} >
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl  >
                      {renderInput( fieldName, field )}
                      </FormControl>
           
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
              ))}
          
            </form>
          </Form>
{/*  <ImageUpload/> */}

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            
          <LoadingButton loading={isSubmitting} type="submit"    onClick={form.handleSubmit(onSubmit)}>
            Save changes
      </LoadingButton>
          </SheetClose>
        </SheetFooter>
        </ScrollArea>
      </SheetContent>
      
    </Sheet>
  )
}
export default SheetDemo