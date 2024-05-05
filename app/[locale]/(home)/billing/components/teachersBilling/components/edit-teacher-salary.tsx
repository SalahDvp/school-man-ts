
"use client"
import React,{useState,useCallback} from "react"
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
import { updateTeacherSalary } from "@/lib/hooks/teacherPayment"
import { useData } from "@/context/admin/fetchDataContext"
const fieldNames = [
    "teacher",
    "salaryTitle",
    "salaryAmount",
    "salaryDate",
    "typeofTransaction",
    "monthOfSalary",
    "fromWho",
    
];
type FormKeys = "salaryTitle" | "salaryAmount" | "salaryDate" | "typeofTransaction" | "monthOfSalary" | "fromWho";
 

  
type TeacherSalaryFormValues = z.infer<typeof teacherPaymentRegistrationSchema> & { [key: string]: string | Date | number;}
interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
    teacherSalary:TeacherSalaryFormValues
  }

  
  
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
  
 


const SheetDemo: React.FC<openModelProps> = ({ setOpen,open,teacherSalary }) => {
  const { toast } = useToast();
  const{setTeachersSalary}=useData()
  const {teachers}= useData()

  console.log("transaction",teacherSalary)

  const [status, setstatus] = useState(false);
  const [monthModal,setMonthModal]=useState(false)
  const [teacherModal,setTeacherModal]=useState(false)
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);

    const form =useForm<TeacherSalaryFormValues>({
      resolver: zodResolver(teacherPaymentRegistrationSchema),
           defaultValues:{
         
           }
    });
    const {formState,setValue,getValues,reset } = form;
    const { isSubmitting } = formState;

    React.useEffect(() => {
      reset(teacherSalary)
      console.log("reset",teacherSalary);
    }, [teacherSalary])

    const teacherNames = teachers.map((teacher_: { firstName: string; lastName: string; id:string}) => {
      // Combine and trim first and last name to remove leading/trailing spaces
      const combinedName = `${teacher_.firstName.trim()} ${teacher_.lastName.trim()}`;
    
      return {
        label: combinedName, // For use in UI components like dropdowns
        value: combinedName, // For use as a form value or ID
        id: teacher_.id,
      };
    });

    

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
              options={teacherNames}
              value={getValues("teacher")?.name} 
              onSelected={(selectedValue) => {
                const selectedTeacher = teacherNames.find(
                    (teacher:any) => teacher.value === selectedValue
                  );
               {selectedTeacher && form.setValue("teacher", {name:selectedTeacher?.value,id:selectedTeacher?.id})}
              }}
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
          if (currentValues[key] !==teacherSalary[key]) {
            changes += `${key}: ${teacherSalary[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
      async function onSubmit(data: TeacherSalaryFormValues) {
        const changes = getChanges(data);
        await updateTeacherSalary(data,data.id)
        setTeachersSalary((prev:any) => {
          const updatedTeachers = prev.map((teacherSalary:TeacherSalaryFormValues) =>
          teacherSalary.id === data.id? {...data,teacherSalary:`${data.firstName} ${data.lastName}`} : teacherSalary
          );
          return updatedTeachers;
        });
          toast({
              title: "Changes Applied!",
              description: "Changes Applied Successfully",
            })
        
            setOpen(false)

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
          
              <ImageUpload/>

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