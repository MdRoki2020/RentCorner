import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../../Assets/Styles/NavigationBar.css'
import logo from '../../Assets/Images/logo.png'
import { AiOutlineHome,AiOutlineSortDescending,AiOutlineUserSwitch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";

const NavigationBar = () => {
  return (
    
        <div>
        <Navbar expand="lg" className='animated fadeInDown fixed-top' bg="light">
            <Container fluid>
                <Navbar.Brand className='navbarLogo text-center' as={Link} to={'/'}><img src={logo} alt='logo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                <Nav className="d-flex me-auto">
                    <Nav.Link as={Link} to={'/'}><AiOutlineHome/> Home</Nav.Link>
                    <Nav.Link as={Link} to={'/PostAuth'}><AiOutlineSortDescending/> All ADs </Nav.Link>
                    <Nav.Link as={Link} to={'/searchProducts'}><BsFilterLeft/> Filter </Nav.Link>
                    <Nav.Link as={Link} to={'/UserSignin'}><AiOutlineUserSwitch/> My Account </Nav.Link>
                </Nav>

                <div>
                    <Button className='shadow' variant="warning">Login</Button>
                </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
  )
}

export default NavigationBar
