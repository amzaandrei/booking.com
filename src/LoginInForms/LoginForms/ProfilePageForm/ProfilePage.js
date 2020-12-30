import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../../providers/UserProvider'

import CustomerBookingCells from '../../../CustomerBookingPageCells/CustomerBookingCells'

// import './ProfilePage.css'

const ProfilePage = () => {
  
  const user = useContext(UserContext)
  
  const [currUsr, setCurrUser] = useState({
    uid: '',
    email: '',
    displayName: ''
  })

  useEffect(() => {
    if(user != null){
      // console.log("now fetched", user)
      const { uid, email, displayName } = user
      setCurrUser({uid: uid, email: email, displayName: displayName})
    }
  }, user)


  return (
    <div className="profilePage">
      <div className="container">
        <div className="userContent">
          <div
            style={{
              background:
                  `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
              backgroundSize: "cover",
              height: "400px",
              width: "400px"
            }}
            className="profilePicture"
          ></div>
          <div className="userLabels">
            <h2 className="displayName">{ currUsr.displayName }</h2>
            <h3 className="email">{ currUsr.email }</h3>
          </div>
          {/* <CustomerBookingCells userId ={ currUsr.uid }></CustomerBookingCells> */}
        </div>
      </div>
      <CustomerBookingCells></CustomerBookingCells>
    </div>
  ) 
};
export default ProfilePage;
