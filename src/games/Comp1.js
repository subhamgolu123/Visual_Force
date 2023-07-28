//This is child component
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const Comp1= forwardRef((props, ref) => {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(true);
    useImperativeHandle(ref, ()=>({
        getCount:() =>{
            return count;
        },
        incrementCount: ()=>{
            setCount(count+1);
        },
        printSet: ()=>{
            console.log(props.message)
        },
        stopCount: ()=>{
            setCount(0);
            setStart(!start);
            // alert('Alarm stopped')
        }
    }));
    useEffect(() => {
        let intervalId = null;
        if (start) {
          intervalId = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
          }, 1000);
        }
        return () => clearInterval(intervalId); // clear interval on component unmount
      }, [start]); // add start as a dependency
      
    return (
        <div>
            <p style={{
                color: '#00F593',
                fontSize: '25px', 
                fontWeight:'bold'
            }}>Count : {count}</p>
        </div>
    )
})

export default Comp1