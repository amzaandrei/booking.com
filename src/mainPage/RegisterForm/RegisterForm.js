import React, { useContext, useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { db } from "../../firebase"
import { UserContext } from '../../providers/UserProvider'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { NavBarNames} from '../../providers/NavBarProvider'

import './RegisterForm.css'

function RegisterForm(props) {

  const user = useContext(UserContext)
  const apartNames = useContext(NavBarNames)
  const [currUser, setCurrUser] = useState()

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
    apartament: "",
    adults: 0,
    children: 0,
  })

  useEffect(() => {
    if(user != null){
      setCurrUser(user)
      // setStateForm({
      //   ...stateForm,
      //   emailAdress: user.emailAdress,
      //   uid: user.uid
      // })
    }
  }, user)

  const onChangeDate = date => {
    setDate([...dates, { selectedDate: date[0] }])
    ///aici nu se memoreaza si al doilea elem
    setDate([...dates, { selectedDate: date[1] }])

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
      apartament: stateForm.apartament,
      uid: currUser.uid,
      booked: false,
      rejected: false,
    })

    props.notifCall()

  }


  return (
    <div className="RegisterForm">
      <div className="calendar-container">
        <div className="calendar">
          <Calendar
            onChange={onChangeDate}
            value={dates.selectedDate}
            selectRange={true}
            returnValue="range"
          />
        </div>
      </div>
      <Form>
        <FormGroup>
          <Label>First Name</Label>
          <Input value={stateForm.firstName} onChange={e => setInput(e)} type="text" name="firstName"  placeholder="First Name" />
        </FormGroup>
        <FormGroup>
          <Label>Second Name</Label>
          <Input value={stateForm.lastName} onChange={e => setInput(e)} type="text" name="lastName"  placeholder="Second Name" />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input value={stateForm.emailAdress} onChange={e => setInput(e)} type="email" name="emailAdress" placeholder="Insert your email" />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input value={stateForm.phoneNumber} onChange={e => setInput(e)} type="tel" name="phoneNumber" placeholder="Phone Number" />
        </FormGroup>
        <FormGroup>
          <Label>Check in</Label>
          <Input value={stateForm.checkIn} onChange={e => setInput(e)} type="text" name="checkIn" placeholder="Select check in" />
        </FormGroup>
        <FormGroup>
          <Label>Check out</Label>
          <Input value={stateForm.checkOut} onChange={e => setInput(e)} type="text" name="checkOut" placeholder="Select check out" />
        </FormGroup>
        <FormGroup>
          <Label>Apartament</Label>
          <Input value={stateForm.apartament} onChange={e => setInput(e)} type="select" name="apartament">
            <option>{apartNames.apartamentOne}</option>
            <option>{apartNames.apartamentTwo}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Adults</Label>
          <Input value={stateForm.adults} onChange={e => setInput(e)} type="select" name="adults">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Children</Label>
          <Input value={stateForm.children} onChange={e => setInput(e)} type="select" name="children">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input value={stateForm.message} onChange={e => setInput(e)} placeholder="Please insert any comment to be mentioned" type="textarea" name="message" />
        </FormGroup>
        {/* <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Check me out
          </Label>
        </FormGroup> */}
        <Button onClick={sendPost}>Submit</Button>
      </Form>
    </div>
  )
}

export default RegisterForm
