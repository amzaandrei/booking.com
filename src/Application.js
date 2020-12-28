import React, { useEffect } from 'react';

import {
  Switch,
  Route,
  useLocation
} from "react-router-dom"

import Header from './Header/Header'
import SlideShow from './SlideShow/SlideShow'
import RegisterForm from './RegisterForm/RegisterForm'
import Bookings from './Bookings/Bookings'
import { store } from "react-notifications-component"
import ReactNotification from "react-notifications-component"
import SignIn from './LoginInForms/LoginForms/SignInForm/SignIn'
import SignUp from './LoginInForms/LoginForms/SignUpForm/SignUp'
import ProfilPage from './LoginInForms/LoginForms/ProfilePageForm/ProfilePage'
import PasswordReset from './LoginInForms/LoginForms/ResetPasswordPageForm/PasswordReset'

import "react-notifications-component/dist/theme.css"
import ProfilePage from './LoginInForms/LoginForms/ProfilePageForm/ProfilePage';

function Application() {

  const location = useLocation()

  useEffect(() => {
    console.log(location.state)
    const res = location.state
    if(res === "userLoggout"){
      popUpNotification("Logged out!","You are succesfully log out!","success")
    }else if(res === "userSignedIn"){
      popUpNotification("Woohoo","You are ready to role!","success")
    }else if(res === "userSignedUp"){
      popUpNotification("Woohoo","You are signed up!","success")
    }
  },[location])

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

  const confirmPostBooking = () => {
    store.addNotification({
      title: "Wonderful!",
      message: "Your booking was succesfully submitted!",
      type: "success",
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
              <Header></Header>
              <Bookings></Bookings>
            </Route>
            <ProfilePage path="/profile"></ProfilePage>
            <Route path="/signin">
              <Header></Header>
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <Header></Header>
              <SignUp></SignUp>
            </Route>
            <PasswordReset path = "/passwordReset" />
            <Route path="/">
              <Header></Header>
              <SlideShow></SlideShow>
              <RegisterForm notifCall={confirmPostBooking}></RegisterForm>
            </Route>
        </Switch>
    </div>
  );
}

export default Application;
