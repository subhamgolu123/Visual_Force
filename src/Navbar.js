import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='header row '>
        <div className="col l11 navBar">
            <h5 className='header_logo white-text'><Link to='/'style={{color: 'white'}}>VisualForces</Link></h5>
            <div className='hide-on-small-and-down'>
                <ul className='header_links'>
                    <li>create your game</li>
                    <li>Login</li>
                    <li>Sign Up</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar