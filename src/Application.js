import React, { useContext, useState, useEffect, useRef } from 'react';
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
import ProfilePageDecider from './LoginInForms/LoginForms/ProfilePageForm/ProfilePageDecider';

import { db } from './firebase'

import { requestFirebaseNotificationPermission } from './firebase'

function Application() {

  const location = useLocation()
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

  const user = useContext(UserContext)
  const [firebaseToken, setFirebaseTokens] = useState()

  useEffect(() => {
    if (user === null) return
    console.log("meee",user)
    console.log("tokkkkkeeennnnss", firebaseToken);
    addBrowserTokenToFirebase(firebaseToken)
  }, [user])

  requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        setFirebaseTokens(firebaseToken)
      })
      .catch((err) => {
        return err;
      });

  ///da crash the fiecare data cand dau sign out pt ca nu mai gaseste user
  const addBrowserTokenToFirebase = (browser_token) => {

      db.collection("users").doc(user.uid).update({
        token: browser_token
      })
      let token_exists = false
      const ref = db.collection("browser-tokens")
      ref.onSnapshot(snap => {
        snap.forEach(doc => {
          if(doc.data().token === browser_token){
            token_exists = true
          }
        })
        if(!token_exists)
        ref.add({
          token: browser_token
        })
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
              <ProfilePageDecider />
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
