import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome,AiOutlineSortDescending,AiOutlineAccountBook } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
import { TbBellRinging2 } from "react-icons/tb";
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
              <p><span>B</span>ari<span>B</span>azar<span>B</span>d Application Build in ReactJs, ExpressJS, NodeJS, MongoDB. If you have any question you can visit https://rsroki.info or email: mroki815@gmail.com</p>
            </div>
            <div className='col-md-4 mt-4'>
              <h6 className='text-light'>Important Link</h6>
              <Link to='/'><p className='footerLink'><AiOutlineHome/> Home</p></Link>
              <Link to='/'><p className='footerLink'><AiOutlineSortDescending/> All Ads</p></Link>
              <Link to='/'><p className='footerLink'><BsFilePost/> Post Your Ads</p></Link>
              <Link to='/'><p className='footerLink'><AiOutlineAccountBook/> My Account</p></Link>
            </div>
            <div className='col-md-4'>
            <h6 className='text-light mt-4'>Newsletter</h6>
            <p>Sign up and receive the latest tips via email.</p>
            <p>Email*</p>
            <input className='footerInput' placeholder='you@example.com'/>
            <button className='btn hvr-sweep-to-right'>Subscribe <TbBellRinging2/></button>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
