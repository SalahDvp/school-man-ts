
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
import ImageUpload from "../../students/components/uploadFile"
import {useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {teacherRegistrationSchema} from "@/validators/teacherSchema"
import CalendarDatePicker from "../../students/components/date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
import { z } from "zod"
import { updateTeacher } from "@/lib/hooks/teachers"
import { useData } from "@/context/admin/fetchDataContext"
import { fetchFiles, updateDocuments } from "@/context/admin/hooks/useUploadFiles"
import { useTranslations } from "next-intl"
type FormKeys =
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'gender'
  | 'year'
  | 'address'
  | 'city'
  | 'state'
  | 'postalCode'
  | 'country'
  | 'teacherFirstName'
  | 'teacherLastName'
  | 'teacherEmail'
  | 'teacherPhone'
  | 'teacherSubject'
  | 'emergencyContactName'
  | 'emergencyContactPhone'
  | 'salary'
  | 'medicalConditions'
  | 'joiningDate'
  | 'status';


type TeacherFormValues = z.infer<typeof teacherRegistrationSchema> & { [key: string]: string | Date | number | any;} 
interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
    teacher:TeacherFormValues;
  }
  const fieldNames= [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "year",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
    "teacherSubject",
    "teacherEmail",
    "teacherPhone",
    "emergencyContactName",
    "emergencyContactPhone",
    "salary",
    "medicalConditions",
    "joiningDate",
    "status",
  ];



  interface FileUploadProgress {
    file: File;
    name: string;
    source:any;
  }
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open,teacher }) => {
    const {toast}=useToast()
    const {setTeachers}=useData()
    const [openTeacher,setOpenTeacher]=useState(false)
    const [openGender,setOpenGender]=useState(false)
    const [openStatus,setOpenSatus]=useState(false)
    const [openSubject, setOpenSubject] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const t=useTranslations()
    const form =useForm<TeacherFormValues>({
      resolver: zodResolver(teacherRegistrationSchema),
           defaultValues: {
            id:"qdqdqwdqdqwd",
            salary:2000,
            year: "2023",
            firstName: "John",
            lastName: "Doe",
            dateOfBirth: new Date("2000-01-01"), // Assuming a valid date string or Date object
            gender: "female",
            address: "123 Main St",
            city: "City",
            state: "State",
            postalCode: "12345",
            country: "Country",
            teacherEmail: "jane.doe@example.com",
            teacherPhone: "123-456-7890",
            emergencyContactName: "Emergency Contact",
            emergencyContactPhone: "987-654-3210",
            medicalConditions: "None",
            teacherSubject:"Math",
            joiningDate: new Date("2000-01-01"),
            status:"active"
        
        
          }
      
    });
    const {formState,setValue,getValues,reset } = form;
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
    
    ]
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

    React.useEffect(() => {
      const downloadFiles = async () => {
        if (teacher && teacher.documents) {
        
          const files=await fetchFiles(teacher.documents)
          console.log("files",files);
          
          setFilesToUpload(files);
        }
      };
    if(teacher){
      reset(teacher)
      console.log("reset",teacher);
      downloadFiles()
    }
   
    }, [teacher])
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
                placeHolder="gender"
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
                open={openStatus}
                setOpen={setOpenSatus}
                placeHolder="status"
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
                  placeHolder="teacherSubject"
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
            return <Input {...field} />;
        }
      };
  
    const getChanges = (currentValues: TeacherFormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !== teacher[key]) {
            changes += `${key}: ${teacher[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
      async function onSubmit(data: TeacherFormValues) {
        const { value, label, teacher, ...updatedData } = data;
        await updateTeacher(updatedData,data.id)
        const documents= await updateDocuments(teacher.documents && teacher.documents> 0?teacher.documents:[],filesToUpload,'Teachers',data.id)

        setTeachers((prev:any) => {
          const updatedTeachers = prev.map((teacher:TeacherFormValues) =>
            teacher.id === data.id? { ...data, id: data.id, teacher: `${data.firstName} ${data.lastName}`, documents: documents } : teacher
          );
          return updatedTeachers;
        });
          toast({
              title: t('changes-applied'),
              description: t('changes-applied-successfully'),
            })
        
            setOpen(false)

    } 

    
  return (
    <Sheet open={open}  onOpenChange={setOpen}  >
   
   <SheetContent className=" sm:max-w-[650px]">
      <ScrollArea className="h-screen pb-20 "> 
        <SheetHeader>
          <SheetTitle>{t('edit-teacher')}</SheetTitle>
          <SheetDescription>
            {t('make-changes-to-your-teacher-here-click-save-when-youre-done')} </SheetDescription>
        </SheetHeader>
        <Form {...form}>
            <form>
           
          {fieldNames.map((fieldName,index) => (
             <FormField
             key={index}
             control={form.control}
             name={fieldName as FormKeys} 
             
             render={function ({ field }) {
               return (
                 <FormItem style={{ marginBottom: 15 }}>
   <FormLabel>{t(fieldName)}</FormLabel>
                   <FormControl>
                     {renderInput(fieldName, field)}
                   </FormControl>

                   <FormMessage />
                 </FormItem>
               )
             }}
                />
             
              ))}
          
            </form>
          </Form>
          
          <ImageUpload  filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload}/> 

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