import React from 'react';
import { useState, useEffect } from 'react';

function Game1() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight - 1 });
  const [gridSize, setGridSize] = useState({row: 10, col: 10});
  const [notify, setNotify] = useState("");
  const [contentMenu, setContentMenu] = useState([]);
  const [path, setPath] = useState([]);
  const [obstacle, setObstacle] = useState(true);
  const [startIndex, setStartIndex] = useState(null);
  const [start, setStart] = useState(false);
  

  const handleRowChange = (e) => {
    setGridSize({ ...gridSize, row: e.target.value });
  }

  const handleColChange = (e) => {
    setGridSize({ ...gridSize, col: e.target.value });
  };
  // Event listners
  const cordSubmit = ()=>{

    let newContentMenu = []
    let newpath = []
    for(let i = 0; i < gridSize.row; i++){
      for(let j = 0; j < gridSize.col; j++){
        newContentMenu.push(<div className={`contents-${i*gridSize.row+j}`} key={`${i}+${j}`} style={{
          width : `calc(100% / ${gridSize.col})`,
          height: `calc(100% / ${gridSize.row})`,
          outline: '0.1px solid black',
          outlineOffset: '-0.1px',
          background: 'white',
          caretColor: 'transparent',
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'center',boxSizing: 'border-box'
        }} onClick={(e)=>handleClick(i*gridSize.row+j)}>
          <div style={{
            // fontSize: `(1/ ${gridSize.row})px`,
            fontSize: `${150/gridSize.row}px`,
            height: `${150/gridSize.row+1}px`,
            color: 'black'
          }}></div>
        </div>)
        newpath.push(-1);
      }
    }
    setContentMenu(newContentMenu)
    setPath(newpath); 
  }
  useEffect(()=>{
    console.log(obstacle);
  }, [obstacle])

  useEffect(()=>{
    console.log(start);
  }, [start])


  const handleClick = (index) => {
    if (obstacle===true) {
      const element = document.querySelector(`.contents-${index}`);
      element.style.background = "green";
      setStartIndex(index);
      const newPath = [...path];
      console.log(path)
    }
    setStart(false);
  };


  const appStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexWrap: 'wrap'
  };

  const contentStyle = {
    flex: '0 0 auto',
    width: Math.min(windowSize.width, windowSize.height),
    height: Math.min(windowSize.width, windowSize.height),
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  };

  const menuStyle = {
    flex: '1',
    height: windowSize.height + 'px',
    background: 'rgb(32, 33, 35)'
  };

  const inputMenuStyle = {
    width: windowSize.width - Math.min(windowSize.width, windowSize.height) - 100 + 'px',
    height: windowSize.height - 100 + 'px',
    background: 'rgb(68, 70, 84)',
    margin: '50px auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '20px'
  };

  const inXcord={

  }
  const notification = {
    visibility: notify==="" ? 'hidden' : 'inherit',
    color: 'rgb(252,22,3)',
  }
  return (
    <div className="App" style={appStyle}>
      <div style={contentStyle}>
       {
        contentMenu.map((data, index)=>{
          return data;
        })
       }
      </div>
      <div style={menuStyle}>
        <div style={inputMenuStyle}>
          <p className='inHeaderStyle'>INPUT-BOX</p>
          <div className='userInput'>
            <div className='text'>Enter the size of grid</div>
            <div style={inXcord} className='inXcord'>
              <label htmlFor="">Row</label>
              <input type="text" onChange={(e)=>handleRowChange(e)}/>
            </div>
            <div style={inXcord} className='inYcord'>
              <label htmlFor="">col</label>
              <input type="text" onChange={(e)=>handleColChange(e)}/>
            </div>
            <button className=' selObs' onClick={cordSubmit}>Click to Create grid</button>
            <small style={notification}>{notify}</small>
            <button className='selObs' onClick={()=>{setObstacle(!obstacle)}}>Click to select obstacles</button>
            <button className='selObs' onClick={()=>{setStart(!false); setObstacle(false)}}>Click to select starting point</button>
            <button className='selObs' >Click to Start</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game1;
