import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Slidebar() {
    const[slide, setSlide] = useState(false);
    const content1 = {
        transform: slide ? 'translateX(0)' : 'translateX(-100%)'
    }
  return (
    <div className='row' style={{marginBottom: '0px'}}> 
        <i className="material-icons menu" onClick={()=>setSlide(!slide)}>menu</i>
        <div className="col l2 m3 s12 content-1" style={content1}>
        <div className="searchBar white-text">
            <input type="text" className='white-text'placeholder='search'/>
            <i className="material-icons searchIcon">search</i>
        </div>
        <div className="games">
            {/* <a href='/Micro-mouse' className='game 1'>MicroMousedsfsdfdsfsdfsdafafdsffdsf</a> */}
            <Link to='/Micro-mouse' className='game 1' onClick={()=>setSlide(!slide)}>Chain-chips</Link>
            <Link to='/Long-leg' className='game 2' onClick={()=>setSlide(!slide)}>Long-Legs</Link>
            <Link to="/Chain-chips" className='game 3' onClick={()=>setSlide(!slide)}>Micro-mouse</Link>
            <Link to='/new-game' className='game 4' onClick={()=>setSlide(!slide)}>New game introduced</Link>
            <Link to='comp2' className='game 5' onClick={()=>setSlide(!slide)} >Game-5</Link>
        </div>
        </div>
    </div>
  )
}

export default Slidebar