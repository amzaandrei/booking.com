import React, { useContext, useEffect, useState } from "react";
import './Header.css';
import { auth } from '../firebase'
import { useHistory } from "react-router-dom";
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
    NavbarText
  } from 'reactstrap';

import { NavBarIndex, NavBarNames } from '../providers/NavBarProvider'

function Header(props) {
    const history = useHistory()
    const [user, setUser] = useState()
    const navbarProviderIndex = useContext(NavBarIndex)
    const navbarProviderNames = useContext(NavBarNames)
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authUser");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            console.log("here", user)
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

    return(
        <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Butterflies</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={() => props.scrollTo(navbarProviderIndex.apartamentOne)}>{ navbarProviderNames.apartamentOne }</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => props.scrollTo(navbarProviderIndex.apartamentTwo)}>{ navbarProviderNames.apartamentTwo }</NavLink>
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
          { user ? (
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                { user.displayName }
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem onClick={() => logOutUser()}>
                    Sign out
                </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            ) : (
                <NavLink href="/signup">Sign up</NavLink>
            )}
        </Collapse>
      </Navbar>
    </div>
  );

}

export default Header

