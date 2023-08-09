import React, { useContext } from 'react'
import CalendarComponent from '../components/Calendar'
import CalendarSmall from '../components/CalenderSmall'
import Tasks from '../components/Tasks'
import Modal from '../components/Modal'
import Header from '../components/Header'
import GlobalContext from '../context/GlobalContext'
export default function Calender() {

    const { showModal } =useContext(GlobalContext)


  return (
    <div className="max-w-screen overflow-x-hidden bg-[#F1F5F9] min-h-screen flex flex-col items-center text-black">
        {
        showModal === false?
        <div className="w-[95%]">
            <Header/>
            <div className="w-full flex justify-between mt-4 breakPoint1:flex-col">
                <div className='w-[24%] breakPoint1:w-full'>
                    <Tasks/>
                    <CalendarSmall/>
                </div>
                <div className='w-[75%] bg-white rounded-lg flex justify-center  mb-8 breakPoint1:w-full breakPoint1:mt-4'>
                    <CalendarComponent/>
                </div>
            </div>
        </div>
        :
        <Modal/>
        }
    </div>
  )
}
