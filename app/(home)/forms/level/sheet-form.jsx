"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// List of subjects for the checkboxes
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
const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  ageRange: z.string().min(1, "Age range is required."),
  description: z.string().min(1, "Description is required."),
  price: z.string().min(1, "Price is required."),
  objects: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one object of study.",
  }),
});
export function SheetDemo({ addLevel }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ageRange: "",
      description: "",
      price: "",
      objects: [],
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data) => {
    addLevel(data);
    form.reset(); // Reset the form after submission
  };

  const handleSave = () => {
    if (name && ageRange && description && price && selectedObjects.length > 0) {
      // Create a new level with the current selections
      addLevel({ name, ageRange, description, price, objects: selectedObjects });
      // Reset all fields after saving
      setName('');
      setAgeRange('');
      setDescription('');
      setPrice('');
      setSelectedObjects([]);
    }
  };
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">Add new</Button>
    </SheetTrigger>
    <SheetContent className=" sm:max-w-[650px]">
      <SheetHeader>
        <SheetTitle>Add New Level</SheetTitle>
        <SheetDescription>
          Enter the details for the new level, including price and objects of study.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Input fields */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter level name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="ageRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Range</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter age range" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Describe the level" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Checkboxes for Objects of Study */}
          <FormField
            control={control}
            name="objects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objects of Study</FormLabel>
                <FormDescription>Select the objects for this level.</FormDescription>
                {objectOptions.map((option) => (
                  <div key={option.value} className="flex flex-row items-start space-x-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value.filter((val) => val !== option.value)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Form Footer with Save Button */}
          <SheetFooter>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  </Sheet>
);
}