import React from 'react'
import Day from './Day'
import { useContext, useEffect, useState } from 'react'
import { getMonth } from '../utils/utils'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs'

export default function MonthView({setView}) {
    const [currentMonth , setCurrentMonth] = useState(getMonth())

    const {monthIndex, setMonthIndex} = useContext(GlobalContext)
    useEffect(()=>{
        setCurrentMonth(getMonth(monthIndex))
    },[monthIndex])

    const handlePrevMonth = ()=>{
        setMonthIndex(monthIndex - 1)
    }
    const handleNextMonth = ()=>{
        setMonthIndex(monthIndex + 1)
    }
    const handleReset = ()=>{
        setMonthIndex(dayjs().month())
    }
  return (
    <>
        <div className="w-full h-16 flex justify-between items-center mt-2 breakPoint2:h-64 breakPoint2:flex-col breakPoint2:mb-4">
            <h1 className='font-semibold breakPoint2:text-lg'>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h1>
            <div className='flex breakPoint2:flex-col breakPoint2:gap-2'>
                <button onClick={()=>{setView('month')}} className='bg-[#1E40AF] text-white w-20 h-9 border-1 border-gray-100 rounded-l-lg  breakPoint2:w-48 breakPoint2:rounded'>Month</button>
                <button className='w-20 h-9 border-2 border-gray-100 breakPoint2:w-48 breakPoint2:rounded'>Week</button>
                <button className='w-20 h-9 border-2 border-gray-100 breakPoint2:w-48 breakPoint2:rounded'>Day</button>
                <button onClick={()=>{setView('list')}} className='w-20 h-9 border-2 border-gray-100 rounded-r-lg breakPoint2:w-48 breakPoint2:rounded'>List</button>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <button onClick={()=>{handlePrevMonth()}} className='w-9 h-9 rounded-l-lg border-2 border-gray-100'><i className="fa-solid fa-chevron-left"></i></button>
                    <button onClick={()=>{handleNextMonth()}} className='w-9 h-9 rounded-r-lg border-2 border-gray-100 mr-2'><i className="fa-solid fa-chevron-right"></i></button>
                </div>
                <button onClick={()=>{handleReset()}} className='w-16 h-9 border-2 border-gray-100 rounded'>
                    Today
                </button>
            </div>
        </div>
        <div className='w-full  h-12 grid grid-cols-7 grid-row-1'>
            {   currentMonth?
                currentMonth[0].map((data, i)=>
                    <div key={i} className='text-center text-black font-medium border border-gray-100 flex justify-center items-center'>
                        <span>{data.format('ddd')}</span>
                    </div>
                )
                :null
            }
        </div>
        <div className='w-full grid grid-cols-7 grid-row-5 mb-12'>

            {
                currentMonth?
                currentMonth.map((row,i) => (
                    <React.Fragment key={i}>
                    {   
                        row.map((day,j) =>(
                            <Day 
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
    </>
  )
}
