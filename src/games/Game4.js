import React from 'react'
import Sketch from '../components/Sketch'

function Game4() {
  return (
    <div style={{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>
        <h1>My p5 sketch</h1>
        <Sketch />
    </div>
  )
}

export default Game4