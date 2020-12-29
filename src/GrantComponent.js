import React  from "react"
import ProfilPage from './LoginInForms/LoginForms/ProfilePageForm/ProfilePage'
import Bookings from './Bookings/Bookings'

function GrantComponent(props) {

    const func = () => {
        console.log("asdasdas", props.component.current)
        if (props.component.current === "user"){
            return <ProfilPage></ProfilPage>
        }
        else
            return <Bookings></Bookings>
    }

    return (
        <div>
            {func()}
        </div>
    )

}

export default GrantComponent