import React, { useState, useEffect } from "react"
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'

function BookCell(props) {

  const [userBookings, setUserBookings] = useState([])

  const notacceptedBooking = {
    backgroundColor: "red",
    width: "100%",
    margin: "20px"
  } 

  useEffect(() => {
    setUserBookings([...userBookings, props.booking])
  }, [props])
  
  const acceptedBooking = {
    backgroundColor: "green",
    width: "100%",
    margin: "20px"
  }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const stripeKey = process.env.REACT_APP_STRIPE_KEY
  const handlePurchase = async (token,book) => {
    console.log(book)
    const order = await axios.post('http://localhost:3010/api/stripe/charge', {
        amount: book.amount.toString().split('.').join(''),
        source: token.id,
        receipt_email: book.emailAdress
    })
    console.log("Response:", order.data);
  }

  const renderUserCells = () => {
    return(
      userBookings.map((book, index) => {
      if(book.booked === false){
        return (
          <Card key={index} body style={notacceptedBooking}>
            <CardTitle>CheckIn: {book.checkIn}<br/> CheckOut: {book.checkOut}</CardTitle>
            <CardText>Your booking isn't approved by our administrator yet!</CardText>
            <Button onClick={toggle} style={{width: "200px"}}>Get more info!</Button>
          </Card>
        )
      }else{
        return(
          <Card key={index} body style={acceptedBooking}>
            <CardTitle>CheckIn: {book.checkIn}<br/> CheckOut: {book.checkOut}</CardTitle>
            <CardText>You are ready to pay!</CardText>
              <StripeCheckout
              image="https://cdn.auth0.com/blog/react-js/react.png"
              token={(token) => {
                handlePurchase(token, book)
              }}
              stripeKey={stripeKey}
              />
          </Card>
        )
      }
     })
    )
  }

  return (
    <div className="BookCell">
      {renderUserCells()}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reminder!</ModalHeader>
        <ModalBody>
          You still need to wait for the owner of the apartment to get your booking accepted!
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default BookCell