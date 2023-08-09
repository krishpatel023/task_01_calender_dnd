import React , {useState} from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'
import  isoWeek from 'dayjs/plugin/isoWeek'
import dayOfYear from 'dayjs/plugin/dayOfYear'
export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallMonthIndex, setSmallMonthIndex] = useState(dayjs().month())

    const initialState = [
        {
            name : "Student Fest"
        },
        {
            name : "Laracon 2023"
        },
        {
            name : "Student Examination"
        },
        {
            name : "Assignment Submission"
        }
    ]
    const [tasks,setTasks] = useState(initialState)

    const addTasks = (item) => setTasks((tasks) => [...tasks, item]);
    const deleteTasks = (id) => setTasks((tasks) => tasks.filter((item) => item.id !== id));

    const [showModal, setShowModal] = useState(false)

    dayjs.extend(isoWeek)
    const [weekIndex, setWeekIndex] = useState(dayjs().isoWeek())

    // DRAG AND DROP
    const [currentDrag, setCurrentDrag] = useState()
    dayjs.extend(dayOfYear)
    const today = dayjs().format('DD-MM-YYYY')
    const curr = dayjs(today).dayOfYear()
    const [eventList, setEventList] = useState([
        {   
            id: 1,
            date : today,
            name : "Student Fest"
        },
        {   
            id: 4,
            date : dayjs(today).dayOfYear(curr - 31).format('DD-MM-YYYY'),
            name : "Student Fest"
        },
        {   
            id: 2,
            date : dayjs(today).dayOfYear(curr - 29).format('DD-MM-YYYY'),
            name : "Student Fest"
        },
        {   
            id: 3,
            date : dayjs(today).dayOfYear(curr - 25).format('DD-MM-YYYY'),
            name : "Assignment Submission"
        }
    ])
    // const [eventList, setEventList] = useState([
    //     {   
    //         id: 1,
    //         date : "08-08-2023",
    //         name : "Student Fest"
    //     },
    //     {   
    //         id: 4,
    //         date : "09-08-2023",
    //         name : "Student Fest"
    //     },
    //     {   
    //         id: 2,
    //         date : "10-08-2023",
    //         name : "Student Fest"
    //     },
    //     {   
    //         id: 3,
    //         date : "17-08-2023",
    //         name : "Assignment Submission"
    //     }
    // ])
    const addEvents = (item) => setEventList((tasks) => [...tasks, item]);
    const deleteEvents = (id) => setEventList((tasks) => tasks.filter((item) => item.id !== id));
    const value = {
        monthIndex,
        setMonthIndex,
        smallMonthIndex,
        setSmallMonthIndex,
        tasks,
        addTasks,
        deleteTasks,
        showModal,
        setShowModal,
        weekIndex,
        setWeekIndex,

        currentDrag,
        setCurrentDrag,
        eventList,
        addEvents,
        deleteEvents
    }
  return (
      <GlobalContext.Provider value={value}>
        {props.children}
      </GlobalContext.Provider>
  )
}
