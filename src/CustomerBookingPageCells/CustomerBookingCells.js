import React, { useContext, useState, useEffect} from 'react'
import { db } from '../firebase'
import CustomerCell from './CustomerCell'
import { UserContext } from '../providers/UserProvider'

function CustomerBookingCells() {

    const [bookings, setBookings] = useState([])
    ////you could take the props from your parent Profilepage pt it doens't work
    const user = useContext(UserContext)
    
    useEffect(() => {
        if(user != null){
            console.log("now fetchedggg", user)
            db.collection("bookings")
            .where("uid","==",user.uid)
            .where("userType","==","user").onSnapshot(snap => {
                setBookings(
                  snap.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                  })
                )
              }
            )
          }
      }, user)

    const bookList = bookings.map(booking => (
        <CustomerCell
        key={booking.id}
        docsId={booking.id}
        booking={booking.data}
        />
    ))

    return (
        <div>
           {bookList} 
        </div>
    )
}

export default CustomerBookingCells
