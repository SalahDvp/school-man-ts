
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
import ImageUpload from "./uploadFile"
import {useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {PaymentRegistrationSchema } from "@/app/validators/authPayment"
import CalendarDatePicker from "./date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
type FormKeys =
|"Paymenttitle"
|"Paymentamount"
|"Typeofpayment"
|"Paymentdate"
|"Fromwho"
|"towho"
|"status"
|"MonthOfPayment ";
  

interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }
interface FormValues {
      Paymenttitle:string;
      Paymentamount:string;
      Typeofpayment:string;
      Paymentdate: Date;
      MonthOfPayment:string;
      Fromwho:string;
      towho:string;
      status:string;

    
 
    // Add other fields as needed
    [key: string]: string | Date;
  }
  const fieldNames= [
    "Paymenttitle",
    "Paymentamount",
    "Typeofpayment",
    "Paymentdate",
    "Fromwho",
    "towho",
    "status",
    "MonthOfPayment",
    
  ];
  const paymentNames = [
    { value: "John Doe", label: "John Doe", Paymenttitle: "John", Paymentamount: "Doe", Typeofpayment: "john.doe@example.com", Paymentdate: "1234567890" ,Fromwho:"salah",towho:"youcef",status:"paid",MonthOfPayment:"kitchen needded to be fixed "},
  
  ];
 
  const Teachers = [
    {
      id: 1,
      label: "Mr. Smith",
      subject: "Mathematics",
    },
    {
      id: 2,
      label: "Ms. Johnson",
      subject: "English",
    },
    {
      id: 3,
      label: "Mrs. Brown",
      subject: "Science",
    },
    {
      id: 4,
      label: "Mr. Davis",
      subject: "History",
    },
    {
      id: 5,
      label: "Ms. Wilson",
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
  
  
  const payment: FormValues = {
   
     // Assuming a valid date string or Date objec
    Paymenttitle: "zakamo",
    Paymentamount:  "zakamo",
    Typeofpayment:  "zakamo",
    Paymentdate:  new Date("2000-01-01"),
    Fromwho:  "zakamo",
    towho:  "zakamo",
    status:  "zakamo",
    MonthOfPayment :  "zakamo",
    
  };
  const status =[
    
    {
      value:"paid"  ,
      label: "Paid",
    },
    {
      value:"notPaid"  ,
      label: "Not Paid",
    },
  ]
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open }) => {
  const { toast } = useToast();
  const [statuss, setstatuss] = useState(false);
  const [month , setMonth]= useState(false)
  const [teacher,setTeacher]=useState(false)
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
    const form =useForm<FormValues>({
      resolver: zodResolver(PaymentRegistrationSchema),
           defaultValues: {
            Paymenttitle: payment?.Paymenttitle || "",
            Paymentamount: payment?.Paymentamount || "",
            Typeofpayment: payment?.Typeofpayment || "",
            Paymentdate: payment?.Paymentdate || new Date(),
            Fromwho: payment?.Fromwho || "",
            towho: payment?.towho || "",
            status: payment?.status|| "",
            MonthOfPayment: payment?.MonthOfPayment|| "",
           
          },
      
    });
    const {formState,setValue,getValues } = form;
    const { isSubmitting } = formState;


    const renderInput = ({ fieldName, field }: any) => {
      switch (fieldName) {
        case "Paymentdate":
        return (
        <CalendarDatePicker
            {...field}
            date={getValues("Paymentdate")}
            setDate={(selectedValue) => {
              if (selectedValue === undefined) {
                // Handle undefined case if needed
              } else {
                form.setValue(fieldName, selectedValue);
              }
            }}
          />
        );
        case "MonthOfPayment": 
      return (
        <Combobox
        {...field}
        month={month}
        setMonth={setMonth}
        placeHolder="Month"
        options={MonthOfYear}
        value={getValues("MonthOfYear")}
        onSelected={(selectedValue) => {
          onSelected(selectedValue);
          form.setValue(fieldName, selectedValue);
        }} // Set the value based on the form's current value for the field
      />
      );
        case "status":
          return (
            <Combobox
              {...field}
              statuss={statuss}
              setstatuss={setstatuss}
              placeHolder="status"
              options={status}
              value={getValues("status")}
              onSelected={(selectedValue) => {
                onSelected(selectedValue);
                form.setValue(fieldName, selectedValue);
              }} // Set the value based on the form's current value for the field
            />
          );
          case "towho":
            return (
              <Combobox
                {...field}
                teacher={teacher}
                setTeacher={setTeacher}
                placeHolder="Teacher"
                options={Teachers}
                value={getValues("teacher")}
                onSelected={(selectedValue) => {
                  onSelected(selectedValue);
                  form.setValue(fieldName, selectedValue);
                }} // Set the value based on the form's current value for the field
              />
            );
          
        case "Typeofpayment":
          return (
            <Combobox
              {...field}
              open={openTypeofpayment}
              setOpen={setOpenTypeofpayment}
              placeHolder="Typeofpayment"
              options={Typeofpayments}
              value={getValues("Typeofpayment")}
              onSelected={(selectedValue) => {
                onSelected(selectedValue);
                form.setValue(fieldName, selectedValue);
              }}
            />
          );
          
        default:
          return <Input {...field} />;
      }
    };
    const onSelected = useCallback((selectedValue:string) => {
      const selectedpayment = paymentNames.find(payment => payment.value === selectedValue);
      if (selectedpayment) {
        // Update form fields with selected payment information
      setValue('Paymenttitle', selectedpayment.Paymenttitle);
      setValue('paymentLastName', selectedpayment.Paymentamount);
      setValue('paymentEmail', selectedpayment.Paymentdate);
      setValue('paymentPhone', selectedpayment.Typeofpayment);
      }
    }, [paymentNames]);
  
    const getChanges = (currentValues: FormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !== payment[key]) {
            changes += `${key}: ${payment[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
    function onSubmit(data: FormValues) {
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
                      {renderInput({ fieldName, field })}
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