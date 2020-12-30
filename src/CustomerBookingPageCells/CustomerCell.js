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
                <p>
                    CheckIn: {props.booking.checkIn} CheckOut: {props.booking.checkOut}
                </p>
          </div>
      ) : (
        <div className="cell" style={acceptedBooking}>
                <p>
                    CheckIn: {props.booking.checkIn} CheckOut: {props.booking.checkOut}
                </p>
        </div>
      )}
    </div>
  )
}

export default BookCell