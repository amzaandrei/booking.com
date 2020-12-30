import React, { createContext} from 'react'

import apart1 from '../slider_images/slide_1.jpg'
import apart2 from '../slider_images/slide_2.jpg'

export const apartamentImgs = createContext({
    apartamentOne: apart1,
    apartamentTwo: apart2
})

export const NavBarIndex = createContext({
    sitesName: "1",
    apartamentOne: "2",
    apartamentTwo: "3",
    bookingRef: "4"
})

export const NavBarNames = createContext({
    sitesName: "Butterflies",
    apartamentOne: "Apartament1",
    apartamentTwo: "Apartament2",
    bookingRef: "Book"
})