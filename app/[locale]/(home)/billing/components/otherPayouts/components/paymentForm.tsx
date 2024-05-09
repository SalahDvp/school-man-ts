
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
import { PaymentRegistrationSchema } from "@/validators/paymentSchema";
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
import { addPayment } from "@/lib/hooks/billing/otherPayments";
import { uploadFilesAndLinkToCollection } from "@/context/admin/hooks/useUploadFiles";
import { getMonthInfo } from "@/lib/hooks/billing/teacherPayment";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const fieldNames = [
  "paymentTitle",
  "paymentAmount",
  "typeofPayment",
  "paymentDate",
  "fromWho",
  "toWho",
  "status",
  "notesTobeAdded",
];

type FormKeys =
  |"paymentTitle"
  |"paymentAmount"
  |"typeofPayment"
  |"paymentDate"
  |"fromWho"
  |"toWho"
  |"status"
  |"notesTobeAdded"


  type PaymentFormValues = z.infer<typeof PaymentRegistrationSchema>;
  interface FileUploadProgress {
    file: File;
    name: string;
    source:any;
  }
export default function PaymentForm() {
  const { toast } = useToast();
  const [status, setstatus] = useState(false);
  const {payouts,setPayouts,setAnalytics}=useData()
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const[printBill,setPrintBill]=useState(false)
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentRegistrationSchema),
    defaultValues: {
        id:"222",
    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;
  
  const t=useTranslations()
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
  const Typeofpayments = [
    {
      value: "rent",
      label: t('rent'),
    },
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
      value: "maintenance",
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
  const renderInput = (fieldName:string, field:any) => {
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

  async function onSubmit(data:PaymentFormValues) {
    const payoutId= await addPayment({...data,documents:[]})
    const uploaded = await uploadFilesAndLinkToCollection("Billing/payouts/Payout", payoutId, filesToUpload);
    const month=getMonthInfo(data.paymentDate)
    setPayouts((prev:PaymentFormValues[])=>[{...data,id:payoutId,payout:payoutId,documents:uploaded,value:payoutId,
      label:payoutId,},...prev])
      setAnalytics((prevState:any) => ({
        data: {
          ...prevState.data,
          [month.abbreviation]: {
            ...prevState.data[month.abbreviation],
            expenses:prevState.data[month.abbreviation].expenses + data.paymentAmount
          }
        },
        totalExpenses: prevState.totalExpenses +  data.paymentAmount
      })); 
      if(printBill){
        downloadInvoice(data,payoutId)
      } 
      toast({
        title: t('changes-applied-0'),
        description: t('changes-applied-successfully'),
      });

            reset(); 
          
          }

             
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {t('create-payment')} </CardTitle>
          <CardDescription></CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            onClick={()=>reset()}
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