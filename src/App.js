import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar';
import Slidebar from './Slidebar';
import Home from './Home'
import Game1 from './games/Game1'
import Game2 from './games/Game2'
import Game3 from './games/Game3'
import Game4 from './games/Game4'
import Comp2 from './games/Comp2';


function App() {
  const grid = {row : 50, col: 60}
  return (
    <div> 
      <Router>
        <Navbar/>
        <Slidebar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/micro-mouse' element={<Game1/>}/>
          <Route path='/Long-leg' element={<Game2  grid = {grid}/>} />
          <Route path='/Chain-chips' element={<Game3 />} />
          <Route path='/new-game' element={<Game4 />} />
          <Route path='/comp2' element={<Comp2 />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
