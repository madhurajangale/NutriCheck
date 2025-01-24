import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductInfo from './pages/details';
import Login from './Auth/Login';
import UserSignUp from './Auth/Signup';
import {  AuthProvider } from "./context/AuthContext";
function App() {  
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/details' element={<ProductInfo/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<UserSignUp/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
