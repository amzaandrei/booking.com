import React, { useContext, useRef } from 'react'

import SlideShow from './SlideShow/SlideShow'
import RegisterForm from './RegisterForm/RegisterForm'

import { store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import Header from '../Header/Header'

import { NavBarIndex, NavBarNames } from '../providers/NavBarProvider'
import BackButton from '../BackButton/BackButton'

function MainPage() {

    let myApart1 = useRef()
    let myApart2 = useRef()
    let bookingRef = useRef()
    const navbarProviderIndex = useContext(NavBarIndex)
    const navBarProviderNames = useContext(NavBarNames)

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

    const scrollTo = (index) => {
        if(index === navbarProviderIndex.apartamentOne){
            window.scrollTo({ behavior: 'smooth', top: myApart1.current.offsetTop })
        }else if(index === navbarProviderIndex.apartamentTwo){
            window.scrollTo({ behavior: 'smooth', top: myApart2.current.offsetTop })
        }else if(index === navbarProviderIndex.bookingRef){
             window.scrollTo({ behavior: 'smooth', top: bookingRef.current.offsetTop })
        }
    }

    return (
        <div className="mainPage">
            <Header scrollTo={scrollTo}></Header>
            {/* <SlideShow apartament={navBarProviderNames}></SlideShow> */}
            <div ref={bookingRef}>
                <RegisterForm notifCall={confirmPostBooking}></RegisterForm>
            </div>
            <div ref={myApart1} style={{ backgroundColor: "red", width: "100%", height: "5000px"}}>
                asdasdasd
            </div>
            <div ref={myApart2} style={{ backgroundColor: "blue", width: "100%", height: "5000px"}}>
                asdasdasd
            </div>
            <BackButton />
        </div>
    )
}

export default MainPage