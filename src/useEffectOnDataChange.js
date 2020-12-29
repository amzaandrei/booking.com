import React, { useState, useEffect, useRef } from "react"

const useEffectOnDataChange = (callback, dataArr) => {

    const someIsNull = dataArr.some(data => data == null);

    useEffect(() => {
        if (someIsNull) return;
        return callback();
    }, dataArr);

    // const [data, setData] = useState(null);
    // const isInitialRender = useRef(true);// in react, when refs are changed component dont re-render 

    // useEffect(() => {
    //     if(isInitialRender.current){// skip initial execution of useEffect
    //         isInitialRender.current = false;// set it to false so subsequent changes of dependency arr will make useEffect to execute
    //         return;
    //     }
    //     return callback();
    // }, dataArr);

}

export default useEffectOnDataChange