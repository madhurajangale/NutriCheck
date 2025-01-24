import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'
import "../styles/Home.css"
import features from '../images/features.png'
import Landing from '../components/Landing.jsx';

const Home = () => {
  return (
    
    <div>
        <Navbar/>

        <div class="container">
    <Landing />
  </div>
        <section id="about">
    <div className='nutriabt' style={{ marginTop: '3rem'}}align='center'>
      <h1 style={{ fontSize: '2.2rem'} }>About us</h1>
      <p style={{ fontSize: '20px', margin: '20px' } }>Delta compression using up to 12 threads        
Compressing objects: 100% (28/28), done.
Writing objects: 100% (30/30), 174.47 KiB | 3.88 MiB/s, done.
Total 30 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.</p>
      
    </div>

  </section>
  <section>
  <div className='featurescont'>
  <h1 style={{ fontSize: '2.2rem', color: '#2f524d' } }> Features</h1>
      <img src={features} className="features" alt="..." />
      
      </div>
  </section>
  <section>
  <footer className="footer-container" id="contact">
  <div className="footer-content">
    <div className="footer-section">
      <h4 data-key="poweredBy">Powered By</h4>
      <p data-key="govOfIndia">Government Of India</p>
    </div>
    <div className="footer-section">
      <h4 data-key="quickLinks">Quick Links</h4>
      <p><Link to="/" data-key="home">Home</Link></p>
      <p><Link to="/category" data-key="schemes">Schemes</Link></p>
      <p><a href="#about" data-key="about">About</a></p>
      <p><a href="#faq" data-key="faq">FAQs</a></p>
      <p><a href="#contact" data-key="contact">Contact Us</a></p>
    </div>
    <div className="footer-section">
      <h4 data-key="contactUs">Contact Us</h4>
      <p data-key="email">Email: info@eyojana.gov</p>
      <p data-key="phone">Phone: +123 456 7890</p>
      <p data-key="address">Address: 123 Government Building, Mumbai</p>
    </div>
  </div>
  <div className="footer-bottom">
    <p data-key="copyright">© 2025 E-Yojana. All rights reserved.</p>
  </div>
</footer>

  </section>

 
        </div>
  );
};

export default Home;