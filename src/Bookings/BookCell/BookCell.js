import React from "react"
import CheckBoxSharpIcon from "@material-ui/icons/CheckBoxSharp"
import ClearIcon from "@material-ui/icons/Clear"
import IconButton from "@material-ui/core/IconButton"




// function BookCell({ docsId, booking }) {
function BookCell(props) {
  
  return (
    <div className="BookCell">
      <h1>
        {props.booking.firstName} {props.booking.lastName}
      </h1>
      <p>
        CheckIn: {props.booking.checkIn} CheckOut: {props.booking.checkOut}
      </p>
      <IconButton onClick={() => props.callConfirmNotif(props)}>
        <CheckBoxSharpIcon></CheckBoxSharpIcon>
      </IconButton>
      <IconButton onClick={() => props.callDeclineNotif(props)}>
        <ClearIcon></ClearIcon>
      </IconButton>
    </div>
  )
}

export default BookCell
