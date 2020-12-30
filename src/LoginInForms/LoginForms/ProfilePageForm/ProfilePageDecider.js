import React  from "react"
import ProfilPage from './ProfilePage'
import Bookings from '../../../Bookings/Bookings'

import { useLocation } from "react-router-dom"

function ProfilePageDecider() {

    const location = useLocation()

    const decideWhichPageToBeDisplayed = () => {
        let res = location.state
        if (res === "user"){
            return <ProfilPage></ProfilPage>
        }
        else
            return <Bookings></Bookings>
    }

    return (
        <div>
            {decideWhichPageToBeDisplayed()}
        </div>
    )

}

export default ProfilePageDecider