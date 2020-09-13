import React from "react"
import CheckBoxSharpIcon from "@material-ui/icons/CheckBoxSharp"
import ClearIcon from "@material-ui/icons/Clear"
import IconButton from "@material-ui/core/IconButton"
import db from "../../firebase"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { store } from "react-notifications-component"

function BookCell({ docsId, booking }) {
  function confirmBooking() {
    console.log("booked")

    db.collection("bookings").doc(docsId).update({
      pending: false,
      booked: true,
    })

    store.addNotification({
      title: "Wonderful",
      message: `${booking.lastName} booking succeded`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: true,
      },
    })
  }

  function declineBooking() {
    console.log("declined booking")
    //maybe she wants to delete it later
    //ask her later
    db.collection("bookings").doc(docsId).update({
      pending: false,
      booked: false,
    })

    store.addNotification({
      title: "OK!",
      message: `${booking.lastName} declined`,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: true,
      },
    })
  }

  return (
    <div className="BookCell">
      <ReactNotification />
      <h1>
        {booking.firstName} {booking.lastName}
      </h1>
      <p>
        CheckIn: {booking.checkIn} CheckOut: {booking.checkOut}
      </p>
      <IconButton onClick={confirmBooking}>
        <CheckBoxSharpIcon></CheckBoxSharpIcon>
      </IconButton>
      <IconButton onClick={declineBooking}>
        <ClearIcon></ClearIcon>
      </IconButton>
    </div>
  )
}

export default BookCell
