import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function RegisterForm() {

  const [dates, setDate] = useState([{
    selectedDate: new Date(),
  }])

  const [stateForm, setStateForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: 0,
    children: 0
    
  })
 
  const onChangeDate = (date) => {
    setDate([...dates, {selectedDate: date[0]} ])
    ///aici nu se memoreaza si al doilea elem
    setDate([...dates, {selectedDate: date[1]} ])
    ///
    console.log(dates)
    console.log(dates[0].selectedDate.getTime()) ///timestamp
    console.log(dates[0].selectedDate.toISOString().substring(0, 10)) ///nice  formatted date
    setStateForm({
      ...stateForm,
      checkIn: date[0].toISOString().substring(0, 10),
      checkOut: date[1].toISOString().substring(0, 10)
    })
  }

  const setInput = e => {
      e.preventDefault()
      const value = e.target.value;
      setStateForm({
        ...stateForm,
        [e.target.name]: value
      })
      console.log(stateForm)
  }

  return (
    <div className="RegisterForm">
        <form>
          <input
            value={stateForm.checkIn}
            name="checkIn"
            onChange={e => setInput(e)}
            className="registerForm__checkIn"
            placeholder="select from the table the dates..."
            type="text"
            />
          <input
            value={stateForm.checkOut}
            name="checkOut"
            onChange={e => setInput(e)}
            className="registerForm__checkOut"
            placeholder="select from the table the dates..."
            type="text"
            />
          <input
            value={stateForm.adults}
            name="adults"
            onChange={e => setInput(e)}
            className="registerForm__adults"
            type="text"
            />
          <input
            value={stateForm.children}
            name="children"
            onChange={e => setInput(e)}
            className="registerForm__children"
            type="text"
            />
        </form>
        <Calendar
          onChange={onChangeDate}
          value={dates.selectedDate}
          selectRange={true}
          returnValue="range"
        />
      </div>
  )

}


export default RegisterForm