
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ResetIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { teacherPaymentRegistrationSchema } from "@/validators/teacherSalarySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "@/app/[locale]/(home)/students/components/date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "@/app/[locale]/(home)/students/components/uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";
import { useData } from "@/context/admin/fetchDataContext";
import { addTeacherSalary, getMonthInfo } from "@/lib/hooks/billing/teacherPayment";
import { uploadFilesAndLinkToCollection } from "@/context/admin/hooks/useUploadFiles";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const fieldNames = [
  "teacher",
    "salaryTitle",
    "salaryAmount",
    "salaryDate",
    "typeofTransaction",
    "monthOfSalary",
    "fromWho",
    "status",

];
type FormKeys = "salaryTitle" | "salaryAmount" | "salaryDate" | "typeofTransaction" | "monthOfSalary" | "fromWho"|"status";
 
type TeacherSalaryFormValues=z.infer<typeof teacherPaymentRegistrationSchema>;




  interface FileUploadProgress {
    file: File;
    name: string;
    source:any;
  }
export default function PaymentForm() {
  const { toast } = useToast();
  const {setTeachersSalary} = useData()
  const {teachers,setAnalytics}= useData()
  const[printBill,setPrintBill]=useState(false)

  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const t=useTranslations()
  const Typeofpayments = [
    {
      value: "Salary",
      label: t('salary'),
    },
    {
      value: "Other",
      label: t("other"),
    },
    
  ];

  const MonthOfYear = [
    {
      value: "January",
      label: t('january'),
    },
    {
      value: "February",
      label: t('february'),
    },
    {
      value: "March",
      label: t('march'),
    },
    {
      value: "April",
      label: t('april'),
    },
    {
      value: "May",
      label: t('may'),
    },
    {
      value: "June",
      label: "June",
    },
    {
      value: "July",
      label: t('july'),
    },
    {
      value: "August",
      label: t('august'),
    },
    {
      value: "September",
      label: t('september'),
    },
    {
      value: "October",
      label: t('october'),
    },
    {
      value: "November",
      label: t('november'),
    },
    {
      value: "December",
      label: t('december'),
    },
  ];
    
  const Salarystatus =[
    
    {
      value:"paid"  ,
      label: t('paid'),
    },
    {
      value:"notPaid"  ,
      label: t('not-paid'),
    },
  ]
  const [status, setstatus] = useState(false);
const [monthModal,setMonthModal]=useState(false)
const [teacherModal,setTeacherModal]=useState(false)

  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const form = useForm<TeacherSalaryFormValues>({
    resolver: zodResolver(teacherPaymentRegistrationSchema),
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;


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
        placeHolder={t('month')}
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
            placeHolder={t("status")}
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
              placeHolder={t('teacher')}
              options={teachers}
              value={getValues("teacher")?.name}
              onSelected={(selectedValue) => {
                const selectedTeacher = teachers.find(
                    (teacher:any) => teacher.value === selectedValue
                  );
               if(selectedTeacher){
              form.setValue(fieldName, {name:selectedTeacher?.value,id:selectedTeacher?.id})
              form.setValue("salaryAmount", selectedTeacher.salary)
            }
          
              }} // Set the value based on the form's current value for the field
            />
          );
        
      case "typeofTransaction":
        return (
          <Combobox
            {...field}
            open={openTypeofpayment}
            setOpen={setOpenTypeofpayment}
            placeHolder={t('typeofpayment')}
            options={Typeofpayments}
            value={getValues("typeofTransaction")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }}
          />
        );
        case "salaryAmount":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)

      default:
        return <Input {...field} />;
    }
  };
  function downloadInvoice(paymentData:any,id:string){

    const doc = new jsPDF();
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'school Erp',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: t('invoice'),
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: t('reference-id',{id:id})
            +`\n${t('date')}: ${paymentData.paymentDate}`
            +t('ninvoice-number-id', {id:id}),
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: t('billed-to')
            +`\n${paymentData.toWho}`
            +'\nBilling Address line 1'
            +'\nBilling Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'Shipping address:'
            +`\n${paymentData.toWho}`
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'From:'
            +'\nSchool erp'
            +'\nShipping Address line 1'
            +'\nShipping Address line 2'
            +'\nZip code - City'
            +'\nCountry',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: t('amount-due'),
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: `DZD${paymentData.paymentAmount}`,
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#3366ff'
            }
          }
        ],
        [
          {
            content: `${t("Status")}: ${paymentData.status}`,
            styles: {
              halign:'right'
            }
          }
        ]
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: t('products-and-services'),
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });
    const valuesArray:any[] = Object.values(paymentData);
    autoTable(doc, {
      head: [['id', 'Title', 'Amount', 'type', 'paymentDate', 'from', 'to', 'status', 'notes']],
      body: [
        valuesArray
      ],
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: '$3600',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: t('total-tax'),
            styles:{
              halign:'right'
            }
          },
          {
            content: 'DZD0',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: t('total-amount-2'),
            styles:{
              halign:'right'
            }
          },
          {
            content: `DZD${paymentData.paymentAmount}`,
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: t('terms-and-notes'),
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
            +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
            +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: "plain"
    });
  
    autoTable(doc, {
      body: [
        [
          {
            content: 'This is a centered footer',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });
  
    return doc.save("invoice");
  
  }
  async function onSubmit(data:TeacherSalaryFormValues) {
    const month=getMonthInfo(data.salaryDate)
    const teacherId= await addTeacherSalary({...data,documents:[]})
    const uploaded = await uploadFilesAndLinkToCollection("Billing/payouts/TeachersTransactions", teacherId, filesToUpload);
    setTeachersSalary((prev:TeacherSalaryFormValues[])=>[{...data,id:teacherId,teacher:data.teacher.name,documents:uploaded,    value:teacherId,
      label:teacherId,},...prev])
      setAnalytics((prevState:any) => ({
        data: {
          ...prevState.data,
          [month.abbreviation]: {
            ...prevState.data[month.abbreviation],
            expenses:prevState.data[month.abbreviation].expenses + data.salaryAmount
          }
        },
        totalExpenses: prevState.totalExpenses +  data.salaryAmount
      }));
      if(printBill){
        downloadInvoice(data,teacherId)
      }  
toast({
              title: t('teacher-salary-added'),
              description: t('teacher-salary-added-successfully'),
            });
    console.log(data);
            reset(); 
          
          }

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {t('create-teacher-bill')} </CardTitle>
          <CardDescription></CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            onClick={() => reset()}
          >
            <ResetIcon className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              {t('reset-details')} </span>
          </Button>
        </div>
      </CardHeader>
      <ScrollArea
        className="overflow-auto pt-6 text-sm"
        style={{ maxHeight: "600px" }}
      >
        <CardContent>
          <Form {...form}>
            <form>
              {fieldNames.map((fieldName, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={fieldName as FormKeys}
                  render={({ field }) => (
                    <FormItem style={{ marginBottom: 15 }}>
                      <FormLabel>{t(fieldName)}</FormLabel>
                      <FormControl>{renderInput(fieldName, field)}</FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
          <div className="flex items-center space-x-2 mb-3">
      <Checkbox id="terms" checked={printBill} onClick={()=>setPrintBill(!printBill)}/>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       {t('print-paiment-bill')} 
       </label>
    </div>
          <ImageUpload filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload}/>

        </CardContent>
      </ScrollArea>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="flex gap-2">
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            {t('submit')} </LoadingButton>
        </div>
      </CardFooter>
    </Card>
  );
}