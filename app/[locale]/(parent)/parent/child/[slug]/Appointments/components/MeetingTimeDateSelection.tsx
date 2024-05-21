import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
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
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"

function MeetingTimeDateSelection({eventInfo,businessInfo}) {
    const [date,setDate]=useState(new Date())
    const [timeSlots,setTimeSlots]=useState();
    const [enableTimeSlot,setEnabledTimeSlot]=useState(false);
    const [selectedTime,setSelectedTime]=useState();
    const [prevBooking,setPrevBooking]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
    createTimeSlot(20)
    },[eventInfo])
    const createTimeSlot=(interval)=>{
        const startTime = 8 * 60; // 8 AM in minutes
        const endTime = 22 * 60; // 10 PM in minutes
        const totalSlots = (endTime - startTime) / interval;
        const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    });
 
    console.log(slots)  
    setTimeSlots(slots); 
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
  <CardContent className="grid gap-6 md:grid-cols-3 items-center justify-center">
    <div className="grid gap-2 w-full">
      <div className="space-y-2">
        <Label htmlFor="teacher">Teacher</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select a teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teacher1">Teacher 1</SelectItem>
            <SelectItem value="teacher2">Teacher 2</SelectItem>
            <SelectItem value="teacher3">Teacher 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Button className="w-full flex-col h-auto items-start" variant="outline">
          <span className="font-semibold uppercase text-[0.65rem]">Select date</span>
          <span className="font-normal">4/2/2024</span>
        </Button>
      </div>
      <Button type="submit">
        Book Appointment
      </Button>
    </div>
    <div className="grid gap-2 items-center justify-center md:justify-items-center w-full md:w-auto">
      <Calendar className="h-full w-full md:w-auto" />
    </div>
    <div className="grid gap-2 items-center justify-center md:justify-items-center w-full md:w-48">
      <ScrollArea className="h-72 w-full">
        {timeSlots?.map((time, index) => (
          <Button
            onClick={() => setSelectedTime(time)}
            className={`border-primary w-full mb-2 text-primary ${
              time === selectedTime && 'bg-primary text-white'
            }`}
            variant="outline"
            key={index}
          >
            {time}
          </Button>
        ))}
      </ScrollArea>
    </div>
  </CardContent>
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