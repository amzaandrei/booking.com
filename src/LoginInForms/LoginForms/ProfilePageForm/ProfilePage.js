import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../../providers/UserProvider'
import { auth } from '../../../firebase'
import { useHistory } from "react-router-dom";
import CustomerBookingCells from '../../../CustomerBookingPageCells/CustomerBookingCells'

const ProfilePage = () => {
  const history = useHistory()
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

  const logOutUser = () => {
    auth.signOut()
    history.push({
      pathname: '/',
      state: 'userLoggout'
    })
  }

  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background:
                `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{ currUsr.displayName }</h2>
        <h3 className = "italic">{ currUsr.email }</h3>
        </div>
      </div>
      {/* <CustomerBookingCells userId ={ currUsr.uid }></CustomerBookingCells> */}
      <CustomerBookingCells></CustomerBookingCells>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white"
      onClick={logOutUser}>Sign out</button>
    </div>
  ) 
};
export default ProfilePage;
