
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
import ImageUpload from "./uploadFile"
import {useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ParentRegistrationSchema } from "@/app/validators/authParent"
import CalendarDatePicker from "./date-picker"
import Combobox from "@/components/ui/comboBox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { LoadingButton } from "@/components/ui/loadingButton"
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
  | 'ParentFirstName'
  | 'ParentLastName'
  | 'ParentEmail'
  | 'ParentPhone'
  | 'secondParentName'
  | 'secondParentPhone'
  | 'payment';
  

interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }
interface FormValues {
    year: string;
    firstName: string;
    lastName: string;
    dateOfBirth: any;
    gender: 'male' | 'female' | 'other';
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhone: string;
    secondParentName: string;
    secondParentPhone: string;
    payment:string;
    // Add other fields as needed
    [key: string]: string | Date;
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
    "ParentEmail",
    "ParentPhone",
    "secondParentName",
    "secondParentPhone",
    "payment",
    
  ];
  const parentNames = [
    { value: "John Doe", label: "John Doe", parentFirstName: "John", parentLastName: "Doe", parentEmail: "john.doe@example.com", parentPhone: "1234567890" },
    { value: "Jane Smith", label: "Jane Smith", parentFirstName: "Jane", parentLastName: "Smith", parentEmail: "jane.smith@example.com", parentPhone: "9876543210" },
    { value: "Michael Johnson", label: "Michael Johnson", parentFirstName: "Michael", parentLastName: "Johnson", parentEmail: "michael.johnson@example.com", parentPhone: "5678901234" },
    { value: "Emily Brown", label: "Emily Brown", parentFirstName: "Emily", parentLastName: "Brown", parentEmail: "emily.brown@example.com", parentPhone: "3456789012" },
    { value: "William Wilson", label: "William Wilson", parentFirstName: "William", parentLastName: "Wilson", parentEmail: "william.wilson@example.com", parentPhone: "9012345678" },
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
  const Parent:FormValues = {
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
    
    payment:"20000",
  };
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open }) => {
    const {toast}=useToast()
    const [openParent,setOpenParent]=useState(false)
    const [openGender,setOpenGender]=useState(false)
    const [openSubject, setOpenSubject] = useState();
    const form =useForm<FormValues>({
      resolver: zodResolver(ParentRegistrationSchema),
           defaultValues: {
            year: Parent?.year || "",
            firstName: Parent?.firstName || "",
            lastName: Parent?.lastName || "",
            dateOfBirth: Parent?.dateOfBirth || new Date(),
            gender: Parent?.gender || "",
            address: Parent?.address || "",
            city: Parent?.city || "",
            state: Parent?.state || "",
            postalCode: Parent?.postalCode || "",
            country: Parent?.country || "",
            ParentEmail: Parent?.ParentEmail || "",
            ParentPhone: Parent?.parentPhone || "",
            secondParentName: Parent?.secondParentName || "",
            secondParentPhone: Parent?.secondParentPhone || "",
            
            payment:Parent?.payment || "",
          },
      
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
          case 'parentFirstName':
            return (
                <Combobox
                {...field}
                open={openParent}
                setOpen={setOpenParent}
                placeHolder="parents"
                options={parentNames}
                value={getValues("parentFirstName")}
                onSelected={(selectedValue) =>{ onSelected(selectedValue);form.setValue(fieldName, selectedValue); }}// Set the value based on the form's current value for the field
              />
            );
        case 'gender':
          return (
            <Combobox    {...field} open={openGender} setOpen={setOpenGender} placeHolder="gender" options={genders}
            value={getValues("gender")} // Set the value based on the form's current value for the field
            onSelected={(selectedValue) => {
              form.setValue(fieldName, selectedValue); // Update the form value when an option is selected
              onSelected(selectedValue); // Call the onSelected callback if needed
            }}/>
          );
       
        default:
          return <Input {...field} />;
      }
    };
    const onSelected = useCallback((selectedValue:string) => {
      const selectedParent = parentNames.find(parent => parent.value === selectedValue);
      if (selectedParent) {
        // Update form fields with selected parent information
      setValue('parentFirstName', selectedParent.parentFirstName);
      setValue('parentLastName', selectedParent.parentLastName);
      setValue('parentEmail', selectedParent.parentEmail);
      setValue('parentPhone', selectedParent.parentPhone);
      }
    }, [parentNames]);
  
    const getChanges = (currentValues: FormValues): string => {
        let changes = 'Changes:\n';
    
        for (const key in currentValues) {
          if (currentValues[key] !== Parent[key]) {
            changes += `${key}: ${Parent[key]} => ${currentValues[key]}\n`;
          }
        }
    
        return changes;
      };
    function onSubmit(data: FormValues) {
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