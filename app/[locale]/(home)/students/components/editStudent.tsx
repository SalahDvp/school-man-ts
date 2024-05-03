"use client";
import React, { useState, useCallback } from "react";
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
import  studentRegistrationSchema  from "@/validators/auth";
import CalendarDatePicker from "./date-picker";
import Combobox from "@/components/ui/comboBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";
import { updateStudent } from "@/lib/hooks/student"
import { useData } from "@/context/admin/fetchDataContext"
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

  type StudentFormValues = z.infer<typeof studentRegistrationSchema> & { [key: string]: string | Date | number;}

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
const student: StudentFormValues = {
  id:"qwdqdqwdqdqwdqdqwdqd",
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
  parentFirstName: "John Doe",
  parentLastName: "Doe",
  parentEmail: "jane.doe@example.com",
  parentPhone: "123-456-7890",
  emergencyContactName: "Emergency Contact",
  emergencyContactPhone: "987-654-3210",
  medicalConditions: "None",
};
const SheetDemo: React.FC<openModelProps> = ({ setOpen, open,student }) => {
  const { toast } = useToast();
  const {setStudents}=useData()
  const {parents}= useData();
  const [openParent, setOpenParent] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: student
  });
  const { formState, setValue, getValues } = form;
  const { isSubmitting } = formState;


  const parentNames = parents.map((parent_: { firstName: string; lastName: string; }) => {
    // Combine and trim first and last name to remove leading/trailing spaces
    const combinedName = `${parent_.firstName.trim()} ${parent_.lastName.trim()}`;
  
    return {
      label: combinedName, // For use in UI components like dropdowns
      value: combinedName, // For use as a form value or ID
    };
  });
  const renderInput = ({ fieldName, field }: any) => {
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
      case "parentFirstName":
        return (
          <Combobox
            {...field}
            open={openParent}
            setOpen={setOpenParent}
            placeHolder="parents"
            options={parentNames}
            value={getValues("parentFirstName")}
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
            value={getValues("gender")} // Set the value based on the form's current value for the field
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue); // Update the form value when an option is selected
              onSelected(selectedValue); // Call the onSelected callback if needed
            }}
          />
        );
      default:
        return <Input {...field} />;
    }
  };
  const onSelected = useCallback(
    (selectedValue: string) => {
      const selectedParent = parentNames.find(
        (parent) => parent.value === selectedValue
      );
      if (selectedParent) {
        // Update form fields with selected parent information
        setValue("parentFirstName", selectedParent.parentFirstName);
        setValue("parentLastName", selectedParent.parentLastName);
        setValue("parentEmail", selectedParent.parentEmail);
        setValue("parentPhone", selectedParent.parentPhone);
      }
    },
    [setValue]
  );

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
    await updateStudent(data,data.id)
    setStudents((prev:any) => {
      const updatedStudents = prev.map((student:StudentFormValues) =>
        student.id === data.id? {...data,student:`${data.firstName} ${data.lastName}`} : student
      );
      return updatedStudents;
    });
      toast({
          title: "Changes Applied!",
          description: "Changes Applied Successfully",
        })
    
        setOpen(false)

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
                        {renderInput({ fieldName, field })}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>

          <ImageUpload />

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
