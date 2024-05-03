
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
import { updateParent } from "@/lib/hooks/parents"
import { useData } from "@/context/admin/fetchDataContext"

  
  type ParentFormValues = z.infer<typeof ParentRegistrationSchema> & { [key: string]: string | Date | number;}
interface openModelProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    parent:ParentFormValues // Specify the type of setOpen
  }

  const fieldNames = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
    "numberOfChildren",
    "parentEmail",
    "parentPhone",
    "secondParentName",
    "secondParentPhone",
    "salary",
    "totalPayment"
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
    | 'address'
    | 'city'
    | 'state'
    | 'postalCode'
    | 'country'
    | 'parentEmail'
    | 'parentPhone'
    | 'secondParentName'
    | 'secondParentPhone'
    |'salary'
    |"numberOfChildren"
    | "totalPayment"
const SheetDemo: React.FC<openModelProps> = ({ setOpen,open,parent }) => {
    const {toast}=useToast()
    const {setParents}=useData()
    const [openGender,setOpenGender]=useState(false)

    
    const form =useForm<ParentFormValues>({
      resolver: zodResolver(ParentRegistrationSchema),
           defaultValues:{  
          id:"1",
          firstName: "John",
           lastName: "Doe",
           dateOfBirth: new Date("1990-01-01"),
           gender: "male",
           address: "123 Main Street",
           city: "Anytown",
           state: "California",
           postalCode: "12345",
           country: "USA",
           parentEmail: "parent@example.com",
           parentPhone: "+1234567890",
           numberOfChildren: 2,
           secondParentName: "Jane Doe",
           secondParentPhone: "+1987654321",
           salary: 50000,
           paymentStatus: "Active",
           totalPayment: 10000}
    });
    const {formState,setValue,getValues,reset } = form;
    const { isSubmitting } = formState;

    React.useEffect(() => {
      reset(parent)
      console.log("reset",parent);
      
   }, [parent])
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
              value={getValues("gender")} // Set the value based on the form's current value for the field
              onSelected={(selectedValue) => {
                const gender: "male" | "female" | "other" = selectedValue as "male" | "female" | "other";

                form.setValue(fieldName, gender);
              }}
            />
          );
        case "salary":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)
        case  "numberOfChildren":
            return (<Input {...field} onChange={event => field.onChange(+event.target.value)}/>)
            case  "totalPayment":
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
    async function onSubmit(data: ParentFormValues) {
        const changes = getChanges(data);

   
          await updateParent(data,data.id)
          setParents((prev:any) => {
            const updatedParents = prev.map((parent:ParentFormValues) =>
              parent.id === data.id? {...data,parent:`${data.firstName} ${data.lastName}`} : parent
            );
            return updatedParents;
          });
            toast({
                title: "changes applied!",
                description: `changes applied Successfully ${changes}`,
              })
          
              setOpen(false)

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
                      {renderInput(fieldName,field)}
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