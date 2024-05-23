import { Button } from '@/components/ui/button'
import { getDay, parse, format, addMinutes, isWithinInterval, eachMinuteOfInterval } from 'date-fns';
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CalendarDatePicker from '@/app/[locale]/(home)/students/components/date-picker'
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"
import { getTeachers } from './actions'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const generateTimeSlots = (officeHours, selectedDate, interval, appointments) => {
  const selectedDay = daysOfWeek[getDay(selectedDate)];
  const dayHours = officeHours.find(hours => hours.day === selectedDay);

  if (!dayHours) return [];

  const slots = [];
  const start = parse(dayHours.start, 'HH:mm', selectedDate);
  const end = parse(dayHours.end, 'HH:mm', selectedDate);
  
  const allSlots = eachMinuteOfInterval(
    { start, end },
    { step: interval }
  ).map(time => format(time, 'HH:mm'));

  for (const slot of allSlots) {
    const slotStart = parse(slot, 'HH:mm',selectedDate);
    const slotEnd = addMinutes(slotStart, interval);

    const isOverlapping = appointments.some(appointment => {
    
      
      const appointmentStart =appointment.start
      const appointmentEnd = appointment.end
     
      return isWithinInterval(slotStart, { start: appointmentStart, end: appointmentEnd }) ||
             isWithinInterval(slotEnd, { start: appointmentStart, end: appointmentEnd });
    });

    if (!isOverlapping) {
      slots.push(slot);
    }
  }

  return slots;
};
function MeetingTimeDateSelection() {
    const [prevBooking,setPrevBooking]=useState([]);
    const [teachers, setTeachers] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const form = useForm<any>({
      //resolver: zodResolver(ParentRegistrationSchema),
      defaultValues:{
        date:new Date(),
        teacher:'',
        slot:'08:00',
      }
    });

    
    const { reset, formState, setValue, getValues,watch } = form;

    const { isSubmitting } = formState;
    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          const getTeachersRef = await getDocs(collection(db, 'Teachers'));
          const teachersData = [];
      
          for (const data of getTeachersRef.docs) {
            const reservationsRef = await getDocs(query(
              collection(db, 'Teachers', data.id, 'Appointments'),
              // where('start', '>=', new Date())
            ));
            const appointments = reservationsRef.docs.map(doc => ({
              ...doc.data(),
              start:new Date(doc.data().start.toDate()),
              end:new Date(doc.data().end.toDate()),
              id: doc.id,
            }));
      
            teachersData.push({
              ...data.data(),
              id: data.id,
              dateOfBirth: new Date(data.data().dateOfBirth.toDate()),
              joiningDate: new Date(data.data().joiningDate.toDate()),
              teacher: `${data.data().firstName} ${data.data().lastName}`,
              value: `${data.data().firstName} ${data.data().lastName}`,
              label: `${data.data().firstName} ${data.data().lastName}`,
              appointments, // Updated to match the key used in the appointments array
            });
          }
      
          setTeachers(teachersData);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTeachers()
    }, [])
  
    const selectedTeacher = watch('teacher')
    const selectedDate = watch('date')
    const timeSlots = React.useMemo(() => {
      const teacher = teachers.find((t) => t.teacher === getValues("teacher"));
      if (!teacher || !teacher.officeHours) return [];
      console.log("slots",teacher.appointments);
      
      return generateTimeSlots(teacher.officeHours, getValues("date"), 20, teacher.appointments)
    
    }, [selectedTeacher, teachers,selectedDate ])
    const officeHoursDayIndex = React.useMemo(() => {
      const allIndexes = [0, 1, 2, 3, 4, 5, 6];
      const teacher = teachers.find(
        (t: any) => t.teacher ===selectedTeacher 
      );
      if (!teacher || !teacher.officeHours) return allIndexes;

      const array=teacher.officeHours.map((day)=>(
        daysOfWeek.indexOf(day.day)
      ))
  
      const remainingIndexes = allIndexes.filter(index => !array.includes(index));
      return  remainingIndexes;
    }, [selectedTeacher, teachers]);
    if (loading) {
      return <div>Loading...</div>
    }


  return  (
  <div className='md:flex md:flex-row'>
<Card className='w-full md:w-2/3 mr-2'>
  <CardHeader className='flex flex-col items-center justify-center text-center'>
    <CardTitle>Schedule an Appointment</CardTitle>
    <CardDescription>
      Pick a time that works best for you.
    </CardDescription>
  </CardHeader>
  <Form {...form}>
            <form>
  <CardContent className="grid gap-6 md:grid-cols-3 items-center justify-center">

    <div className="grid gap-2 w-full">
      <div className="space-y-2">
      <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <FormControl>
         <Select required onValueChange={(value)=>{
          
          form.setValue("teacher",value)
          
          }}>
 <SelectTrigger>
            <SelectValue placeholder="Select a teacher" />
          </SelectTrigger>
            <SelectContent>
 
            {teachers.map((teacher:any,index:number)=>(
  <SelectItem key={index} value={teacher.teacher}>{teacher.teacher}</SelectItem>
            ))}
                          </SelectContent>
              </Select>
    
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2">
        
        <Label htmlFor="date">Duration</Label>
        <Button className="w-full flex-col h-auto items-start" variant="outline" type='button'>
          <span className="font-normal">20 min</span>
        </Button>
      </div>
      <div className="space-y-2">
      <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
        <Button className="w-full flex-col h-auto items-start" variant="outline" type='button'>
          <span className="font-normal">{timeSlots.length>0?format(field.value,'d/M/yyyy'):"select Teacher or date"}</span>
        </Button>
        </FormControl>
        </FormItem>
        )}
      />
      </div>
      <Button type="submit">
        Book Appointment
      </Button>
    </div>
    <div className="grid gap-2 items-center justify-center md:justify-items-center w-full md:w-auto">
    <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
       <Calendar
            {...field}
            mode="single"
            disabled={{dayOfWeek:officeHoursDayIndex}}
            className="rounded-md border"
            selected={timeSlots.length>0?field.value:undefined}
            onDayClick={field.onChange}
          />
             </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    </div>
    <div className="grid gap-2  w-full">
  <ScrollArea className="h-72 w-full px-5">

    {timeSlots?.map((time, index) => (
      <FormField
        control={form.control}
        name="slot"
        key={index}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Button
                onClick={() => form.setValue("slot", time)}
                className={`border-primary w-full  mb-2 text-primary ${
                  time === getValues("slot") ? 'bg-primary text-white' : ''
                }`}
                variant="outline"
                type="button"
              >
                {time}
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </ScrollArea>

    </div>
  </CardContent>
  </form>
  </Form>
</Card>
   <Card className='w-full md:w-1/3'>
   <CardHeader className="pb-3">
     <CardTitle>Appointment History</CardTitle>
    
   </CardHeader>
   <CardContent className="grid gap-1 mt-10">
     <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
       <BellIcon className="mt-px h-5 w-5" />
       <div className="space-y-1">
         <p className="text-sm font-medium leading-none">Everything</p>
         <p className="text-sm text-muted-foreground">
           Email digest, mentions & all activity.
         </p>
       </div>
     </div>
     <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
       <PersonIcon className="mt-px h-5 w-5" />
       <div className="space-y-1">
         <p className="text-sm font-medium leading-none">Available</p>
         <p className="text-sm text-muted-foreground">
           Only mentions and comments.
         </p>
       </div>
     </div>
     <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
       <EyeNoneIcon className="mt-px h-5 w-5" />
       <div className="space-y-1">
         <p className="text-sm font-medium leading-none">Ignoring</p>
         <p className="text-sm text-muted-foreground">
           Turn off all notifications.
         </p>
       </div>
     </div>
   </CardContent>
 </Card>
 </div>
 
  );
}

export default MeetingTimeDateSelection