
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
import { ParentRegistrationSchema } from "@/validators/parentSchema"
import CalendarDatePicker from "../../students/components/date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
import { z } from "zod"

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
  | 'ParentEmail'
  | 'ParentPhone'
  | 'secondParentName'
  | 'secondParentPhone'
  | 'payment';
  

interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }
  type ParentFormValues = z.infer<typeof ParentRegistrationSchema> & { [key: string]: string | Date | number; }

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
    "ParentEmail",
    "ParentPhone",
    "secondParentName",
    "secondParentPhone",
    "payment",
    
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
  
  ]
  const parent:ParentFormValues = {
    id:"qewqewqeqweqweq",
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
    parentEmail: "jane.doe@example.com",
    parentPhone: "123-456-7890",
    secondParentName: "Emergency Contact",
    secondParentPhone: "987-654-3210",
    salary:2000,
    payment:2000,
    NumberOfChildren:2,
    paymentStatus:'Active'
  
  };
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open }) => {
    const {toast}=useToast()
    const [openGender,setOpenGender]=useState(false)
    const form =useForm<ParentFormValues>({
      resolver: zodResolver(ParentRegistrationSchema),
           defaultValues:parent
    });
    const {formState,setValue,getValues } = form;
    const { isSubmitting } = formState;


    const renderInput = ({ fieldName, field }: any) => {
      switch (fieldName) {
        case 'dateOfBirth':
          return <CalendarDatePicker {...field} date={getValues("dateOfBirth")}   setDate={(selectedValue) => {
            if (selectedValue === undefined) {
              // Handle undefined case if needed
            } else {
              form.setValue(fieldName, selectedValue);
            }
          }}/>;
        case 'gender':
          return (
            <Combobox    {...field} open={openGender} setOpen={setOpenGender} placeHolder="gender" options={genders}
            value={getValues("gender")} // Set the value based on the form's current value for the field
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue); // Update the form value when an option is selected
            }}/>
          );
          case "salary" ||"payment":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)
        default:
          return <Input {...field} />;
      }
    };
    
  
    const getChanges = (currentValues: ParentFormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !== parent[key]) {
            changes += `${key}: ${parent[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
    function onSubmit(data: ParentFormValues) {
        const changes = getChanges(data);
            alert(changes);
            toast({
                title: "changes applied!",
                description: `changes applied Successfully ${changes}`,
              })
      }

    
  return (
    <Sheet open={open}  onOpenChange={setOpen}  >
   
   <SheetContent className=" sm:max-w-[650px]">
      <ScrollArea className="h-screen pb-20 "> 
        <SheetHeader>
          <SheetTitle>Edit Parent</SheetTitle>
          <SheetDescription>
            Make changes to your Parent here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
            <form>
           
          {fieldNames.map((fieldName,index) => (
             <FormField
             key={index}
             control={form.control}
             name={fieldName as FormKeys} 
             
             render={({ field }) => (
              <FormItem style={{marginBottom:15}} >
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl  >
                      {renderInput({ fieldName, field })}
                      </FormControl>
           
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
              ))}
          
            </form>
          </Form>
          
              <ImageUpload/>

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            
          <LoadingButton loading={isSubmitting} type="submit"    onClick={form.handleSubmit(onSubmit)}>
            Save changes
      </LoadingButton>
          </SheetClose>
        </SheetFooter>
        </ScrollArea>
      </SheetContent>
      
    </Sheet>
  )
}
export default SheetDemo