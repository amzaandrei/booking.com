import React from "react"

function BookCell(props) {
  
  const notacceptedBooking = {
    backgroundColor: "red"
  }  
  
  const acceptedBooking = {
    backgroundColor: "green"
  }

  return (
    <div className="BookCell">
      {props.booking.booked === false ? (
          <div className="cell" style={notacceptedBooking}>
                <h1>
                    {props.booking.firstName} {props.booking.lastName}
                </h1>
                <p>
                    CheckIn: {props.booking.checkIn} CheckOut: {props.booking.checkOut}
                </p>
          </div>
      ) : (
        <div className="cell" style={acceptedBooking}>
                <h1>
                    {props.booking.firstName} {props.booking.lastName}
                </h1>
                <p>
                    CheckIn: {props.booking.checkIn} CheckOut: {props.booking.checkOut}
                </p>
        </div>
      )}
    </div>
  )
}

export default BookCell