"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "./uploadFile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import studentRegistrationSchema from "@/validators/auth";
import CalendarDatePicker from "./date-picker";
import Combobox from "@/components/ui/comboBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useData } from "@/context/admin/fetchDataContext";
import { z } from "zod";
import { fetchFiles, updateDocuments } from "@/context/admin/hooks/useUploadFiles";
import { updateStudent } from "@/lib/hooks/students";
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
  | "parentFirstName"
  | "parentLastName"
  | "parentEmail"
  | "parentPhone"
    |"class"
    |"level"
    |"amountLeftToPay"
  | "emergencyContactName"
  | "emergencyContactPhone"
  | "medicalConditions";
  type StudentFormValues = z.infer<typeof studentRegistrationSchema> & { [key: string]: string | Date | number | any;}

interface openModelProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean; // Specify the type of setOpen
  student:StudentFormValues
}

const fieldNames = [
  
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
  "parentFirstName",
  "parentLastName",
  "parentEmail",
  "parentPhone",
  "level",
  "class",
  "amountLeftToPay",
  "emergencyContactName",
  "emergencyContactPhone",
  "medicalConditions",

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

interface FileUploadProgress {
  file: File;
  name: string;
  source:any;
}
const SheetDemo: React.FC<openModelProps> = ({ setOpen, open,student }) => {
  const { toast } = useToast();
  const [openParent, setOpenParent] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const {parents,setStudents}=useData()
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const form = useForm<StudentFormValues>({
    //resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      id: '123456',
      level: 'Intermediate',
      year: '2024',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      city: 'Anytown',
      state: 'State',
      postalCode: '12345',
      country: 'Country',
      parentFullName: 'Jane Doe',
      parentFirstName: 'Jane',
      parentLastName: 'Doe',
      parentEmail: 'jane.doe@example.com',
      parentPhone: '123-456-7890',
      parentId: '654321',
      emergencyContactName: 'Emergency Contact',
      emergencyContactPhone: '987-654-3210',
      medicalConditions: null,
      status: 'Active',
      joiningDate: new Date(),
      registrationStatus: 'Registered',
      startDate: new Date(),
      lastPaymentDate: new Date(),
      nextPaymentDate: new Date(),
      totalAmount: 1000,
      amountLeftToPay: 500,
      class: { name: 'Class Name', id: 'class123' },
    }
  });
  const { formState, setValue, getValues,reset} = form;
  const { isSubmitting } = formState;

  
useEffect(() => {
    const downloadFiles = async () => {
      if (student && student.documents) {
        const files=await fetchFiles(student.documents)
        console.log("files",files);
        
        setFilesToUpload(files);
      }
    };
  
    if (student) {
      console.log("studwnt loaded");
      
      reset(student)
      downloadFiles();
    }
  }, [student])
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
            open={openParent}
            setOpen={setOpenParent}
            placeHolder="parents"
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
              const gender: "male" | "female" | "other" = selectedValue as "male" | "female" | "other";

              form.setValue(fieldName, gender);
            }}
          />
        );
        case "class":
          return <Input {...field}  value={getValues("class").name}/>;
      default:
        return <Input {...field} />;
    }
  };

 const getChanges = (currentValues: StudentFormValues): string => {
    let changes = "Changes:\n";

    for (const key in currentValues) {
      if (currentValues[key] !== student[key]) {
        changes += `${key}: ${student[key]} => ${currentValues[key]}\n`;
      }
    }

    return changes;
  };
  async function onSubmit(data: StudentFormValues) {
    const changes = getChanges(data);
    const { value, label, student, ...updatedData } = data;
    await updateStudent(updatedData,data.id)
    console.log(data);
    
    const documents= await updateDocuments(student.documents && student.documents> 0?student.documents:[],filesToUpload,'Students',data.id)
setStudents((prev:StudentFormValues[]) => {
  const updatedLevels = prev.map((student:StudentFormValues) =>
    student.id === data.id ? { ...data, id: data.id, student: `${data.firstName} ${data.lastName}`, documents: documents }: student
  );
  return updatedLevels;
});
    toast({
      title: "changes applied!",
      description: `changes applied Successfully ${changes}`,
    });


  }
  

  return (
    <Sheet open={open} onOpenChange={setOpen}>
   <SheetContent className=" sm:max-w-[650px]">
        <ScrollArea className="h-screen pb-20 ">
          <SheetHeader>
            <SheetTitle>Edit Student</SheetTitle>
            <SheetDescription>
              Make changes to your student here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
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
                      <FormControl>
                        {renderInput(fieldName,field)}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>

          <ImageUpload  filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload}/> 


          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save changes
              </LoadingButton>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
export default SheetDemo;
