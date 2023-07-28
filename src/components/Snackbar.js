import React, { useState,forwardRef ,useImperativeHandle } from 'react'
import '../style/snackbar.css'

const Snackbar= forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref,()=>({
    show(){
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000);
    }
  }))
  return (
    <div className='snackBar' id={showSnackbar?'show':'hide'} style={{
      background: props.type ==='success' ? '#00F593':'#FF0033',
      color:props.type==='success' ?'black':'white'
    }}>
        <div className='symbol'>
          {
            props.type==='success'?<p>&#10004;</p>:<p>&#x2613;</p>
          }
        </div>
        <div className="message">{props.message}</div>
    </div>
  )
});

export default Snackbar