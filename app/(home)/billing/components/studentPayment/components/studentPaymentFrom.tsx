
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
import { studentPaymentSchema } from "@/validators/studentPaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "@/app/(home)/students/components/date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "@/app/(home)/students/components/uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";

const fieldNames: string[] = [
  'student',
  'parent',
  'level',
  'class',
  'paymentPlan',
  'paymentTitle',
  'paymentAmount',
  'paymentDate',
  'fromWho',
  'typeofTransaction',
  'status',
  'description'
];


type FormKeys =
  | 'paymentTitle'
  | 'paymentAmount'
  | 'paymentDate'
  | 'typeofTransaction'
  | 'fromWho'
  | 'student'
  |'description'
  | 'parent'
  | 'level'
  | 'class'
  | 'paymentPlan'
  | 'status';

type StudentPaymentFormValues = z.infer<typeof studentPaymentSchema>;

const typeofTransaction = [
  {
    value: "CreditCard",
    label: "Credit Card",
  },
  {
  value: "Cash",
  label: "Cash",
    },
 
];

const studentPaymentStatus =[
  
  {
    value:"paid"  ,
    label: "Paid",
  },
  {
    value:"notPaid"  ,
    label: "Not Paid",
  },
]
const studentList= [
  {
    "id": "2",
    "name": "Jane Smith",
    "status": "active",
    "level": "Grade 5",
    "joiningDate": "2022-09-10",
    "leftAmountToPay": 200,
    "registrationStatus": "accepted",
    "startDate": "2022-09-01",
    "lastPaymentDate": "2023-04-01",
    "nextPaymentDate": "2023-05-01",
    "totalAmount": 1500,
    "amountLeftToPay": 200,
    "value": "Jane Smith",
    "label": "Jane Smith",
    "parent": {
      "name": "Rebecca",
      "id": "2"
    },
    "class": {
      "name": "5A"
    }
  },
  {
    "id": "3",
    "name": "Alice Johnson",
    "status": "suspended",
    "level": "Grade 3",
    "joiningDate": "2021-02-15",
    "leftAmountToPay": 500,
    "registrationStatus": "pending",
    "startDate": "2021-02-10",
    "lastPaymentDate": "2023-03-15",
    "nextPaymentDate": "2023-04-15",
    "totalAmount": 1000,
    "amountLeftToPay": 500,
    "value": "Alice Johnson",
    "label": "Alice Johnson",
    "parent": {
      "name": "George",
      "id": "3"
    },
    "class": {
      "name": "3B"
    }
  },
  {
    "id": "4",
    "name": "Charlie Brown",
    "status": "graduated",
    "level": "Kindergarten",
    "joiningDate": "2020-08-01",
    "leftAmountToPay": 0,
    "registrationStatus": "completed",
    "startDate": "2020-08-01",
    "lastPaymentDate": "2022-06-01",
    "nextPaymentDate": null,
    "totalAmount": 1800,
    "amountLeftToPay": 0,
    "value": "Charlie Brown",
    "label": "Charlie Brown",
    "parent": {
      "name": "Eleanor",
      "id": "4"
    },
    "class": {
      "name": "6C"
    }
  },
  {
    "id": "5",
    "name": "Michael Lee",
    "status": "expelled",
    "level": "Grade 2",
    "joiningDate": "2023-01-20",
    "leftAmountToPay": 700,
    "registrationStatus": "rejected",
    "startDate": "2023-01-15",
    "lastPaymentDate": "2023-02-20",
    "nextPaymentDate": "2023-02-20",
    "totalAmount": 800,
    "amountLeftToPay": 700,
    "value": "Michael Lee",
    "label": "Michael Lee",
    "parent": {
      "name": "Benjamin",
      "id": "5"
    },
    "class": {
      "name": "2D"
    }
  }
]



const levels=[
{id: "1",
level: "Kindergarten",
fee: 1000,
paymentPlans:[{id: 'PP001', name: 'Monthly Plan', period: '1 month', fee: 500 ,value:'Monthly Plan',label:'Monthly Plan'}]}
]

export default function StudentPaymentForm() {
  const { toast } = useToast();
  const [status, setstatus] = useState(false);
  const [openTypeofpayment, setOpenTypeofpayment] = useState(false);
  const [studentModal,setStudentModal]=React.useState(false)
  const [paymentPlanModal,setPaymentPlanModal]=React.useState(false)
const [student,setStudent]=useState()
  const form = useForm<StudentPaymentFormValues>({
    resolver: zodResolver(studentPaymentSchema),
  });
  const { reset, formState, setValue, getValues,watch } = form;
  const { isSubmitting } = formState;


const paymentPlans = React.useMemo(() => {
  const studentValue = form.getValues("level");
  if (studentValue) {
    const selectedLevel = levels.find(level => level.level === studentValue);
    if (selectedLevel) {

      return selectedLevel.paymentPlans;
    }
  }
  return [];
}, [watch('level')]);
const onSelected=(selectedStudent:any)=>{
  form.setValue("class",selectedStudent.class.name)
  form.setValue("parent",selectedStudent.parent)
  form.setValue("level",selectedStudent.level)
}
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
        case "student":
          return (
            <Combobox
              {...field}
              open={studentModal}
              setOpen={setStudentModal}
              placeHolder="Student"
              options={studentList}
              value={getValues("student")?.name}
              onSelected={(selectedValue) => {
                const selectedStudent = studentList.find((student) => student.value === selectedValue);
                if (selectedStudent) {
                  const { value, label, ...rest } = selectedStudent; 
                  const updatedStudent:any = { ...rest };
                  onSelected(updatedStudent); 
                  console.log(updatedStudent);
                  setStudent(updatedStudent)
                  form.setValue(fieldName, {name:selectedStudent.name,value:selectedStudent.value,label:selectedStudent.label,id:selectedStudent.id}); 
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
            options={studentPaymentStatus}
            value={getValues("status")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }} // Set the value based on the form's current value for the field
          />
        );
      case "typeofTransaction":
        return (
          <Combobox
            {...field}
            open={openTypeofpayment}
            setOpen={setOpenTypeofpayment}
            placeHolder="typeofTransaction"
            options={typeofTransaction}
            value={getValues("typeofTransaction")}
            onSelected={(selectedValue) => {
 
              form.setValue(fieldName, selectedValue);
            }}
          />
        );
        
        case "paymentAmount":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)

        case "parent" :
          return (<Input {...field}  value={getValues("parent")?.name} readOnly/>)
          
        case "level" :
          return (<Input {...field}  value={getValues("level")} readOnly/>)

        case "paymentPlan":
          return (
            <Combobox
            {...field}
            open={paymentPlanModal}
            setOpen={setPaymentPlanModal}
            placeHolder="Payment plan"
            options={paymentPlans}
            value={getValues("paymentPlan")?.name}
            onSelected={(selectedValue) => {
              const paymentPlan = paymentPlans?.find(
                (plan) => plan?.value === selectedValue
              );
              if (paymentPlan) {
                form.setValue(fieldName, paymentPlan)
                form.setValue("paymentAmount",paymentPlan.fee)
              }
            }}
          />

          )

         
          
       
     
            default:
        return <Input {...field} />;
    }
  };

  function onSubmit(data:StudentPaymentFormValues) {

        console.log("eqwqewqweq",data);
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