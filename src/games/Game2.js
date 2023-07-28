import React, { useRef, useState } from 'react'
import '../style/Game2.css'
import Snackbar from '../components/Snackbar'

function Game2() {
  const snackContent = useState({message: 'Action Attefdsfdsmpt was completed', type: 'success'})
  console.log(snackContent)
  const snackbarRef = useRef(null)
  return (
    <div className='nvG2a'>
      <Snackbar ref={snackbarRef} message={snackContent.message} type= {snackContent.type}/>
      <div className="btn waves-effect waves-lighten-3" onClick={()=>{snackbarRef.current.show()}}>show snackBar</div>
    </div>
  )
}

export default Game2