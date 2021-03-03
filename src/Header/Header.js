import React, { useContext, useEffect, useState } from "react";
import './Header.css';
import { auth } from '../firebase'
import { useHistory, useLocation } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

import { NavBarIndex, NavBarNames } from '../providers/NavBarProvider'

function Header(props) {
    const location = useLocation()
    const history = useHistory()
    const [user, setUser] = useState()
    const navbarProviderIndex = useContext(NavBarIndex)
    const navbarProviderNames = useContext(NavBarNames)
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authUser");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [])

    const LANGUAGE_NAMES = {
        ROMANA: "Romana",
        ENGLEZA: "Englisch",
        GERMANA: "Deutsch"
    }

    const [isOpen, setIsOpen] = useState(false);
    const [currLanguage, setCurrLanguage] = useState(LANGUAGE_NAMES.ROMANA)
    const [languages, setLanguages] = useState([LANGUAGE_NAMES.ENGLEZA, LANGUAGE_NAMES.GERMANA])
    const toggle = () => setIsOpen(!isOpen);

    const changeLanguageArr = (lang_index) => {
        const temp = currLanguage
        setCurrLanguage(languages[lang_index])
        let oldLanguages = [...languages]
        oldLanguages[lang_index] = temp
        setLanguages(oldLanguages)
        changeLanguageInWebsite(languages[lang_index])
    }
    
    const changeLanguageInWebsite = (language) => {
        ///chnage internally the language
    }

    const logOutUser = () => {
        auth.signOut()
        history.push({
          pathname: '/',
          state: 'userLoggout'
        })
        
      }
    
    const redirectUser = () => {
      if(user.userType === 'user'){
        history.push({
          pathname: '/profile',
          state: 'user'
        })
      }
      else{
        history.push({
          pathname: '/profile',
          state: 'admin'
        })
      }
    }

    const configureName = () => {
      if(user == null) return (<p>Profile</p>)
      else return (<p>{ user.displayName }</p>)
    }

    const configureTab = () => {
      if(user == null) return
      else if(user.userType == "admin"){
        return(
          <DropdownItem onClick={() => history.push('/updatePrices')}>
                  Calendar
          </DropdownItem>
        )
      } else {
        return
      }
    }

    return(
      <div className="Header">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{ navbarProviderNames.sitesName }</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/* {location.pathname === '/' ? (
                <NavLink onClick={() => props.scrollTo(navbarProviderIndex.apartamentOne)}>{ navbarProviderNames.apartamentOne }</NavLink>
              ) : ( */}
                <NavLink onClick={() => history.push({pathname: '/', state: 'scrollToApart1'})}>{ navbarProviderNames.apartamentOne }</NavLink>
              {/* )} */}
            </NavItem>
            <NavItem>
              {/* {location.pathname === '/' ? (
                <NavLink onClick={() => props.scrollTo(navbarProviderIndex.apartamentTwo)}>{ navbarProviderNames.apartamentTwo }</NavLink>
              ) : ( */}
                <NavLink onClick={() => history.push({pathname: '/', state: 'scrollToApart2'})}>{ navbarProviderNames.apartamentTwo }</NavLink>
              {/* )} */}
            </NavItem>
            <NavItem>
              {/* {location.pathname === '/' ? (
                <NavLink onClick={() => props.scrollTo(navbarProviderIndex.bookingRef)}>{ navbarProviderNames.bookingRef }</NavLink> 
              ): ( */}
                <NavLink onClick={() => history.push({pathname: '/', state: 'bookingRef'})}>{ navbarProviderNames.bookingRef }</NavLink> 
              {/* )} */}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {currLanguage}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem onClick={() => changeLanguageArr(0)}>
                  {languages[0]}
                </DropdownItem>
                <DropdownItem onClick={() => changeLanguageArr(1)}>
                  {languages[1]}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <UncontrolledDropdown nav inNavbar style={{"list-style-type": "none"}}>
            <DropdownToggle nav caret>
              {configureName()}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem onClick={() => redirectUser()}>
                    Profile
                </DropdownItem>
                {configureTab()}
                <DropdownItem onClick={() => logOutUser()}>
                    Sign out
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </div>
  );

}

export default Header

