"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import levelSchema from '@/validators/level';
import { LoadingButton } from '@/components/ui/loadingButton';
import CalendarDatePicker from "../../../students/components/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addLevel } from "@/lib/hooks/levels";
import { useData } from "@/context/admin/fetchDataContext";

const objectOptions = [
  { value: 'math', label: 'Math' },
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'physics', label: 'Physics' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'physical_education', label: 'Physical Education' },
  { value: 'ict', label: 'ICT (Information and Communication Technology)' },
  // Add more subjects if needed
];

// Schema for validation with zod

export function SheetDemo() {
  const {setLevels}=useData()
  const form = useForm({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      id: "1",

      status: "open",


    },
   
  });

  const { reset, handleSubmit, control, isSubmitting,getValues,register,setValue} = form;
  const { fields:subjects, append:appendSubject,remove:removeSubject} = useFieldArray({
    control: form.control,
    name: "subjects",
  });
  const { fields:prices, append:appendPrice,remove:Price, } = useFieldArray({
    control: form.control,
    name: "prices",
  });
  

  const {toast}=useToast()
  const onSubmit = async(data) => {
    
    const a = await addLevel(data)
    setLevels((prev) => [...prev, {...data,id:a}]);
    toast({
      title: "changes applied!",
      description: `changes applied Successfully`,
    });
    console.log(data);
    reset()

 
  }
  
  const handleChangePrice = (index, newPrice) => {
    const newPrices = [...getValues('prices')]; // Get the current prices array
    newPrices[index].price = newPrice; // Update the price at the specified index
    setValue('prices', newPrices); // Set the updated prices array in the form
  };
  const periodOptions = [
    '1 month',
    '2 months',
    '4 months',
    '1 year',
  ];
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">Add new</Button>
    </SheetTrigger>
    <SheetContent className="sm:max-w-[650px]">
    <ScrollArea className="h-screen  ">

      <SheetHeader>
        <SheetTitle>Add New Level</SheetTitle>
        <SheetDescription>
          Enter the details for the new level, including price and subjects of study.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
      <form  className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Input fields */}
          <FormField
            control={control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter level name" />
                </FormControl>
                <FormDescription>This is the name of the level.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
      control={control}
      name="start"
      render={({ field }) => (
        <FormItem>
          <FormLabel>start date</FormLabel>
          <FormControl>
            
          <CalendarDatePicker
            {...field}
   
            date={getValues("start") ? new Date(getValues("start")) : null}
              setDate={(selectedValue) => {
              if (selectedValue === undefined) {
          // Handle undefined case if needed
             } else {
                  form.setValue("start", selectedValue);
                }
      }}
    />
          </FormControl>
          <FormDescription>This is the start date of the level.</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="end"
      render={({ field }) => (
        <FormItem>
          <FormLabel>end date</FormLabel>
          <FormControl>
            
          <CalendarDatePicker
            {...field}

            date={getValues("end") ? new Date(getValues("end")) : null}
              setDate={(selectedValue) => {
              if (selectedValue === undefined) {
          // Handle undefined case if needed
             } else {
                  form.setValue("end", selectedValue);
                }
      }}
    />
          </FormControl>
          <FormDescription>This is the end date of the level.</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  
  <FormField
      control={control}
      name="registrationDeadline"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Deadline</FormLabel>
          <FormControl>
            
          <CalendarDatePicker
            {...field}
        
            date={getValues("registrationDeadline") ? new Date(getValues("registrationDeadline")) : null}
              setDate={(selectedValue) => {
              if (selectedValue === undefined) {
          // Handle undefined case if needed
             } else {
                  form.setValue("registrationDeadline", selectedValue);
                }
      }}
    />
          </FormControl>
          <FormDescription>This is the registration Deadline date of the level.</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
          <FormField
            control={control}
            name="fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Enter price"  type="number"  onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
                <FormDescription>This is the fee for the level.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          {/*select payments methods*/}

                 
          
            
                    <FormField
            control={control}
            name="prices"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment methods</FormLabel>
                <FormDescription>add how parents are going to pay</FormDescription>
                <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Period</TableHead>
      <TableHead>Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>

                {prices.map((option,index) => (
        
        
                    <TableRow key={index}>
                    <TableCell className="font-semibold">
                    <FormControl>
              <Input
                placeholder="Enter method name"
                defaultValue={option.name}
                {...register(`prices.${index}.name`)}
              />
          </FormControl>
            </TableCell>
            <TableCell>
            <FormControl>
              <Select
   
                defaultValue={option.period}
              >
                                 <SelectTrigger
                              id={`period-${index}`}
                              aria-label={`Select period`}
                            >
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
            <SelectContent>
                            {periodOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
              </Select>
              </FormControl>
            </TableCell>
            <TableCell>
            <FormControl>
              <Input
               placeholder="Enter price"
               type="number"
               value={option.price}
               onChange={(e) => handleChangePrice(index, parseInt(e.target.value))}

              />
              </FormControl>
            </TableCell>
      </TableRow>
    

                ))}
         
         </TableBody>
</Table>
<Button type='button' size="sm" variant="ghost" className="gap-1 w-full"  onClick={() => appendPrice({name: '2 Semesters', period:'1 month',price:900 })}>
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Level
                    </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Checkboxes for Objects of Study */}
          <FormField
            control={control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjects of Study</FormLabel>
                <FormDescription>Select the subjects for this level.</FormDescription>
                <div className="grid grid-cols-2 gap-4">
                {objectOptions.map((option) => (
                  <div key={option.value} className="flex flex-row items-start space-x-3">
                    <FormControl>
                      <Checkbox
                        
                        checked={subjects.some(obj => obj.value === option.value)}
                 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            appendSubject({ value: option.value ,label:option.label});
                          } else {
                            const indexToRemove = subjects.findIndex(obj => obj.value === option.value);
                            if (indexToRemove !== -1) {
                              removeSubject(indexToRemove);
                            }
                          }
                        }}
                        
                      />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </div>
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          

          <SheetFooter className=" pb-20">
            <SheetClose asChild>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
    
              >
                  Save changes
              </LoadingButton>
              </SheetClose>
              </SheetFooter>
        </form>
      </Form>

          </ScrollArea>
    </SheetContent>
  </Sheet>
);
}