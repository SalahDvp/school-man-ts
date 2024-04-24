
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
import { PaymentRegistrationSchema } from "@/app/validators/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "./date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "./uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
const fieldNames = [
  "Paymenttitle",
  "Paymentamount",
  "Typeofpayment",
  "Paymentdate",
  "Fromwho",
  "towho",
  "status",
  "Notestobeadded ",
];



export default function PaymentForm() {
  const { toast } = useToast();
  const [statuss, setstatuss] = useState(false);
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const form = useForm({
    resolver: zodResolver(PaymentRegistrationSchema),
    defaultValues: {
      Paymenttitle:"",
      Paymentamount:"",
      Typeofpayment:"",
      Paymentdate:new Date(),
      Notestobeadded :"",
      Fromwho:"",
      towho:"",
      status:"",
    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;


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
  const renderInput = (fieldName, field) => {
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

  function onSubmit(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Payment added!",
          description: "Payment added Successfully",
        });
        console.log(data);
        resolve();
      }, 2000);
    });
  }

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Create Payment
          </CardTitle>
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
              Reset details
            </span>
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
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem style={{ marginBottom: 15 }}>
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl>{renderInput(fieldName, field)}</FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>

          <ImageUpload />
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="flex gap-2">
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </LoadingButton>
        </div>
      </CardFooter>
    </Card>
  );
}
