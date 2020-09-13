import React, { useState } from "react"
import Calendar from "react-calendar"
import { Button } from "@material-ui/core"
import "react-calendar/dist/Calendar.css"
import db from "../firebase"

function RegisterForm() {
  const [dates, setDate] = useState([
    {
      selectedDate: new Date(),
    },
  ])

  const [stateForm, setStateForm] = useState({
    firstName: "",
    lastName: "",
    emailAdress: "",
    phoneNumber: "",
    message: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
  })

  const onChangeDate = date => {
    setDate([...dates, { selectedDate: date[0] }])
    ///aici nu se memoreaza si al doilea elem
    setDate([...dates, { selectedDate: date[1] }])
    ///
    console.log(dates)
    console.log(dates[0].selectedDate.getTime()) ///timestamp
    console.log(dates[0].selectedDate.toISOString().substring(0, 10)) ///nice  formatted date
    setStateForm({
      ...stateForm,
      checkIn: date[0].toISOString().substring(0, 10),
      checkOut: date[1].toISOString().substring(0, 10),
    })
  }

  const setInput = e => {
    const value = e.target.value
    setStateForm({
      ...stateForm,
      [e.target.name]: value,
    })
    console.log(stateForm)
  }

  const sendPost = e => {
    e.preventDefault()

    db.collection("bookings").add({
      firstName: stateForm.firstName,
      lastName: stateForm.lastName,
      emailAdress: stateForm.emailAdress,
      phoneNumber: stateForm.phoneNumber,
      message: stateForm.message,
      checkIn: stateForm.checkIn,
      checkOut: stateForm.checkOut,
      adults: stateForm.adults,
      children: stateForm.children,
      pending: true,
      booked: false,
    })

    // setDate([])
    // setStateForm({})
  }

  return (
    <div className="RegisterForm">
      <Calendar
        onChange={onChangeDate}
        value={dates.selectedDate}
        selectRange={true}
        returnValue="range"
      />
      <form>
        <input
          value={stateForm.firstName}
          name="firstName"
          onChange={e => setInput(e)}
          className="registerForm__firstName"
          placeholder="Your firstname..."
          type="text"
        />
        <input
          value={stateForm.lastName}
          name="lastName"
          onChange={e => setInput(e)}
          className="registerForm__lastName"
          placeholder="Your lastName..."
          type="text"
        />
        <input
          value={stateForm.emailAdress}
          name="emailAdress"
          onChange={e => setInput(e)}
          className="registerForm__emailAdress"
          placeholder="Your email..."
          type="email"
          pattern=".+@globex.com"
        />
        <input
          value={stateForm.phoneNumber}
          name="phoneNumber"
          onChange={e => setInput(e)}
          className="registerForm__phoneNumber"
          placeholder="Please insert your phone number..."
          type="phone"
        />
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
        <textarea
          name="message"
          value={stateForm.message}
          onChange={e => setInput(e)}
          className="registerForm__message"
          rows="4"
          cols="50"
          placeholder="Please insert any comments that you would like to know about!"
        ></textarea>
      </form>
      <Button onClick={sendPost} type="submit" className="registerForm__btn">
        Post
      </Button>
    </div>
  )
}

export default RegisterForm
