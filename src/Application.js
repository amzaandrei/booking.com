import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from './providers/UserProvider'

import {
  Switch,
  Route,
  useLocation
} from "react-router-dom"

import Bookings from './Bookings/Bookings'
import { store } from "react-notifications-component"
import ReactNotification from "react-notifications-component"
import SignIn from './LoginInForms/LoginForms/SignInForm/SignIn'
import SignUp from './LoginInForms/LoginForms/SignUpForm/SignUp'
import ProfilPage from './LoginInForms/LoginForms/ProfilePageForm/ProfilePage'
import PasswordReset from './LoginInForms/LoginForms/ResetPasswordPageForm/PasswordReset'
import MainPage from './mainPage/MainPage';
import Header from './Header/Header';

function Application() {

  const location = useLocation()

  const currUserType = useRef()
  const user = useContext(UserContext)

  useEffect(() => {
    const res = location.state
    if(res === "userLoggout"){
      popUpNotification("Logged out!","You are succesfully log out!","success")
    }else if(res === "userSignedIn"){
      popUpNotification("Woohoo","You are ready to role!","success")
    }else if(res === "userSignedUp"){
      popUpNotification("Woohoo","You are signed up!","success")
    }
    // window.location.reload();
    return res
  },[])

  useEffect(() => {
    if(user != null){
      console.log("now fetched")
      currUserType.current = user.userType
      console.log(currUserType.current)
    }
  })

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authUser");
  //   const foundUser = JSON.parse(loggedInUser);
  //   user.current = foundUser
  //   console.log("aici", user.current)
  //   console.log("aici2", foundUser)
  // }, [user])


  const popUpNotification = (title, message, type) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1400,
        onScreen: true
      }
    })
  }

  return (
    <div className="App">
      <ReactNotification />
        <Switch>
            <Route path="/mamaProject">
              <Header />
              <Bookings></Bookings>
            </Route>
            <Route path="/profile">
              <Header />
              <ProfilPage></ProfilPage>
              {/* <Bookings></Bookings> */}
              {/* <GrantComponent component={currUserType} /> */}
            </Route>
            <Route path="/signin">
              <Header />
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <Header />
              <SignUp></SignUp>
            </Route>
            <PasswordReset path = "/passwordReset" />
            <Route path="/">
              <MainPage></MainPage>
            </Route>
        </Switch>
    </div>
  );
}

export default Application;
