import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import './SlideShow.css'

const SlideShow = () => {
    const slideImages = [
        'images/slide_1.jpg',
        'images/slide_2.jpg',
        'images/slide_3.jpg'
      ];
      
    return (
      <div className="SlideShow">
          <div className="slide-container">
            <Slide>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                <span>Slide 1</span>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                <span>Slide 2</span>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                <span>Slide 3</span>
                </div>
            </div>
            </Slide>
        </div>
      </div>
    )
}

export default SlideShow
