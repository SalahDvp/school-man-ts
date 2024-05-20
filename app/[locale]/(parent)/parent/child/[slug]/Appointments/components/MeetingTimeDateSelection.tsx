import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TimeDateSelection from './TimeDateSelection'
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

    /**
     * On Date Change Handle Method
     * @param {*} date 
     */
    const handleDateChange=(date)=>{
    }

    /**
     * Handle Schedule Event on Click Schedule Button
     * @returns 
     */
    const handleScheduleEvent=async()=>{
    }

  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8
    mx-10
    md:mx-26
    lg:mx-56
    my-10'
    style={{borderTopColor:eventInfo?.themeColor}}
    >
       <Image src='/logo.svg' alt='logo'
       width={150}
       height={150}/>
       <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            {/* Meeting Info  */}
            <div className='p-4 border-r'>
                <h2>{businessInfo?.businessName}</h2>
                <h2
                className='font-bold text-3xl'
                >{eventInfo?.eventName?eventInfo?.eventName:'Meeting Name'}</h2>
                <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{eventInfo?.duration} Min </h2>
                    <h2 className='flex gap-2'><MapPin/>{eventInfo?.locationType} Meeting </h2>
                    <h2 className='flex gap-2'><CalendarCheck/>{format(date,'PPP')}  </h2>
                  {selectedTime&&  <h2 className='flex gap-2'><Timer/>{selectedTime}  </h2>}
                  
                    <Link href={eventInfo?.locationUrl?eventInfo?.locationUrl:'#'}
                    className='text-primary'
                    >{eventInfo?.locationUrl}</Link>
                </div>
            </div>
            {/* Time & Date Selction  */}
<TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
           />
     

       </div>
       <div className='flex gap-3 justify-end'>

       <Button 
       onClick={handleScheduleEvent}
       > 
       {loading?<LoaderIcon className='animate-spin'/>:'Schedule' }
      </Button>
       </div>
    </div>
  )
}

export default MeetingTimeDateSelection