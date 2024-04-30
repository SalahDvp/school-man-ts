
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
 
type TeacherSalaryFormValues=z.infer<typeof teacherPaymentRegistrationSchema>;


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
      value: "January",
      label: "January",
    },
    {
      value: "February",
      label: "February",
    },
    {
      value: "March",
      label: "March",
    },
    {
      value: "April",
      label: "April",
    },
    {
      value: "May",
      label: "May",
    },
    {
      value: "June",
      label: "June",
    },
    {
      value: "July",
      label: "July",
    },
    {
      value: "August",
      label: "August",
    },
    {
      value: "September",
      label: "September",
    },
    {
      value: "October",
      label: "October",
    },
    {
      value: "November",
      label: "November",
    },
    {
      value: "December",
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
export default function PaymentForm() {
  const { toast } = useToast();
  const [status, setstatus] = useState(false);
const [monthModal,setMonthModal]=useState(false)
const [teacherModal,setTeacherModal]=useState(false)

  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const form = useForm<TeacherSalaryFormValues>({
    resolver: zodResolver(teacherPaymentRegistrationSchema),
    defaultValues: {
        id:"dqweqew",
        salaryTitle: "Monthly Salary",
        salaryAmount: 5000,
        salaryDate: new Date(),
        typeofTransaction:"Salary",
        monthOfSalary:"May",
        fromWho: "Company XYZ",
        status:"paid",
        teacher:{name:"joi",id:"2222"}
    },
  });
  const { reset, formState, setValue, getValues } = form;
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
        case "salaryAmount":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)

      default:
        return <Input {...field} />;
    }
  };

  function onSubmit(data:TeacherSalaryFormValues) {
    return new Promise<void>((resolve) => {
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
            Create Teacher Bill
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
                  name={fieldName as FormKeys}
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