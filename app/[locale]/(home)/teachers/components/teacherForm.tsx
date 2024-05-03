
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
import { addTeacher } from "@/lib/hooks/teacher";
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

const status =[
  {
    value:"active",
    label:"Active",
  },
  {
    value:"suspended",
    label:"Suspended",
  },{
    value:"expelled",
    label:"Expelled",
  }
]
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


const subjects = [
  
  
  {
    value: "arabic",
    label: "Arabic",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "english",
    label: "English",
  },
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
export default function TeacherForm() {
  const { toast } = useToast();
  const {setTeachers} = useData()
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      id: '1',
      year: '2024',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main Street',
      city: 'Example City',
      state: 'Example State',
      postalCode: '12345',
      country: 'Example Country',
      teacherEmail: 'john.doe@example.com',
      teacherPhone: '123-456-7890',
      teacherSubject: 'Math',
      joiningDate:new Date('2024-01-01'),
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '987-654-3210',
      medicalConditions: 'None',
      salary: 50000,
      status:"active",

    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;

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
            placeHolder="Gender"
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
            placeHolder="Status"
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
              placeHolder="a subject"
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
  const teacherId= await addTeacher(data)
  setTeachers((prev:TeacherFormValues[])=>[...prev,{...data,id:teacherId,teacher: `${data.firstName} ${data.lastName}`}])
        toast({
            title: "Teacher added!",
            description: "Teacher added Successfully",
          });
  console.log(data);
          reset(); 
        
        }
   

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Create Teacher
          </CardTitle>
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