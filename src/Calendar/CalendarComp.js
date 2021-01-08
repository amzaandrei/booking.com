import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import './CalendarComp.css'

function CalendarComp(props){

    const [prices, setPrices] = useState()

    const fetchDayPricesAndBookStages = () => {
        db.collection("book-prices").onSnapshot(snap => {
            setPrices(
                snap.docs.map(doc => {
                    return { id: doc.id, data: doc.data()}
                })
            )
        })
    }

    const monthNames = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
    ];
    const [monthIndex, setMonthIndex] = useState(0)
    const [monthIndex2, setMonthIndex2] = useState(0)
    const curr_month = new Date().getMonth()
    const getIndexOfMonth = (month) => {
        if(prices == null) return 
        for(var key in prices){
            if(prices[key].id == monthNames[month]){
                    if(monthIndex == 0)
                        setMonthIndex(key)
                    else
                        setMonthIndex2(key)
            }
        }
    }
    useEffect(() => { 
        getIndexOfMonth(curr_month)
        fetchDayPricesAndBookStages(curr_month)
    }, [])

    const [days, setNewDay] = useState([])
    var matrix = [];
    var dayDuplicates = []

    const countTheSameDays = (date) => {
        if(days.length < 35){
            setNewDay(days => days.concat(date))
        }else if(matrix.length == 0){
            for(var i=0; i<35; i++) {
                matrix[i] = new Array(0);
                matrix[i][0] = 0
            }
            days.forEach(day => {
                matrix[day][0] += 1
            })
            matrix.forEach((day,index) => {
                if(day[0] == 2)
                    dayDuplicates.push(index)
            })
        }
    }
    let dateRef = null


    const displayPrice = ({date, view}) =>{
        if(prices == null) return null
        else{
            countTheSameDays(date.getDate())
            if(dayDuplicates.length <= 1){
                if(monthIndex2 == 0){
                    var updateIndex = curr_month - 1
                    if(updateIndex < 0)
                        updateIndex = (monthNames.length + (updateIndex % monthNames.length)) % monthNames.length
                    getIndexOfMonth(updateIndex)
                }
                if (dayDuplicates.includes(date.getDate() - 1)){
                    dayDuplicates = dayDuplicates.filter((elem) => { return elem !== date.getDate() - 1})
                    console.log("here2", dayDuplicates)
                    return (<p>{prices[monthIndex2].data.values[date.getDate() - 1]} €</p>)
                }
            }else{
                if(prices[monthIndex].data.booked[date.getDate() - 1] == true)
                    return (<p style={{color: "red"}}>{prices[monthIndex].data.values[date.getDate() - 1]} €</p>)
                else
                    return (<p>{prices[monthIndex].data.values[date.getDate() - 1]} €</p>)
            }
        }
    }

    const disableDay = ({activeStartDate, date, view }) => {
        if(prices == null) return 
        if(prices[monthIndex].data.booked[date.getDate() - 1] == true)
            return date.getDate() - 1
    }

    return (
        <div className="calendarComp">
            <div className="calendar-container">
                <div className="calendar">
                <Calendar
                    className="cal"
                    onChange={props.onChange}
                    value={props.value}
                    selectRange={props.selectRange}
                    returnValue="range"
                    tileContent={displayPrice}
                    onClickDay={props.onClickDay}
                    tileDisabled={disableDay}
                />
                </div>
            </div>
        </div>
    )
}

export default CalendarComp
