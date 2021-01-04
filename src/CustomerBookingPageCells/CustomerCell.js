import React, { useState } from "react"
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function BookCell(props) {

  const notacceptedBooking = {
    backgroundColor: "red",
    width: "100%",
    margin: "20px"
  }  
  
  const acceptedBooking = {
    backgroundColor: "green",
    width: "100%",
    margin: "20px"
  }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const startPaying = () => {

  }
  
  return (
    <div className="BookCell">
      {props.booking.booked === false ? (
        <Card body style={notacceptedBooking}>
          <CardTitle>CheckIn: {props.booking.checkIn}<br/> CheckOut: {props.booking.checkOut}</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button onClick={toggle} style={{width: "200px"}}>Pay now</Button>
        </Card>
      ) : (
        <Card body style={acceptedBooking}>
          <CardTitle>CheckIn: {props.booking.checkIn}<br/> CheckOut: {props.booking.checkOut}</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button onClick={() => startPaying()} style={{width: "200px"}}>Pay now</Button>
        </Card>
      )}
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