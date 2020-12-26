import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import back1 from './slider_images/slide_1.jpg';
import back2 from './slider_images/slide_2.jpg';
import back3 from './slider_images/slide_3.jpg';


import './SlideShow.css'

// const slideImages = [
//         'images/slide_1.jpg',
//         'images/slide_2.jpg',
//         'images/slide_3.jpg'
//       ];

const SlideShow = () => {
    
      
    return (
      <div className="SlideShow">
          <div className="slide-container">
            <Slide>
            <div className="each-slide">
                {/* <div style={{'backgroundImage': `url(${slideImages[0]})`}}> */}
                <div style={{'backgroundImage': `url(${back1})`}}>
                <span>Slide 1</span>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${back2})`}}>
                <span>Slide 2</span>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${back3})`}}>
                <span>Slide 3</span>
                </div>
            </div>
            </Slide>
        </div>
      </div>
    )
}

export default SlideShow
