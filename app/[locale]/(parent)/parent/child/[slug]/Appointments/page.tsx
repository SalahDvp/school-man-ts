"use client"

import { useChildData } from '@/app/[locale]/(parent)/components/childDataProvider';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import React,{useState,useEffect} from 'react';
import MeetingTimeDateSelection from './components/MeetingTimeDateSelection';


function AppointmentsPage() {
const {childData}=useChildData()
const t=useTranslations()

const [businessInfo,setBusinesInfo]=useState();
const [eventInfo,setEventInfo]=useState();
const [loading,setLoading]=useState(false)
return(
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">{t('general-information')}</h3>
      <p className="text-sm text-muted-foreground">
        {t('this_is_how_others_will_see_your_school')} </p>
    </div>
    <Separator />
    <MeetingTimeDateSelection eventInfo={eventInfo}
        businessInfo={businessInfo} />
    </div>
)
}

  


export default AppointmentsPage