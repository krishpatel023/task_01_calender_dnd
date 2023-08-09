import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../utils/utils'
import dayjs from 'dayjs'
import  isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import GlobalContext from '../context/GlobalContext'
import DayListView from './DayListView'
export default function ListView({setView}) {

    const {weekIndex, setWeekIndex} = useContext(GlobalContext)
    const [week,setWeek] =useState()
    dayjs.extend(dayOfYear)


    useEffect(()=>{
        var startDate = dayjs().isoWeek(weekIndex).startOf('week')
        var myDay = dayjs(startDate).dayOfYear()
        setWeek([
            dayjs(startDate).dayOfYear(myDay),
            dayjs(startDate).dayOfYear(myDay+1),
            dayjs(startDate).dayOfYear(myDay+2),
            dayjs(startDate).dayOfYear(myDay+3),
            dayjs(startDate).dayOfYear(myDay+4),
            dayjs(startDate).dayOfYear(myDay+5),
            dayjs(startDate).dayOfYear(myDay+6),
        ])
    },[weekIndex])

    const handleNextWeek = ()=>{
        setWeekIndex(weekIndex + 1)
    }
    const handlePrevWeek = ()=>{
        setWeekIndex(weekIndex - 1)
    }
    dayjs.extend(isoWeek)
    const handleReset = ()=>{
        setWeekIndex(dayjs().isoWeek())
    }
  return (
    <>
    {
    week?
        <>
            <div className="w-full h-16 flex justify-between items-center mt-2 breakPoint2:h-64 breakPoint2:flex-col breakPoint2:mb-4">
                <h1 className='font-semibold breakPoint2:text-lg'>{week[0].format('MMM DD')} - {week[6].format('MMM DD')},{week[0].format('YYYY')}</h1>
                <div className='flex breakPoint2:flex-col breakPoint2:gap-2'>
                    <button onClick={()=>{setView('month')}} className='w-20 h-9 border-2 border-gray-100 rounded-l-lg  breakPoint2:w-48 breakPoint2:rounded'>Month</button>
                    <button className='w-20 h-9 border-2 border-gray-100 breakPoint2:w-48 breakPoint2:rounded'>Week</button>
                    <button className='w-20 h-9 border-2 border-gray-100 breakPoint2:w-48 breakPoint2:rounded'>Day</button>
                    <button onClick={()=>{setView('list')}} className='bg-[#1E40AF] text-white  w-20 h-9 border-2 border-gray-100 rounded-r-lg breakPoint2:w-48 breakPoint2:rounded'>List</button>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <button onClick={()=>{handlePrevWeek()}} className='w-9 h-9 rounded-l-lg border-2 border-gray-100'><i className="fa-solid fa-chevron-left"></i></button>
                        <button onClick={()=>{handleNextWeek()}} className='w-9 h-9 rounded-r-lg border-2 border-gray-100 mr-2'><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <button onClick={()=>{handleReset()}} className='w-16 h-9 border-2 border-gray-100 rounded'>
                        Today
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {/* DIFFERENT DAYS */}
                {
                    week?
                    week.map((data, i)=>
                        <DayListView
                            day={data}
                            key={i}
                        />
                    )
                    :null
                }
            </div>
        </>
    :null
    }
    </>
  )
}
