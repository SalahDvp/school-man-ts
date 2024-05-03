
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
import  studentRegistrationSchema  from "@/validators/auth";
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
import { addStudent } from "@/lib/hooks/student";

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
  "parentFullName",
  "parentEmail",
  "parentPhone",
  "emergencyContactName",
  "emergencyContactPhone",
  "medicalConditions",
  "status",
  "joiningDate",
  "startDate",
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
  | "year"
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
  | "status"
  | "joiningDate"
  | "startDate"
type StudnetFormValues = z.infer<typeof  studentRegistrationSchema>;
export default function StudentForm() {
  const { toast } = useToast();
  const {parents}= useData();
  const {setStudnets} = useData();
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const form = useForm<StudnetFormValues>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
     id: 'abc123',
      year: '2023',
      firstName: 'John',
      lastName: 'Doe',
      name:  'John Doe' ,
      dateOfBirth: new Date('2020-05-15'),
      gender: 'male',
      status:'active',
      address: '123 Main Street',
      city: 'Cityville',
      state: 'Stateland',
      postalCode: '12345',
      country: 'Countryland',
      parentFullName: 'Jane',
      parentEmail: 'janedoe@example.com',
      parentPhone: '123-456-7890',
      emergencyContactName: 'Emergency Contact',
      emergencyContactPhone: '987-654-3210',
      medicalConditions: 'None',
      joiningDate:new Date('2024-01-15'),
      leftAmountToPay:0,
      registrationStatus:"active",
      startDate:new Date('2024-01-15'),
      lastPaymentDate:new Date('2010-01-15'),
      nextPaymentDate:new Date('2013-01-15'),
      totalAmount:2000,
      amountLeftToPay:200,
      parent:{name:'salah', id:"20330209394949"},
      class:{name:'1AS3'},
      level:"fjdsbkdn"


    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;
  //const parentNames = parents
  
  

  const parentNames = parents.map((parent_: { firstName: string; lastName: string; }) => {
    // Combine and trim first and last name to remove leading/trailing spaces
    const combinedName = `${parent_.firstName.trim()} ${parent_.lastName.trim()}`;
  
    return {
      label: combinedName, // For use in UI components like dropdowns
      value: combinedName, // For use as a form value or ID
    };
  });

  
  
  const renderInput = (fieldName: string, field) => {
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
                form.setValue(fieldName, selectedValue.toLocaleString());
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
                  form.setValue(fieldName, selectedValue.toLocaleString());
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
            placeHolder="parents"
            options={parentNames}
            value={getValues("parentFullName")}
            onSelected={(selectedValue) => {
              onSelected(selectedValue);
              form.setValue(fieldName, selectedValue);
            }} // Set the value based on the form's current value for the field
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
              onSelected(selectedValue);
              form.setValue(fieldName, selectedValue);
            }}
          />
        );
      default:
        return <Input {...field} />;
    }
  };
  const onSelected = useCallback(
    (selectedValue: any) => {
      const selectedParent = parentNames.find(
        (parent: { value: any; }) => parent.value === selectedValue
      );
      if (selectedParent) {
  console.log("wqeqwemamamam");
        setValue("parentFullName", selectedParent.parentFullName);
        setValue("parentLastName", selectedParent.parentLastName);
        setValue("parentEmail", selectedParent.parentEmail);
        setValue("parentPhone", selectedParent.parentPhone);
      }
    },
    [setValue]
  );

  async function onSubmit(data:StudnetFormValues) {
    const studentId= await addStudent(data)
    setStudnets((prev:StudnetFormValues[])=>[...prev,{...data,id:studentId,student: `${data.firstName} ${data.lastName}`}])
          toast({
              title: "student added!",
              description: "Student added Successfully",
            });
    console.log(data);
            reset(); 
          
          }
     

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
        <CardTitle className="group flex items-center gap-2 text-lg">
          Create Student
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
