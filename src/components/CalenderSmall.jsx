import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../utils/utils'
import Day from './Day'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs'
import DaySmall from './DaySmall'
export default function CalendarSmall() {
    // console.table(getMonth())
    const [currentMonth , setCurrentMonth] = useState(getMonth())

    const {smallMonthIndex, setSmallMonthIndex} = useContext(GlobalContext)
    useEffect(()=>{
        setCurrentMonth(getMonth(smallMonthIndex))
    },[smallMonthIndex])

    const handlePrevMonth = ()=>{
        setSmallMonthIndex(smallMonthIndex - 1)
    }
    const handleNextMonth = ()=>{
        setSmallMonthIndex(smallMonthIndex + 1)
    }
    const handleReset = ()=>{
        setSmallMonthIndex(dayjs().month())
    }
  return (
    <div className='w-full  bg-white rounded-lg mt-4 flex justify-center'>
        <div className='w-[90%] mb-4'>
            <div className="w-full h-12 flex justify-between items-center mt-2">
                <button onClick={()=>{handlePrevMonth()}} className='w-9 h-9 rounded-l-lg border-2 border-gray-100'><i className="fa-solid fa-chevron-left"></i></button>
                <h1 className='font-semibold'>{dayjs(new Date(dayjs().year(), smallMonthIndex)).format("MMMM YYYY")}</h1>
                <button onClick={()=>{handleNextMonth()}} className='w-9 h-9 rounded-r-lg border-2 border-gray-100 mr-2'><i className="fa-solid fa-chevron-right"></i></button>     
            </div>
            <div className='w-full  h-12 grid grid-cols-7 grid-row-1'>
                {   
                    currentMonth[0].map((data, i)=>
                        <div key={i} className='text-center text-black font-medium flex justify-center items-center'>
                            <span>{data.format('ddd').charAt(0)}{data.format('ddd').charAt(1)}</span>
                        </div>
                    )
                }
            </div>
            <div className='w-full grid grid-cols-7 grid-row-5'>

                {
                    currentMonth?
                    currentMonth.map((row,i) => (
                        <React.Fragment key={i}>
                        {   
                            row.map((day,j) =>(
                                <DaySmall 
                                    day={day}
                                    key = {j}
                                />
                            ))
                        }
                        </React.Fragment>
                        
                    ))
                    :null
                }
            </div>
        </div>
    </div>
  )
}
