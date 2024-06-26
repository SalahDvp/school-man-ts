
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
import { teacherRegistrationSchema } from "@/validators/teacherSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "../../students/components/date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "../../students/components/uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";
import { useData } from "@/context/admin/fetchDataContext";
import { addTeacher } from "@/lib/hooks/teachers";
import { uploadFilesAndLinkToCollection } from "@/context/admin/hooks/useUploadFiles";
import { useTranslations } from "next-intl";
const fieldNames = [
  "firstName",
  "lastName",
  "teacherSubject",
  "dateOfBirth",
  "gender",
  "salary",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "teacherEmail",
  "teacherPhone",
  "emergencyContactName",
  "emergencyContactPhone",
  "medicalConditions",
  "joiningDate",
  "status",
];



type FormKeys =
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "gender"
  | "year"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "country"
  | "salary"
  | "teacherSubject"
  |"teacherEmail"
  |"teacherPhone"
  |"emergencyContactName"
  |"emergencyContactPhone"
  |"medicalConditions"
  |"joiningDate"
  |"status"
type TeacherFormValues = z.infer<typeof teacherRegistrationSchema>;
interface FileUploadProgress {
  file: File;
  name: string;
  source:any;
}
export default function TeacherForm() {
  const { toast } = useToast();
  const {setTeachers} = useData()
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const t=useTranslations()
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      id: '1',
      year: '2024',
    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;
  const status =[
    {
      value:"active",
      label:t("Active"),
    },
    {
      value:"suspended",
      label:t("Suspended"),
    },{
      value:"expelled",
      label:t("Expelled"),
    }
  ]
  const genders = [
    {
      value: "male",
      label: t("Male"),
    },
    {
      value: "female",
      label: t("Female"),
    },
  ];
  
  
  const subjects = [
    
    
    {
      value: "arabic",
      label: t("Arabic"),
    },
    {
      value: "french",
      label: t("French"),
    },
    {
      value: "english",
      label: t("English"),
    },
  ];
  const renderInput = (fieldName:string, field:any) => {
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
      case "gender":
        return (
          <Combobox
            {...field}
            open={openGender}
            setOpen={setOpenGender}
            placeHolder={t('gender')}
            options={genders}
            value={getValues("gender")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }}
          />
        );
        case "status":
        return (
          <Combobox
            {...field}
            open={open}
            setOpen={setOpen}
            placeHolder={t('status')}
            options={status}
            value={getValues("status")}
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue);
            }}
          />
        );


        
        case "teacherSubject":
          return (
            <Combobox
              {...field}
              open={openSubject}
              setOpen={setOpenSubject}
              placeHolder={t('a-subject')}
              options={subjects}
              value={getValues("teacherSubject")}
              onSelected={(selectedValue) => {
       
                form.setValue(fieldName, selectedValue);
              }}
            />
          );
          case "salary":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)
      default:
        return <Input {...field}  />;
    }
  };


 async function onSubmit(data:TeacherFormValues) {
  const teacherId= await addTeacher({...data,documents:[]})
  const uploaded=await uploadFilesAndLinkToCollection("Teachers",teacherId,filesToUpload)
  setTeachers((prev:TeacherFormValues[])=>[{...data,id:teacherId,teacher: `${data.firstName} ${data.lastName}`,
  value:`${data.firstName} ${data.lastName}`,
  label:`${data.firstName} ${data.lastName}`,
documents:uploaded},...prev])
        toast({
            title: t('teacher-added'),
            description: t('teacher-added-successfully'),
          });
  console.log(data);
          reset(); 
        
        }
   

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {t('create-teacher')} </CardTitle>
          <CardDescription/>
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