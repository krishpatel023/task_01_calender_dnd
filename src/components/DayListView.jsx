import React, { useContext, useState ,useEffect} from 'react'
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import isBetween from 'dayjs/plugin/isBetween'

export default function DayListView({day}) {

    function hidePrevDays(){
        return day.format("DD-MM-YYYY") <= dayjs().format("DD-MM-YYYY") 
        ? "bg-[#1E40AF] text-white rounded-full w-7" 
        : " ";
    }
    const {eventList} = useContext(GlobalContext)
    
    useEffect(()=>{
        setDayTask([])
        doesTaskExists()
    },[day])
    const doesTaskExists = ()=>{
        eventList.map((data)=>{
            var isStartDate = day.format("DD-MM-YYYY") === data.date

            if( isStartDate === true){
                addToTasks(data)
            }
        })
    }
    const [dayTask, setDayTask]=useState([])
    const addToTasks = (item)=> setDayTask((tasks) => [...tasks, item])
  return (
    <>
    {
        dayTask?.length > 0 ?
        <div className="w-full border-2 border-gray-100 rounded mb-2">
            <div className='bg-[#F8FAFC] h-12 flex justify-between items-center'>
                <h1 className='font-semibold ml-4'>{day.format('dddd')}</h1>
                <h1 className='font-semibold mr-4'>{day.format('DD-MM-YYYY')}</h1>
            </div>
            {/* FOR TASKS */}
            {
                dayTask.map((data,i) => 
                    <div className='flex items-center h-12 hover:bg-[#F5F5F5] hover:cursor-pointer' key={i}>
                        <span className='ml-4'>all-day</span>
                        <span className='w-[10%] text-xs text-[#1E40AF] flex justify-center'><i className="fa-solid fa-circle fa-xs"></i></span>
                        <span>{data.name}</span>
                    </div>
                )
            }
        </div>
        :null
    }
    

    </>
  )
}
