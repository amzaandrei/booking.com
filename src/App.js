import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import Header from './Header/Header'
import SlideShow from './SlideShow/SlideShow'
import RegisterForm from './RegisterForm/RegisterForm'
import Bookings from './Bookings/Bookings'
import { store } from "react-notifications-component"
import ReactNotification from "react-notifications-component"

import "react-notifications-component/dist/theme.css"

function App() {

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
    });
  }  

  return (
    <div className="App">
      <ReactNotification />
      <Router>
        <Switch>
          <Route path="/mamaProject">
            <Header></Header>
            <Bookings></Bookings>
          </Route>
          <Route path="/">
            <Header></Header>
            <SlideShow></SlideShow>
            <RegisterForm notifCall={confirmPostBooking}></RegisterForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
