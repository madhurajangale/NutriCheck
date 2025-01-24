import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import nutrilogo from '../images/nutrilogo.png'

const Navbar = () => {
  return (
    <div>
        <div className="navbar">

           <ul>
            <li ><img src={nutrilogo} className="logo"></img></li>
            <li className="links"><Link to="/">Home</Link></li>
            <li className="links"><Link to="/">About</Link></li>
            <li className="links"><Link to="/">Community Chat</Link></li>
            <li className="links"><Link to="/">History</Link></li>
            <li className="links"><Link to="/">Scan</Link></li>
            <li className="links"><Link to="/">Diet Assessment</Link></li>
            </ul> 
            <div className='btn-container'><button className="btn">Login</button></div>
        </div>
    </div>
  )
}

export default Navbar