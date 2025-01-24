import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductInfo from './pages/details';
import Recommendations from './pages/alternates';
function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/details' element={<ProductInfo/>}/>
          <Route path='/recommendations' element={<Recommendations/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
