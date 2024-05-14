
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
import studentRegistrationSchema from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "./date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "./uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";
import { useData } from "@/context/admin/fetchDataContext";
import { addStudent } from "@/lib/hooks/students";
import { uploadFilesAndLinkToCollection } from "@/context/admin/hooks/useUploadFiles";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const fieldNames = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "gender",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "level",
  "class",
  'registrationAndInsuranceFee',
  'feedingFee',
  "parentFullName",
  "parentEmail",
  "parentPhone",
  "emergencyContactName",
  "emergencyContactPhone",
  "medicalConditions",
  "joiningDate",


];
 
const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

type FormKeys =
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "gender"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "country"
  | "parentFullName"
  | "parentEmail"
  | "parentPhone"
  | "emergencyContactName"
  | "emergencyContactPhone"
  | "medicalConditions"
  | "joiningDate"
  |"registrationAndInsuranceFee"
  |"feedingFee"
  |"class";
type StudentFormValues = z.infer<typeof  studentRegistrationSchema> ;
interface FileUploadProgress {
  file: File;
  name: string;
  source:any;
}

const getMonthAbbreviation = (monthIndex: number) => {
  const startDate = new Date(2023, 8); // September 2023 (month index 8)
  
  const date = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex);
  const monthAbbreviation = date.toLocaleString('en-GB', { month: "short" });
  const yearAbbreviation = date.getFullYear().toString().substr(-2);
  return `${monthAbbreviation}${yearAbbreviation}`;
};
export default function StudentForm() {
  const { toast } = useToast();
  const {parents,setStudents,levels}= useData();
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
const t=useTranslations()
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const[openFeedingFee,setOpenFeedingFee]=useState(false)
  const [openRegistrationAndInsuranceFee,setOpenRegistrationAndInsuranceFee]=useState(false)
  const [classes,setClasses]=useState([])
  const form = useForm<any>({
    //resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      id: '123456',
      level: 'Intermediate',
      status: 'Active',
      registrationStatus: 'Registered',
      startDate: new Date(),
      lastPaymentDate: new Date(),
      nextPaymentDate: new Date(),
      totalAmount: 0,
      amountLeftToPay: 0,
      'registrationAndInsuranceFee':"notPaid",
      'feedingFee':"notPaid",
      monthlyPayments: Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => {
            const monthAbbreviation = getMonthAbbreviation(i);
            return [monthAbbreviation, { month: monthAbbreviation, status: 'Not Paid' }];
        })
    )
  }
 
  });

  const studentPaymentStatus =[
    
    {
      value:"Paid"  ,
      label: t('paid'),
    },
    {
      value:"notPaid"  ,
      label: t('not-paid'),
    },
  ]
  const { reset, formState, setValue, getValues,watch} = form;
  const { isSubmitting } = formState;

  
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const createMonthlyPaymentsData = (level: any) => {
    const monthlyPaymentsKey = `monthly_payments`;
    const monthlyPaymentsObj: Record<string, { status: string; month: string }> = {};
    const startDateMonth = level.start.getMonth(); // Month index from 0 to 11
    const endDateMonth = level.end.getMonth(); // Month index from 0 to 11
  
    const startDate = new Date(level.start.getFullYear(), startDateMonth, 1); // First day of the start month
    const endDate = new Date(level.end.getFullYear(), endDateMonth + 1, 0); // Last day of the end month
  
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const monthAbbreviation = currentDate.toLocaleString('en-GB', { month: 'short' });
      const yearAbbreviation = currentDate.getFullYear().toString().substr(-2);
      const monthKey = `${monthAbbreviation}${yearAbbreviation}`;
      const monthStatus =  'Not Paid';
      monthlyPaymentsObj[monthKey] = {status:monthStatus,month:monthKey};
      
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    return { monthlyPaymentsKey, monthlyPaymentsObj };
  };
  
  const renderInput = (fieldName: string, field:any) => {
    switch (fieldName) {
      case "dateOfBirth":
        return (
          <CalendarDatePicker
            {...field}
          
            date={getValues("dateOfBirth")}
            setDate={(selectedValue) => {
              if (selectedValue === undefined) {
                // Handle undefined case if needed
              } else {
                form.setValue(fieldName, selectedValue);
              }
            }}
          />
        );
        case "joiningDate":
          return (
            <CalendarDatePicker
              {...field}
              
              date={getValues("joiningDate")}
              setDate={(selectedValue) => {
                if (selectedValue === undefined) {
                  // Handle undefined case if needed
                } else {
                  form.setValue(fieldName, selectedValue);
                }
              }}
            />
          );
      case "parentFullName":
        return (
          <Combobox
            {...field}
            open={open}
            setOpen={setOpen}
            placeHolder={t("parents")}
            options={parents}
            value={getValues("parentFullName")}
            onSelected={(selectedValue) => {
              const selectedParent = parents.find(
                (parent:any) => parent.parent === selectedValue
              );
              if (selectedParent) {

                  
                form.setValue(fieldName, selectedValue);
                setValue("parentLastName", selectedParent.lastName);
                setValue("parentFirstName", selectedParent.firstName);
                setValue("parentEmail", selectedParent.parentEmail);
                setValue("parentPhone", selectedParent.parentPhone);
                setValue("parentId", selectedParent.id);
              }
              console.log("value found");
              
            
            }} // Set the value based on the form's current value for the field
          />
        );
      case "gender":
        return (
          <Combobox
            {...field}
            open={openGender}
            setOpen={setOpenGender}
            placeHolder={t("gender")}
            options={genders}
            value={getValues("gender")}
            onSelected={(selectedValue) => {
              const gender: "male" | "female" | "other" = selectedValue as "male" | "female" | "other";

              form.setValue(fieldName, gender);
            }}
          />
        );
        case "level":
          return(   <Select
      
            onValueChange={(value) => {
              const level =levels.find((lvl:any)=>lvl.level===value)
              form.setValue("totalAmount", level.fee);
              form.setValue("amountLeftToPay", level.fee);
              form.setValue("startDate", level.start);
              form.setValue("nextPaymentDate", level.start);
              form.setValue("lastPaymentDate", level.start);
              form.setValue("level", level.level);
              form.setValue("levelId", level.id);
              const data=createMonthlyPaymentsData(level)
              form.setValue(data.monthlyPaymentsKey,data.monthlyPaymentsObj)
              setClasses(level.classes)

            }}
    
                  >
                    <FormControl>
                      <SelectTrigger
                        id={`level`}
                        aria-label={`Select level`}
                      >
                        <SelectValue placeholder={t('select-level')} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {levels.map((level:any,index:number) => (
                        <SelectItem key={index} value={level.level}>
                          {level.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>)
                   case "class":
                    return(   <Select
                
                      onValueChange={(value) => {
                       
                        form.setValue("class", value);
          
                      }}
              
                            >
                              <FormControl>
                                <SelectTrigger
                                  id={`class`}
                                  aria-label={`Select class`}
                                >
                                  <SelectValue placeholder={t('select-a-class')} />
                                </SelectTrigger>
                              </FormControl>
          
                              <SelectContent>
                                {classes.map((cls:any,index:number) => (
                                  <SelectItem key={index} value={cls}>
                                    {cls}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>)
        case "feedingFee":
          return (
            <Combobox
            {...field}
            open={openFeedingFee}
            setOpen={setOpenFeedingFee}
            placeHolder={t("status")}
            options={studentPaymentStatus}
            value={getValues("feedingFee")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }}
          />
          )
          case "registrationAndInsuranceFee":
            return (
              <Combobox
              {...field}
              open={openRegistrationAndInsuranceFee}
              setOpen={setOpenRegistrationAndInsuranceFee}
              placeHolder={t("status")}
              options={studentPaymentStatus}
              value={getValues("registrationAndInsuranceFee")}
              onSelected={(selectedValue) => {
                form.setValue(fieldName, selectedValue);
              }}
            />
            )
      default:
        return <Input {...field} />;
    }
  };

  async function onSubmit(data:any) {
    const studentId= await addStudent({...data,documents:[]})
    
    const uploaded = await uploadFilesAndLinkToCollection("Students", studentId, filesToUpload);

    setStudents((prev:StudentFormValues[])=>[{...data,id:studentId,student:`${data.firstName} ${data.lastName}`,
    value: `${data.firstName} ${data.lastName}`,
    label: `${data.firstName} ${data.lastName}`,
    documents:uploaded},...prev])
    toast({
      title: t('changes-applied-1'),
      description: t(`changes-applied-Successfully`),
    });
    console.log(data);
            reset(); 
          
          }
     

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
        <CardTitle className="group flex items-center gap-2 text-lg">
          {t('create-student-0')} </CardTitle>
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
      style={{ maxHeight: "565px" }}
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

       <ImageUpload  filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload}/> 
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