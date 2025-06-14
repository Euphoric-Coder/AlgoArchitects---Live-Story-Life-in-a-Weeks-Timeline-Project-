'use client'

import TimelineView from '@/components/Timeline'
import React, { useState } from 'react'

const page = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`);
      };

  return (
    <div>
        <TimelineView selectedYear={selectedYear} onYearChange={setSelectedYear} onEventClick={handleEventClick}/>
    </div>
  )
}

export default page