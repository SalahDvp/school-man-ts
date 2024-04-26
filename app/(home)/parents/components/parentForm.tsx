
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
import { ParentRegistrationSchema } from "@/validators/parentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import CalendarDatePicker from "../../students/components/date-picker";
import { ScrollArea} from "@/components/ui/scroll-area";
import ImageUpload from "../../students/components/uploadFile";
import Combobox from "@/components/ui/comboBox";
import { LoadingButton } from "@/components/ui/loadingButton";
import { z } from "zod";
const fieldNames = [
  "firstName",
  "lastName",
  "NumberOfChildren",
  "dateOfBirth",
  "gender",
  "year",
  "payment",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "parentEmail",
  "parentPhone",
  "secondParentName",
  "secondParentPhone",
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
  | 'parentEmail'
  | 'parentPhone'
  | 'secondParentName'
  | 'secondParentPhone'
  | 'payment'
  |'salary'

  type ParentFormValues = z.infer<typeof ParentRegistrationSchema>;

export default function ParentForm() {
  const { toast } = useToast();
  const [openGender, setOpenGender] = useState(false);
  const form = useForm<ParentFormValues>({
    resolver: zodResolver(ParentRegistrationSchema),
    defaultValues:  {
        id: '',
        year: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        parentEmail: '',
        parentPhone: '',
        NumberOfChildren: 0,
        secondParentName: '',
        secondParentPhone: '',
        payment: 0,
        salary:0,
        paymentStatus:'Active'
      }
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
        case "salary" ||"payment":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)

      default:
        return <Input {...field} />;
    }
  };


  function onSubmit(data:ParentFormValues) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
          toast({
            title: "Parent added!",
            description: "Parent added Successfully",
          });
          console.log(data);
          resolve();
        }, 2000); // Simulating a delay of 1 second
      });
 
  }

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Create Parent
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