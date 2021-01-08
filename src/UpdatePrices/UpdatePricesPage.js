import React, { useState } from 'react'
import CalendarComp from '../Calendar/CalendarComp'
import { db } from '../firebase'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { store } from "react-notifications-component"

function UpdatePricesPage() {

    const monthNames = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
    ];

    const [dayTapped, setdayTapped] = useState(false)
    const [refToChange, setRefToChange] = useState(-1)
    const [stateForm, setStateForm] = useState({
        price: 0
      })

    const onChangeDate = (value) => {
        setdayTapped(true)
        setRefToChange(value)
      }
    
    const onSubmit = () => {
        db.collection("book-prices").doc(monthNames[refToChange.getMonth()]).onSnapshot(snap => {
            var prices = snap.data().values
            prices.forEach((_,index) => {
                if(index == refToChange.getDate())
                    prices[index] = parseInt(stateForm.price)
            });
            db.collection("book-prices").doc(monthNames[refToChange.getMonth()]).update({
                values: prices
            })
        })
        popUpNotification("Succes!","Your day price was changed. Refresh the page to see the changes!","success")
    }

    const popUpNotification = (title, message, type) => {
        store.addNotification({
          title: title,
          message: message,
          type: type,
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1400,
            onScreen: true
          }
        })
      }
    
    const setInput = e => {
    const value = e.target.value
        setStateForm({
            ...stateForm,
            [e.target.name]: value,
        })
    }


    return (
        <div className="updatePricesPage">
            <CalendarComp 
            value={new Date()}
            selectRange={false}
            onClickDay={onChangeDate}
            />
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Price</Label>
                    {!dayTapped ? (
                        <Input type="price" name="price" id="price" placeholder="Select your day to change the price" />
                    ) : (
                        <Input type="price" name="price" id="price" placeholder="Select your price for that day" onChange={e => setInput(e)} />
                    )}
                </FormGroup>
                <Button onClick={() => onSubmit()}>Submit</Button>
            </Form>
        </div>
    )
}

export default UpdatePricesPage
