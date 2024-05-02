"use client"
import React from "react";
import {addProfile} from "@/lib/hooks/profile"
import { useData } from "@/context/admin/fetchDataContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import  profileFormSchema  from "@/validators/general-info";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loadingButton";
import OpenDaysTable from "../../components/open-days-table";

type ProfileFormValues = z.infer<typeof profileFormSchema>;


const defaultValues : Partial<ProfileFormValues>  = {
  bio:  "I own a computer.",
  urls:  [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
  schoolName:  "Sample School",
  email:  "salah@email.com",
  phoneNumber:  "+1 1234567890",
  capacity: 500,
  nationalRanking:  10,
  address:  "123 Main St, City, Country",
  openDays:  [
    { day: "Monday", start: "09:00", end: "17:00", state: "open" },
    { day: "Tuesday", start: "09:00", end: "17:00", state: "open" },
    { day: "Wednesday", start: "09:00", end: "17:00", state: "open" },
    { day: "Thursday", start: "09:00", end: "17:00", state: "open" },
    { day: "Friday", start: "09:00", end: "17:00", state: "open" },
    { day: "Saturday", start: "10:00", end: "14:00", state: "open" },
    { day: "Sunday", start: "07:00", end: "18:00", state: "open" }
  ]
};



export function ProfileForm() {
 


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields: fields, append: append } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  const { fields: openDays } = useFieldArray({
    control: form.control,
    name: "openDays",
  });


 
  const {reset} = form;
  const {profile,setProfile}=useData()
  React.useEffect(() => {
    reset(profile)
    console.log("reset",profile);
    
  }, [profile])
  

  const {toast} = useToast()
  const onSubmit = async(data) => {
    await addProfile(data)
    setProfile({...data,id:"GeneralInformation"})
    toast({
      title: "changes applied!",
      description: `changes applied Successfully`,
    });
    console.log(data);


 
  }
 
 /* function onSubmit(data: ProfileFormValues) {

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
*/
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* School name field */}
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your school name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your school or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your school name" {...field} />
              </FormControl>
              <FormDescription>
                This is the email of your school or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone number field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 1234567890" {...field} onChange={event => field.onChange(+event.target.value)}/>
              </FormControl>
              <FormDescription>
                The phone number should be in the format "+[country code]
                [number]".
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Capacity field */}
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500" {...field} onChange={event => field.onChange(+event.target.value)}/>
              </FormControl>
              <FormDescription>
                This is the maximum capacity for your school or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* National ranking field */}
        <FormField
          control={form.control}
          name="nationalRanking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National Ranking</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} onChange={event => field.onChange(+event.target.value)}/>
              </FormControl>
              <FormDescription>
                This is the national ranking of your school or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Main St, City, Country"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the address of your school or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* URL fields */}
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
          <OpenDaysTable openDays={openDays} form={form}/>
        <LoadingButton  
         loading={form.formState.isSubmitting}
          type="submit">Update profile</LoadingButton>
      </form>
    </Form>
  );
}
