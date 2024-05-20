"use client"

import { useChildData } from '@/app/[locale]/(parent)/components/childDataProvider';
import React from 'react';

function FamilyPage() {
const {childData}=useChildData()
    
    return <>Family {childData.name}...</>;
}

  


export default FamilyPage