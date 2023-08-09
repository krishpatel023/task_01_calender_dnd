import React from 'react'

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center h-10 mt-4">
        <h1 className='text-xl font-semibold'>Calendar</h1>
        <div>
            <button className='w-32 h-10 bg-[#1E40AF] rounded text-white mr-2'>
                Print Schedule
            </button>
            <button className='bg-white w-10 h-10'>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
  )
}
