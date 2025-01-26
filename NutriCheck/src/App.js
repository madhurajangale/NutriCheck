import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductInfo from './pages/details';
import Recommendations from './pages/alternates';
import Login from './Auth/Login';
import UserSignUp from './Auth/Signup';
import {  AuthProvider } from "./context/AuthContext";
import Imgscan from './components/imgscan';
import WebcamCapture from './components/WebCamCapture';
import Chat from './components/Chat';
import Quiz from './game/quiz';
import Results from './game/results';
import Dietgame from './pages/monthdiet';
import Navbar from './components/Navbar';
function App() {  
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
      < Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/details' element={<ProductInfo/>}/>
          <Route path='/recommendations' element={<Recommendations/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<UserSignUp/>}/>
          <Route path='/imgscan' element={<Imgscan/>}/>
          <Route path='/webcam' element={<WebcamCapture/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/monthlydiet" element={<Dietgame />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
