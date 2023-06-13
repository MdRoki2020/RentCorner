import React, { useState } from 'react';
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../../Assets/Styles/NavigationBar.css'
import logo from '../../Assets/Images/logo.png'
import { AiOutlineHome,AiOutlineSortDescending,AiOutlineUserSwitch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const NavigationBar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [regShow, setregShow] = useState(false);
    const handleRegShow = () => setregShow(true);
    const handleRegClose = () => setregShow(false);

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
                    <Nav.Link as={Link} to={'/RentersLogin'}><AiOutlineUserSwitch/> My Account </Nav.Link>
                </Nav>

                <div>
                    <Button className='shadow' variant="info" onClick={handleShow}><CiLogin /> Login</Button>
                </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>




        <>

        {/* Modal For Login Page */}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>User Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="email@gmail.com"
                    autoFocus
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Your Password"
                    autoFocus
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <span className="singleMsz" onClick={handleRegShow}>Havn't An Account ?</span>
            <Button variant="primary" onClick={handleClose}>
                Login
            </Button>
            </Modal.Footer>
        </Modal>
        </>





    <>
        {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button> */}

        {/* Modal For Registration Page */}

        <Modal show={regShow} onHide={handleRegClose}>
            <Modal.Header closeButton>
            <Modal.Title>User Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    autoFocus
                />
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Mobile Number"
                    autoFocus
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="email@gmail.com"
                    autoFocus
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>NID</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Your NID"
                    autoFocus
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    autoFocus
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Your Password"
                    autoFocus
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <span className='singleMsz' onClick={handleRegClose}>Already Have An Account ?</span>

            <Button variant="primary" >
                Save Changes
            </Button>
            {/* onClick={handleRegClose} */}
            </Modal.Footer>
        </Modal>
    </>





    </div>
  )
}

export default NavigationBar
