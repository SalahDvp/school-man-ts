
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
import { updatePayment } from "@/lib/hooks/billing/otherPayments"
import { getMonthInfo } from "@/lib/hooks/billing/teacherPayment"
import { fetchFiles, updateDocuments } from "@/context/admin/hooks/useUploadFiles"
import { useTranslations } from "next-intl"
type FormKeys =
  |"paymentTitle"
  |"paymentAmount"
  |"typeofPayment"
  |"paymentDate"
  |"fromWho"
  |"toWho"
  |"status"
  |"notesTobeAdded"
  


  type PaymentFormValues = z.infer<typeof PaymentRegistrationSchema> & { [key: string]: string | Date | number |any; }

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

  interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
    payment:PaymentFormValues
  }
  interface FileUploadProgress {
    file: File;
    name: string;
    source:any;
  }
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open,payment }) => {
  const { toast } = useToast();
  const {setPayouts,setAnalytics}= useData()
  const [openPayout,setOpenPayout]=useState(false)
  const [status, setstatus] = useState(false);
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
    const [openSubject, setOpenSubject] = useState();
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
const t=useTranslations()

const Typeofpayments = [
  {
    value: "electricbill",
    label: t('electric-bill'),
  },
  {
    value: "waterBill",
    label: t('water-bill'),
  },
  {
    value: "gazBill",
    label: t('gaz-bill'),
  },
  {
    value: "Maintenance",
    label: t('maintenance'),
  },
  {
    value: "delivery",
    label: t('delivery'),
  },
  {
    value:"other"  ,
    label: t('other-should-be-described-in-the-notes'),
  },
];


const payoutstatus =[
  
  {
    value:"paid"  ,
    label: t('paid'),
  },
  {
    value:"notPaid"  ,
    label: t('not-paid'),
  },
]
    const form =useForm<PaymentFormValues>({
      resolver: zodResolver(PaymentRegistrationSchema),
           defaultValues:{  id:"222",
           paymentTitle: "John", 
            paymentAmount:20000, 
            typeofPayment: "electricbill", 
            paymentDate:new Date(),
            fromWho:"salah",
            toWho:"youcef",
            status:"paid",
            notesTobeAdded:"kitchen needded to be fixed"}
      
    });
    const {formState,setValue,getValues ,reset} = form;
    const { isSubmitting } = formState;


    React.useEffect(() => {
      const downloadFiles = async () => {
        if (payment && payment.documents) {
        
          const files=await fetchFiles(payment.documents)
          console.log("files",files);
          
          setFilesToUpload(files);
        }
      };
    
      if (payment) {

      reset(payment)
      console.log("reset",payment)
      }
    }, [payment,reset])
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
              placeHolder={t("status")}
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
              placeHolder={t("typeofPayment")}
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
        const { value, label, ...updatedData } = data;
        const month=getMonthInfo(updatedData.paymentDate)
        await updatePayment(data,data.id,payment.paymentAmount)
        const documents= await updateDocuments(payment.documents && payment.documents> 0?payment.documents:[],filesToUpload,'Billing/payouts/Payout',payment.id)
       setPayouts((prev:any) => {
          const updatedPayouts = prev.map((payout:PaymentFormValues) =>
            payout.id === data.id? {...data,payout:payment.id,documents:documents} : payout
          );
          return updatedPayouts;
        });
        setAnalytics((prevState:any) => ({
          data: {
            ...prevState.data,
            [month.abbreviation]: {
              ...prevState.data[month.abbreviation],
              expenses:prevState.data[month.abbreviation].expenses + (payment.paymentAmount-updatedData.salaryAmount)
            }
          },
          totalExpenses: prevState.totalExpenses +  (payment.paymentAmount-updatedData.salaryAmount)
        }));  
        toast({
          title: t('changes-applied-0'),
          description: t('changes-applied-successfully'),
        });
        
            setOpen(false)

    } 
    
  return (
    <Sheet open={open}  onOpenChange={setOpen}  >
   
   <SheetContent className=" sm:max-w-[650px]">
      <ScrollArea className="h-screen pb-20 "> 
        <SheetHeader>
          <SheetTitle>{t('edit-payment')}</SheetTitle>
          <SheetDescription>
            {t('make-changes-to-your-payment-here')}
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
                      <FormLabel>{t(fieldName)}</FormLabel>
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
          
              <ImageUpload filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload}/>

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            
          <LoadingButton loading={isSubmitting} type="submit"    onClick={form.handleSubmit(onSubmit)}>
            {t('save-changes')} </LoadingButton>
          </SheetClose>
        </SheetFooter>
        </ScrollArea>
      </SheetContent>
      
    </Sheet>
  )
}
export default SheetDemo