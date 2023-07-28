//This is parent component
import React, { useRef, useState } from 'react'
import Comp1 from './Comp1'

function Comp2() {
    const childRef = useRef(null);
    const [isRunning, setIsRunning] = useState(true);
    const handleClick = ()=>{
        setIsRunning(!isRunning);
        console.log(`Child count: ${childRef.current.getCount()}`)
        childRef.current.stopCount();
    };
  return (
    <div style={{
        width: '100vw',
        height:'100vh',
        display: 'flex', 
        alignItems: 'center',
        gap:'10px',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>
        <Comp1 ref={childRef} message = {'New message received'}/>
        <button className='btn waves-effect' onClick={()=>childRef.current.incrementCount()}>Get Count</button>
        <button className="btn waves-effect" onClick={()=>childRef.current.printSet()}>Create New Message</button>
        <button className='btn waves-effect' onClick={handleClick}>
            {isRunning ? 'Stop Counter' : 'Start Counter'}
        </button>
        <button className={`btn waves-effect $`}>Start</button>
    </div>
  )
}

export default Comp2