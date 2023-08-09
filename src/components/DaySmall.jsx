import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function DaySmall({day}) {
    function getCurrentDayClass (){
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") 
        ? "bg-[#1E40AF] text-white rounded w-7" 
        : " ";
    }
    function getCurrentMonthClass(){
        if(smallMonthIndex < 0){
            var multiplier = Math.ceil( (-1 * smallMonthIndex) / 12)
            var val = (12*multiplier) +smallMonthIndex + 1;
            return  Number(day.format("MM")) === val
            ? "" 
            : "text-gray-300"
        }
        else{
            return  Number(day.format("MM")) === ((smallMonthIndex%12)+1)
            ? "" 
            : "text-gray-300"
        }
    }
    const {smallMonthIndex} = useContext(GlobalContext)
  return (
    <div className={`h-12 flex flex-col items-center justify-center ${getCurrentMonthClass()}`}>
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
            {day.format('DD')}
        </p>
    </div>
  )
}
