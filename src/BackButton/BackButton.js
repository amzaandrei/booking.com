import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import './BackButton.css'
import { makeStyles } from '@material-ui/core/styles';

///not actually doing the job i want 
const styles = makeStyles({
    centerButton: {
        margin: "0 auto"
    },
    shown: {
        opacity: "1"
    },
    hidden: {
        opacity: "0"
    }
})

function BackButton() {
    const classes = styles()

    const [hiddenState, setHiddenState] = useState(true)

    useEffect(() => {
        window.onscroll = function() {
          if(window.pageYOffset < 500) {
            setHiddenState(true)
          }else{
            setHiddenState(false)
          }
        };
      }, [window.onscroll])

    const scrollUp = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div className={`backButtonComp ${hiddenState != true ? classes.shown : classes.hidden}`}>
            {/* <ArrowUpwardIcon className={classes.centerButton}/> */}
            <ArrowUpwardIcon 
            className={hiddenState != true ? classes.shown : classes.hidden}
            onClick={() => scrollUp()}/>
        </div>
    )
}

export default BackButton
