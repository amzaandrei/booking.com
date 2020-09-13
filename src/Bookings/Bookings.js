import React, { useState, useEffect } from "react"

import db from "../firebase"
import BookCell from "./BookCell/BookCell"

function Bookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const bookingsRetrieve = db.collection("bookings").onSnapshot(snap =>
      setBookings(
        snap.docs.map(doc => {
          return { id: doc.id, data: doc.data() }
        })
      )
    )
    return () => {
      bookingsRetrieve()
    }
  }, [])

  return (
    <div className="Bookings">
      {bookings.map(booking => (
        <BookCell key={booking.id} docsId={booking.id} booking={booking.data} />
      ))}
    </div>
  )
}

export default Bookings
