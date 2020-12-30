import React, { useContext } from "react"

import { apartamentImgs } from '../../providers/NavBarProvider'
import { NavBarNames} from '../../providers/NavBarProvider'

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';


function BookCell(props) {
  
  const apartImg = useContext(apartamentImgs)
  const apartNames = useContext(NavBarNames)
  return (
      <div>
        <Card>
          {props.booking.apartament === apartNames.apartamentOne ? (
            <CardImg top width="100%" height="300px" src={apartImg.apartamentOne} alt="Card image cap" />
          ) : (
            <CardImg top width="100%" height="300px" src={apartImg.apartamentTwo} alt="Card image cap" />
          )}
        <CardBody>
          <CardTitle tag="h5">{props.booking.firstName} {props.booking.lastName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">From: {props.booking.checkIn} <br />Till: {props.booking.checkOut}</CardSubtitle>
          <CardText>Customer message: { props.booking.message }</CardText>
          <Button color="success" onClick={() => props.callConfirmNotif(props)}>success</Button>{' '}
          <Button color="danger" onClick={() => props.callDeclineNotif(props)}>danger</Button>{' '}
        </CardBody>
      </Card>
     </div>
  )
}

export default BookCell
