
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
import { PaymentRegistrationSchema } from "@/validators/paymentSchema"
import CalendarDatePicker from "@/app/[locale]/(home)/students/components/date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
import { z } from "zod"
import { useData } from "@/context/admin/fetchDataContext";
import { updatePayment } from "@/lib/hooks/payment";
type FormKeys =
  |"paymentTitle"
  |"paymentAmount"
  |"typeofPayment"
  |"paymentDate"
  |"fromWho"
  |"toWho"
  |"status"
  |"notesTobeAdded"
  


  type PaymentFormValues = z.infer<typeof PaymentRegistrationSchema> & { [key: string]: string | Date | number; }

  const fieldNames= [
    "paymentTitle",
    "paymentAmount",
    "typeofPayment",
    "paymentDate",
    "fromWho",
    "toWho",
    "status",
    "notesTobeAdded",
    
  ];

  const Typeofpayments = [
    {
      value: "electricbill",
      label: "Electric Bill",
    },
    {
      value: "waterBill",
      label: "Water Bill",
    },
    {
      value: "gazBill",
      label: "Gaz Bill",
    },
    {
      value: "Maintenance",
      label: "Maintenance",
    },
    {
      value: "delivery",
      label: "Delivery",
    },
    {
      value:"other"  ,
      label: "Other (should be described in the notes)",
    },
  ];
  
 
  const payoutstatus =[
    
    {
      value:"paid"  ,
      label: "Paid",
    },
    {
      value:"notPaid"  ,
      label: "Not Paid",
    },
  ]
  interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open,payment }) => {
  const { toast } = useToast();
  const {setPayouts}= useData()
  const [openPayout,setOpenPayout]=useState(false)
  const [status, setstatus] = useState(false);
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
    const [openSubject, setOpenSubject] = useState();
    const form =useForm<PaymentFormValues>({
      resolver: zodResolver(PaymentRegistrationSchema),
           defaultValues: payment,
      
    });
    const {formState,setValue,getValues ,reset} = form;
    const { isSubmitting } = formState;


    React.useEffect(() => {
      reset()
      console.log("reset",payment);
    }, [payment])
    const renderInput = ({ fieldName, field }: any) => {
      switch (fieldName) {
        case "paymentDate":
          return (
            <CalendarDatePicker
              {...field}
              date={getValues("paymentDate")}
              setDate={(selectedValue) => {
                if (selectedValue === undefined) {
                  // Handle undefined case if needed
                } else {
                  form.setValue(fieldName, selectedValue);
                }
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
              options={payoutstatus}
              value={getValues("status")}
              onSelected={(selectedValue) => {

                form.setValue(fieldName, selectedValue);
              }} // Set the value based on the form's current value for the field
            />
          );
        case "typeofPayment":
          return (
            <Combobox
              {...field}
              open={openTypeofpayment}
              setOpen={setOpenTypeofpayment}
              placeHolder="typeofPayment"
              options={Typeofpayments}
              value={getValues("typeofPayment")}
              onSelected={(selectedValue) => {
                form.setValue(fieldName, selectedValue);
              }}
            />
          );
          
          case "paymentAmount":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)

      default:
        return <Input {...field} />;
      }
    };
      const getChanges = (currentValues:  PaymentFormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !== payment[key]) {
            changes += `${key}: ${payment[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
      async function onSubmit(data: PaymentFormValues) {
        const changes = getChanges(data);
        await updatePayment(data,data.id)
        setPayouts((prev:any) => {
          const updatedPayouts = prev.map((payout:PaymentFormValues) =>
            payout.id === data.id? {...data,payout:`${data.firstName} ${data.lastName}`} : payout
          );
          return updatedPayouts;
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
            {`Make changes to your payment here. Click save when you're done.`}
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