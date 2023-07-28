import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import '../style/Game3.css'
import Snackbar from '../components/Snackbar';
const Grid = lazy(() => import('../components/Grid'))

function Game3() {
  const childRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [obstacle, setSelectObstacle] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [gridSize, setGridSize] = useState({row: 25, col: 25}); 
  const [type, setType] = useState(null)
  const snackbarRef = useRef(null); 
  const [content, setContent] = useState({message:'', type:''});

  const perform = ()=>{
    snackbarRef.current.show();
  }
  return (
    <div className='rooted'>
      <Snackbar ref={snackbarRef} message={content.message} type={content.type}/>
      <div className='nvGca'>
        <div className='leftPart'>
          <div className='inputs'>
            <input type="text" placeholder='Enter no of rows' onChange={(e)=>setGridSize({...gridSize, row:e.target.value})}/>
            <input type="text" placeholder='Enter no of cols' onChange={(e)=>setGridSize({...gridSize, col:e.target.value})}/>
            <div className={`btn green accent-4 waves-effect black ${showComponent ? 'disabled' : 'green'}`} onClick={()=>{setShowComponent(true);setContent({message:'New Grid Created', type:'success'});snackbarRef.current.show();}}>
              Create Grid
            </div>
          </div>
          <div className="buttons">
            <div className={`btn darken-3 waves-effect waves-light ${showComponent ? 'blue' : 'disabled'}`} onClick={()=>{setSelectObstacle(!obstacle);setContent({message:'Now you can select Obstacle', type:'success'});snackbarRef.current.show()}}>
              Click to select obstacle
            </div>
            <div  className={`btn darken-3 waves-effect waves-light ${showComponent ? 'blue' : 'disabled'}`} onClick={()=> {setContent({message:'Random Grid Created', type:'success'});snackbarRef.current.show() ;childRef.current.generateRandomGrid()}}>
              Random obstacle
            </div>
            <div className={`btn darken-3 waves-effect waves-light ${showComponent ? 'blue' : 'disabled'}`} onClick={()=>{window.scrollTo({top:370, behavior:'smooth'}); setSelectObstacle(false) ; childRef.current.dfs()}}>
              Click to Run Algorithm
            </div>
          </div>
        </div>
        <div className='middelPart'></div>
        <div className='rightPart'>
          <div className="btn waves-effect" onClick={perform}>perfom</div>
          <div className="btn waves-effect waves-lighten-3" onClick={()=>{setMessage('New message seted');setType('success');snackbarRef.current.show();}}>&#9760;</div>
        </div>
      </div>
      <div className='nvGcb'>
        {showComponent && (
          <Suspense fallback={<div>Loading...</div>}>
            <Grid ref={childRef} message={"Row and Col are passed"} gridSize={gridSize} select={obstacle}/>
          </Suspense>
        )}
      </div>
    </div>
  )
  
}

export default Game3;