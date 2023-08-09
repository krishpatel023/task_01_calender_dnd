import { useState } from 'react'
import MonthView from './MonthView'
import ListView from './ListView'
export default function CalendarComponent() {
    const [view,setView]=useState("month")
  return (
    <div className='w-[95%]'>
        {
            view === "month"?
            <MonthView
                setView={setView}
            />
            :null
        }
        {
            view === "list"?
            <ListView
                setView={setView}
            />            
            :null
        }
    </div>
  )
}
