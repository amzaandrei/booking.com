import { RestaurantTwoTone } from '@material-ui/icons';
import React, { useState, useContext, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Carousel from 'react-bootstrap/Carousel'

import { apart1Ref, apart2Ref } from '../../firebase'
import { NavBarNames } from '../../providers/NavBarProvider'


import './SlideShow.css'

const SlideShow = (props) => {
    
    const [photosUrl, setPhotosUrl] = useState([])
    const navBarProviderNames = useContext(NavBarNames)

    useEffect(() => {
        const urlResults = async () => {
            const fetchData = await retrievePhotos(props.apartament)
            setPhotosUrl(fetchData)
        }        
        urlResults()
    }, [])

    const retrievePhotos = async (apartament) => {
        let apartRef = null
        if(apartament == navBarProviderNames.apartamentOne)
            apartRef = apart1Ref
        else
            apartRef = apart2Ref
        let result = await apartRef.listAll()
        let urlPromises = result.items.map(imageref => imageref.getDownloadURL())
        return Promise.all(urlPromises)
    }

    const displayImages = () => {
        return (
            photosUrl.map((photoUrl, index) => (
                // <div key={index} className="each-slide">
                //     <div style={{'backgroundImage': `url(${photoUrl})`}}>
                //     <span>Slide 1</span>
                //     </div>
                // </div>
                <Carousel.Item key={index} interval={1000}>
                    <img
                    className="d-block w-100"
                    src={photoUrl}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        )
    }
      
    return (
      <div className="SlideShow">
          {/* <div className="slide-container">
            <Slide>
                {displayImages()}
            </Slide>
        </div> */}
        <Carousel>
            {displayImages()}
        </Carousel>
      </div>
    )
}

export default SlideShow
