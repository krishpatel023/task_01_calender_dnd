import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function Day({day}) {
    function getCurrentDayClass (){
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") 
        ? "bg-[#1E40AF] text-white rounded-full w-7" 
        : " ";
    }
    function getCurrentMonthClass(){
        if(monthIndex < 0){
            var multiplier = Math.ceil( (-1 * monthIndex) / 12)
            var val = (12*multiplier) + monthIndex + 1;
            return  Number(day.format("MM")) === val
            ? "" 
            : "bg-[#F8FAFC] text-gray-300"
        }
        else{
            return  Number(day.format("MM")) === ((monthIndex%12)+1)
            ? "" 
            : "bg-[#F8FAFC] text-gray-300"
        }
    }
    const {monthIndex , setCurrentDrag, deleteEvents , currentDrag, eventList, addEvents} = useContext(GlobalContext)

    const [start, setStarts] = useState([])

    const addToStart = (item) => setStarts((tasks) => [...tasks, item]);
    const handleDragOver = (e)=>{
        e.preventDefault() 
    }
    const handleDrop = (data)=>{
        addEvents({
            id : currentDrag.id,
            name : currentDrag.name,
            date : data.format("DD-MM-YYYY")
        })
    }
    const doesEventStart = ()=>{
        setStarts([])
        eventList.map((data)=>{
            if(data.date === day.format("DD-MM-YYYY")){
                addToStart(data)
            }
        })
    }
    useEffect(()=>{
        doesEventStart()
    },[eventList])
    const handleDrag = (i) => {
        deleteEvents(start[i].id)
        setCurrentDrag({
            id : start[i].id ,
            name : start[i].name
        })
    }
  return (
    <div onDrop={()=>handleDrop(day)} 
         onDragOver={(e)=>handleDragOver(e)} 
         
         className={`h-[7.5rem]  border overflow-hidden border-gray-100 flex flex-col items-end ${getCurrentMonthClass()}`
    }>
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
            {day.format('DD')}
        </p>
        <div className="w-full flex flex-col justify-center items-center">
        {
            start?.length > 0 ?
                start.map((data,i)=>
                <div onDragStart={(e)=>handleDrag(i)} key={i} className='w-[90%] bg-[#1E40AF] text-white rounded text-center hover:cursor-pointer'>{data.name}</div>
                )
            :null
        }
        </div>
    </div>
  )
}
