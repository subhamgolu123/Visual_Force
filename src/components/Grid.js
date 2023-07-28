import React, { useRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import '../style/Grid.css'
import Snackbar from './Snackbar';
export const start = Math.floor(Math.random() * 101);
export let end;
do{
  end = Math.floor(Math.random()*101);
}while(end===start)


const Grid = forwardRef((props, ref) => {
  const snackbarRef = useRef(null);
  const [path,setPath] = useState([]);
  const [enlarge, setEnlarge] = useState(false);
  const gridSize = {row: props.gridSize.row, col:props.gridSize.col}
  const [obstacle, setObstacles] = useState(new Set());
  const [windowSize] = useState({ width:window.innerHeight, height:window.innerWidth})
  const [grid, setGrid] = useState([])
  const size = (Math.min(windowSize.width, windowSize.height)/ gridSize.row);
  function Spot(i, j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.isVisited = false;
    this.col = '#e0e0e0';
    this.isDanger = false;
    this.content = undefined
    this.neighbour = [];
  }
  const handleClick = (index) => {
    if (props.select && index != start && index != end) {
      const ele = document.querySelector(`.box-${index}`);
      ele.style.transition = 'background-color 0.3s ease';
      grid[index].col='rgb(32,35,32)'
      grid[index].isVisited = true;
      ele.style.outline = '1px solid black'
      const updatedSet = new Set([...obstacle, index]);
      setObstacles(updatedSet)
    }
  }
  const traversePath = (path)=>{
   console.log(path)
    const traversing = (path, index)=>{
      if(index===path.length) return;

      for(let idx = 0; idx<path[index].length; idx++){
        grid[path[index][idx]].col = 'pink';
        setGrid([...grid])
        setTimeout(() => { grid[path[index][idx]].col = '#00F593'; }, 10)
      }
      setGrid([...grid])
      setTimeout(()=>{traversing(path,index+1);}, 100);
    }
    traversing(path, 0);
  }
  const follow = (start, end, grid, gridSize) => {
    let curr = start;
    const dfs = (curr, currPath) => {
      if (curr === end) {
        path.push(currPath)
        return;
      }
      if (grid[curr].content > grid[end].content) return;
  
      for (let i = 0; i < grid[curr].neighbour.length; i++) {
        let idx = grid[curr].neighbour[i].row * gridSize.row + grid[curr].neighbour[i].col;
        if(grid[idx].col==='rgb(32,35,32)') continue;
        if (grid[idx].content === grid[curr].content + 1) {
          currPath.push(idx);
          dfs(idx,[...currPath]);
          currPath.pop();
        }
      }
    };
    dfs(curr, [curr]);
    traversePath(path);
  }
  
  
  //method and properties that can be acessed from parent component
  useImperativeHandle(ref, ()=>({
    AStar: ()=>{
      const curr = grid[start].content
      while(curr != grid[end].content){

      }
    },
    dfs: () => {
      const stack = [start];
      grid[start].content = 0;
      grid[start].isVisited = true;
      // Define the DFS recursive function
      const traverse = () => {
        if (stack.length === 0) {
          // alert('BFS completed')
          // console.log(grid);
          follow(start, end, grid, gridSize);
          console.log('DFS algorithm run');
          return;
        }
        
        const curr = stack.shift();
        let row = Math.floor(curr / gridSize.row);
        let col = curr % gridSize.col;
        const down = (row + 1) * gridSize.row + col;
        const up = (row - 1) * gridSize.row + col;
        const left = row * gridSize.row + (col - 1);
        const right = row * gridSize.row + (col + 1);
        if (curr === end) {
          grid[curr].col = 'white';
        }

        if ((row - 1) >= 0 && !grid[up].isVisited) {
          grid[up].isVisited = true;
          grid[up].col = '#00F593'
          grid[up].content = grid[curr].content + 1;
          stack.push(up);
          // setTimeout(()=>{ grid[up].col = 'white' }, 1000)
        }
        if ((col + 1) < gridSize.col && !grid[right].isVisited) {
          grid[right].isVisited = true;
          grid[right].col = '#00F593'
          grid[right].content = grid[curr].content + 1;
          stack.push(right);
          // setTimeout(()=>{ grid[up].col = 'white' }, 1000)
        }
        if ((row + 1) < gridSize.row && !grid[down].isVisited) {
          grid[down].isVisited = true;
          grid[down].col = '#00F593'
          grid[down].content = grid[curr].content + 1;
          stack.push(down);
          // setTimeout(()=>{ grid[up].col = 'white' }, 1000)
        }
        if ((col - 1) >= 0 && !grid[left].isVisited) {
          grid[left].isVisited = true;
          grid[left].col = '#00F593'
          grid[left].content = grid[curr].content + 1;
          stack.push(left);
          // setTimeout(()=>{ grid[up].col = 'white' }, 1000)
        }
        if ((row - 1) >= 0 && !grid[up].idDanger) {
          grid[curr].neighbour.push({row: row-1, col: col});
        }
        if ((row + 1) < gridSize.row && !grid[down].isDanger) {
          grid[curr].neighbour.push({row: row+1, col: col});
        }
        if ((col - 1) >= 0 && !grid[left].isDanger) {
          grid[curr].neighbour.push({row: row, col: col-1});
        }
        if ((col + 1) < gridSize.col && !grid[right].isDanger) {
          grid[curr].neighbour.push({row: row,col: col+1});
        }
    
        setGrid([...grid]);
    
        // Call traverse() recursively after a delay of 1 second
        setTimeout(traverse, 10);
        // traverse()
      };
    
      // Call traverse() initially
      traverse();

    },
    generateRandomGrid: ()=>{
      for(let i = 0; i < gridSize.row; i++){
        for(let j = 0; j < gridSize.col; j++){
          let index = i*gridSize.row + j;
          grid[index].isVisited = false
          grid[index].content = undefined;
          if(index===start){
            grid[start].col = 'red'
            continue;
          }
          if(index===end){
            grid[index].col = 'white'
            continue
          }
          const des = Math.random() < 0.4;
          const ele = document.querySelector(`.box-${index}`);
          ele.style.color = 'white'
          // ele.style.transition = 'background-color .5s ease-in-out';
          if(des){
            grid[index].col = 'rgb(32,35,32)';
            grid[index].isVisited = 'true';
            grid[index].isDanger = true;
          }
          else{
            grid[index].isVisited = false
            grid[index].col = 'white'
          }
        }
        setGrid([...grid])
      }
    }
  }))
  useEffect(() => {
    const boxes = []
    for (let i = 0; i < gridSize.row; i++) {
      for (let j = 0; j < gridSize.col; j++) {
        const newSpot = new Spot(i, j);
        newSpot.col = 'white'
        if(i*gridSize.row+j==start) newSpot.col='red';
        if(i*gridSize.row+j==end) newSpot.col = 'white'
        boxes.push(newSpot)
      }
    }
    setGrid(boxes)
  }, [])
  const gridContainer = {
    width: Math.min(windowSize.width, windowSize.height),
    height: Math.min(windowSize.width, windowSize.height),
  }
  const showEnlarge = (index)=>{
    setEnlarge(true)
    const ele = document.querySelector(`.zoomIn`);
    if(grid[index].col === '#00F593' || grid[index].col === 'pink') ele.innerHTML = index;
    else if(index===end){
      ele.innerHTML = 'Destination';
    }
    else{
      ele.innerHTML = ''
    }
    ele.style.background = grid[index].col;
  }
  return (
     <div>
      <Snackbar ref={snackbarRef} message='hii there!!!' type= 'success' />
      <div className={`enlarger ${enlarge ? 'show' : 'hide'}`}>
        <div className='zoomIn'></div>
      </div>
      <div className='grid-container' style={gridContainer}>
        {
          // height + ' ' + width
          grid.map((item, index) => (
            <div 
              key={index}
              className={`box-${index}`}
              style={{
                width: size,
                cursor:'pointer',
                height: size,
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                outline: '1px solid black',
                // background: index===start ? 'red' : index===end ? 'white' : 'wheat'
                background: item.col,
              }} 
              onMouseEnter={()=>showEnlarge(index)}
              onMouseLeave={()=>setEnlarge(false)}
              onClick={()=>handleClick(index)}>
              {index===end ? <div className='material-icons' style={{
                fontSize: size/(1.5)
              }}>stars</div> : index===start ? '': <div style={{
                fontSize: size/3,
                position: 'absolute',
                top:'0px', 
                left: '0px'
              }}>{item.content}</div>}
              
          </div>
          ))
        }
      </div>
      
    </div>
  )
});

export default Grid





























































// import React, { useEffect, useState } from 'react'
// import './Grid.css'

// function Grid(props) {
//   const [color] = useState('blue')
//   const gridSize = {row: props.gridSize.row, col:props.gridSize.col}
//   const [windowSize, setWindowSize] = useState({ width:window.innerHeight, height:window.innerWidth})
//   const [grid, setGrid] = useState([])
//   const size = (Math.min(windowSize.width, windowSize.height)/ gridSize.row);
//   useEffect(()=>{
//     const boxes = []
//     for(let i = 0; i < gridSize.row; i++){
//       for(let j = 0; j < gridSize.col; j++){
//         const ele = React.createElement("div", {
//           className: `box-${i*gridSize.row+j}`,
//           key: `${i}+${j}`,
//           style: {
//             width: size,
//             height: size,
//             outline: '0.1px solid black',
//             background: 'white'
//           },
//           onClick: ()=>props.handleClick(i*gridSize.row+j, `box-${i*gridSize.row+j}`, color)
//         })
//         boxes.push(ele)
//       }
//       setGrid(boxes);
//     }
//   }, [])
//   console.log("Grid component has been rendered")
//   const gridContainer = {
//     width: Math.min(windowSize.width, windowSize.height),
//     height: Math.min(windowSize.width, windowSize.height),
//     background: 'black'
//   }
//   return (
//       <div className='grid-container' style={gridContainer}>
//       {
//         // height + ' ' + width
//         grid.map((_, index)=>{
//           return _
//         })
//       }
//     </div>
//   )
// }

// export default Grid
