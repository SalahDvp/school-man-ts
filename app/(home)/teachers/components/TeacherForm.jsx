
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
import { teacherRegistrationSchema } from "@/app/validators/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "./date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "./uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
const fieldNames = [
  "First Name",
  "Last Name",
  "teacherSubject",
  "dateOfBirth",
  "gender",
  "year",
  "salary",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "Teacher Email",
  "Teacher Phone",
  "Emergency Contact Name",
  "Emergency Contact Phone",
  "MedicalConditions",
];
const parentNames = [
  {
    value: "John Doe",
    label: "John Doe",
    parentFirstName: "John",
    parentLastName: "Doe",
    parentEmail: "john.doe@example.com",
    parentPhone: "1234567890",
  },
  {
    value: "Jane Smith",
    label: "Jane Smith",
    parentFirstName: "Jane",
    parentLastName: "Smith",
    parentEmail: "jane.smith@example.com",
    parentPhone: "9876543210",
  },
  {
    value: "Michael Johnson",
    label: "Michael Johnson",
    parentFirstName: "Michael",
    parentLastName: "Johnson",
    parentEmail: "michael.johnson@example.com",
    parentPhone: "5678901234",
  },
  {
    value: "Emily Brown",
    label: "Emily Brown",
    parentFirstName: "Emily",
    parentLastName: "Brown",
    parentEmail: "emily.brown@example.com",
    parentPhone: "3456789012",
  },
  {
    value: "William Wilson",
    label: "William Wilson",
    parentFirstName: "William",
    parentLastName: "Wilson",
    parentEmail: "william.wilson@example.com",
    parentPhone: "9012345678",
  },
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


const subjects = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "phisics",
    label: "Phisics",
  },
  {
    value: "sience",
    label: "Sience",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "arabic",
    label: "Arabic",
  },
];
export default function TeacherForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const form = useForm({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      year: "",
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      gender: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      teacherSubject:"",
      parentEmail: "",
      parentPhone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      salary:"",
      medicalConditions: null,
    },
  });
  const { reset, formState, setValue, getValues } = form;
  const { isSubmitting } = formState;

  const renderInput = (fieldName, field) => {
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
            open={open}
            setOpen={setOpen}
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
            value={getValues("gender")}
            onSelected={(selectedValue) => {
              onSelected(selectedValue);
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
    (selectedValue) => {
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
    [parentNames]
  );

  function onSubmit(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Teacher added!",
          description: "Teacher added Successfully",
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
            Create Teacher
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
