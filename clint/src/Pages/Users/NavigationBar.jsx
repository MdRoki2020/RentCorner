import React, { useRef, useState } from 'react';
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../../Assets/Styles/NavigationBar.css'
import logo from '../../Assets/Images/logo.png'
import { AiOutlineHome,AiOutlineSortDescending,AiOutlineUserSwitch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserLoginRequest, UserRegistrationRequest } from '../../API Request/APIRequest';
import { ErrorToast, IsEmail, IsEmpty, SuccessToast } from '../../Helper/FormHelper';
import Swal from 'sweetalert2';

const NavigationBar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [regShow, setregShow] = useState(false);
    const handleRegShow = () => setregShow(true);
    const handleRegClose = () => setregShow(false);



    //for user signup
    let NameRef,MobileRef,EmailRef,NidRef,ImageRef,PasswordRef=useRef();

    const OnSignUp=()=>{

        
        let FirstName=NameRef.value;
        let LastName=MobileRef.value;
        let Mobile=MobileRef.value;
        let Email=EmailRef.value;
        let Nid=NidRef.value;
        let image=ImageRef.files[0];
        let Password=PasswordRef.value;
        if(IsEmpty(FirstName)){
            ErrorToast("First Name Required");
          }
          else if(IsEmpty(LastName)){
            ErrorToast("Last Name Required");
          }
          else if(IsEmpty(Mobile)){
            ErrorToast("Mobile Required");
          }
          else if(IsEmpty(Email)){
            ErrorToast("Email Required");
          }
          else if(IsEmpty(Nid)){
            ErrorToast("Nid Required");
          }
          else if(IsEmpty(image)){
            ErrorToast("Photo Required");
          }
          else if(IsEmpty(Password)){
            ErrorToast("Password Required");
          }else{
            SuccessToast('Please Wait...');

            // Loader.classList.remove('d-none');

            const formData=new FormData();
            formData.append('FirstName',FirstName);
            formData.append('LastName',LastName);
            formData.append('Mobile',Mobile);
            formData.append('Email',Email);
            formData.append('Nid',Nid);
            formData.append('file',image);
            formData.append('Password',Password);
        UserRegistrationRequest(formData).then((result)=>{
        
        if(result===true){

          success();

          NameRef.value="";
          MobileRef.value="";
          EmailRef.value="";
          NidRef.value="";
          ImageRef.value="";
          PasswordRef.value="";

        }
        else{
        ErrorToast('Something Went Wrong');
        console.log('something went wrong');

        }
      })

        }
    }


    const success=()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You Have Been Registered',
            showConfirmButton: false,
            timer: 1500
          })
    }





    let loginEmailRef,loginPasswordRef=useRef();
    //for user signin
    const OnLogin=()=>{
        
        let loginEmail=loginEmailRef.value;
        let loginPassword=loginPasswordRef.value;


        if(IsEmail(loginEmail)){
            ErrorToast("Valid Email Address Required");
        }else if(IsEmpty(loginEmail)){
            ErrorToast("Email Is Required");
        }else if(IsEmpty(loginPassword)){
            ErrorToast("Password Is Required");
        }else{
            UserLoginRequest(loginEmail,loginPassword).then((result)=>{
                if(result===true){

                    handleClose();
                }else{
                    ErrorToast("Email And Password Dosen't Match");
                    console.log('something went wrong');
                }
            })
        }
    }






  return (
    
    <div>
        <Navbar expand="lg" className='animated fadeInDown fixed-top navbar-with-zindex' bg="light">
            <Container fluid>
                <Navbar.Brand className='navbarLogo text-center' as={Link} to={'/'}><img src={logo} alt='logo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                <Nav className="d-flex me-auto">
                    <Nav.Link as={Link} to={'/'}><AiOutlineHome/> Home</Nav.Link>
                    <Nav.Link as={Link} to={'/PostAuth'}><AiOutlineSortDescending/> All ADs </Nav.Link>
                    <Nav.Link as={Link} to={'/SearchProducts'}><BsFilterLeft/> Filter </Nav.Link>
                    <Nav.Link as={Link} to={'/Tracker'}><BiCurrentLocation/> Tracker </Nav.Link>
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

        <Modal show={show} onHide={handleClose} className="modal-with-zindex">
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
                    ref={(input)=>loginEmailRef=input}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    autoFocus
                    ref={(input)=>loginPasswordRef=input}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <span className="singleMsz"  onClick={handleRegShow}>Havn't An Account ?</span>
            <Button variant="primary" onClick={OnLogin}>
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
                    ref={(input)=>NameRef=input}

                />
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Mobile Number"
                    autoFocus
                    ref={(input)=>MobileRef=input}
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="email@gmail.com"
                    autoFocus
                    ref={(input)=>EmailRef=input}
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>NID</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Your NID"
                    autoFocus
                    ref={(input)=>NidRef=input}
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    autoFocus
                    ref={(input)=>ImageRef=input}
                />
                </Form.Group>



                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    autoFocus
                    ref={(input)=>PasswordRef=input}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <span className='singleMsz' onClick={handleRegClose}>Already Have An Account ?</span>

            <Button variant="primary" onClick={OnSignUp} >
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
