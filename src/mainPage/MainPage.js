import React, { useContext, useRef, useEffect } from 'react'

import SlideShow from './SlideShow/SlideShow'
import createHistory from 'history/createBrowserHistory'
import RegisterForm from './RegisterForm/RegisterForm'

import { store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import Header from '../Header/Header'
import { useLocation } from "react-router-dom";

import { NavBarIndex, NavBarNames } from '../providers/NavBarProvider'
import BackButton from '../BackButton/BackButton'
import { Parallax } from 'react-parallax'
import './MainPage.css'


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

    const location = useLocation()
      useEffect(() => {
        const res = location.state
        if(res === "scrollToApart1"){
            scrollTo(navbarProviderIndex.apartamentOne)
        }else if(res === "scrollToApart2"){
            scrollTo(navbarProviderIndex.apartamentTwo)
        }else if(res === "bookingRef"){
            scrollTo(navbarProviderIndex.bookingRef)
        }
        const history = createHistory();
        if (history.location.state && history.location.state.transaction) {
            let state = { ...history.location.state };
            delete state.transaction;
            history.replace({ ...history.location, state });
        }
        return res
      },[])

    const scrollTo = (index) => {
        if(index === navbarProviderIndex.apartamentOne){
            window.scrollTo({ behavior: 'smooth', top: myApart1.current.offsetTop })
        }else if(index === navbarProviderIndex.apartamentTwo){
            window.scrollTo({ behavior: 'smooth', top: myApart2.current.offsetTop })
        }else if(index === navbarProviderIndex.bookingRef){
             window.scrollTo({ behavior: 'smooth', top: bookingRef.current.offsetTop })
        }
    }


    const image1 = require('../slider_images.nosync/slide_1.jpg')
    const image2 = require('../slider_images.nosync/slide_3.jpg')
    const image3 = require('../slider_images.nosync/slide_1.jpg')

    const inlineStyle = {
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(-50%,-50%)'
    }

    return (
        <div className="mainPage">
            <Header scrollTo={scrollTo}></Header>
            <div className="slideShow">
                {/* <SlideShow apartament={navBarProviderNames}></SlideShow> */}
            </div>
            <div ref={bookingRef} className="registerForm">
                <RegisterForm notifCall={confirmPostBooking}></RegisterForm>
            </div>
            <Parallax bgImage={image1} strength={150}>
                <div style={{height:500}} />
            </Parallax>
            <div ref={myApart1} style={{ backgroundColor: "red", width: "100%", height: "500px"}}>
                asdasdasd
            </div>
            <Parallax bgImage={image2}>
                <div style={{height:500}} />
            </Parallax>
            <div ref={myApart2} style={{ backgroundColor: "blue", width: "100%", height: "500px"}}>
                asdasdasd
            </div>
            <Parallax bgImage={image3} strength={250}
                renderLayer={percetange => (
                    <div style={{
                        position: 'absolute',
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: `rgb(255,123,23, ${percetange})`,
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%,-50%) scale(${percetange * 5})`
                    }}
                    ></div>
                )}>
                <div style={{height:500}}>
                    <div style={inlineStyle}>Come and visit us!</div>
                </div>
            </Parallax>
            <BackButton />
        </div>
    )
}

export default MainPage