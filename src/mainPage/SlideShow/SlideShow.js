import { RestaurantTwoTone } from '@material-ui/icons';
import React, { useState, useContext, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

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
                <div key={index} className="each-slide">
                    <div style={{'backgroundImage': `url(${photoUrl})`}}>
                    <span>Slide 1</span>
                    </div>
                </div>
            ))
        )
    }
      
    return (
      <div className="SlideShow">
          <div className="slide-container">
            <Slide>
            {displayImages()}
            </Slide>
        </div>
      </div>
    )
}

export default SlideShow
