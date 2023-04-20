import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../Assets/Images/logo.png'
import '../../Assets/Styles/Footer.css'
import 'hover.css/css/hover-min.css';
const Footer = () => {
  return (
    <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <img className='footerImage' src={logo} alt='footerImage' />
              <p>RENT CORNER website Build ReactJs, ExpressJS, NodeJS, MongoDB. If you have any question you can visit https://rsroki.info or email: mroki815@gmail.com</p>
            </div>
            <div className='col-md-4 mt-4'>
              <h6 className='text-light'>Important Link</h6>
              <Link to='/'><p className='footerLink'> Home</p></Link>
              <Link to='/'><p className='footerLink'> All Ads</p></Link>
              <Link to='/'><p className='footerLink'> Post Your Ads</p></Link>
              <Link to='/'><p className='footerLink'> My Account</p></Link>
            </div>
            <div className='col-md-4'>
            <h6 className='text-light mt-4'>Newsletter</h6>
            <p>Sign up and receive the latest tips via email.</p>
            <p>Email*</p>
            <input className='footerInput' placeholder='you@example.com'/>
            <button className='btn btn-warning hvr-sweep-to-right'>Subscribe </button>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
