import React, { useState, useEffect } from "react"

import { db, onMessageListener } from "../firebase"
import BookCell from "./BookCell/BookCell"
import FilterButton from "./FilterButton/FilterButton"
import { store } from "react-notifications-component"
import ReactNotification from "react-notifications-component"
import { Nav } from 'reactstrap'
import axios from 'axios'

import "react-notifications-component/dist/theme.css"

axios.defaults.baseURL = 'http://localhost:3010/v1'

const ButtonsDATA = [
  { id: "btt-1", name: "All", completed: true },
  { id: "btt-2", name: "Booked", completed: false },
  { id: "btt-3", name: "Pending", completed: false },
]

const FILTER_MAP = {
  All: () => true,
  Booked: booking => booking.data.booked,
  Pending: booking => !booking.data.booked,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState("All")
  const [messages, setMessages] = useState([]);

  const bookingsStrLength = bookings.length !== 1 ? 'bookings' : 'booking'
  const bookingsLeft = `${bookings.length} ${bookingsStrLength} remaining`

  useEffect(() => {
    axios.get("/messages").then((resp) => {
      setMessages(resp.data.messages);
    });
  }, []);

  onMessageListener().then((payload) => {
    console.log("herererere")
    const { title, body } = payload.data;
    console.log("hereeee",`${title}; ${body}`)
  })
  .catch((err) => {
    console.log(err)
  })

  useEffect(() => {
    console.log(FILTER_MAP)
    console.log(FILTER_NAMES)

    const bookingsRetrieve = db.collection("bookings").onSnapshot(snap => {
        setBookings(
          snap.docs.map(doc => {
            return { id: doc.id, data: doc.data() }
          })
        )
      }
    )

    return () => {
      bookingsRetrieve()
    }
  }, [])

  const filterListBtts = FILTER_NAMES.map(bk => (
    <FilterButton
      key={bk}
      name={bk}
      isPressed={bk === filter}
      setFilter={setFilter}
    />
  ))

  
  const confirmBooking = (bookCellProps) =>{

    db.collection("bookings").doc(bookCellProps.docsId).update({
      booked: true,
    })

    db.collection("users").onSnapshot(snap => {
      snap.forEach(doc => {
        if(bookCellProps.booking.uid === doc.data().uid){
          axios.post('/messages', {name: doc.data().token, message: "Your booking was succesfully confirmed"})
          .then(res => {
            setMessages(res.data.messages.concat(messages))
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
    })

    store.addNotification({
      title: "Wonderful",
      message: `${bookCellProps.booking.lastName} booking succeded`,
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

    toggleBooking(bookCellProps.docsId)

  }


  const declineBooking = (bookCellProps) => {
    
    // maybe she wants to delete it later
    // ask her later
    db.collection("bookings").doc(bookCellProps.docsId).update({
      rejected: true,
    })

    store.addNotification({
      title: "OK!",
      message: `${bookCellProps.booking.lastName} declined`,
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

  const toggleBooking = (bookingId) => {
    const updateBookingsData = bookings.map(booking => {
      if(bookingId === booking.id){
        return {...booking, completed: booking.data.booked}
      }
      return booking
    })
    setBookings(updateBookingsData)
  }

  const booksList = bookings.filter(booking => FILTER_MAP[filter](booking)).map(booking => (
    <BookCell
      key={booking.id}
      docsId={booking.id}
      booking={booking.data}
      callConfirmNotif={confirmBooking}
      callDeclineNotif={declineBooking}
    />
  ))

  return (
    <div className="Bookings">
      <ReactNotification />
      <Nav tabs>
        {filterListBtts}
      </Nav>
        {booksList}
      <div className="message-list">
      <h3>Messages</h3>
        <>
          {messages.map((m, index) => {
            const { name, message } = m;
            return (
              <div key={index}>
                {name}: {message}
              </div>
            );
          })}
        </>
    </div>
    </div>
  )
}

export default Bookings
