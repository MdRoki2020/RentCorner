import React, { Fragment, useRef } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import RoundLoader from '../Common/RoundLoader';
import { BsFillEnvelopeFill} from "react-icons/bs";
import { AiOutlineRollback } from "react-icons/ai";
import {Link, useNavigate } from 'react-router-dom';
import { ErrorToast, IsEmail } from '../Helper/FormHelper';
import { RecoverVerifyEmailRequest } from '../API Request/APIRequest';
import '../Assets/Styles/sendOtp.css';
import { FcNext } from "react-icons/fc";


const SendOtp = () => {

    let navigate=useNavigate();
    let EmailRef,Loader=useRef();


    const verifyEmail=()=>{
        let Email=EmailRef.value;


        if(IsEmail(Email)){
            ErrorToast("valid Email Address Required");
        }else{
            Loader.classList.remove('d-none');
            RecoverVerifyEmailRequest(Email).then((result)=>{
                if(result===true){
                    debugger;
                    Loader.classList.add('d-none');
                    navigate('/verifyOtp');
                }
            })
        }
    }

    


  return (
    <Fragment>
        <div className='loginwrapped'>
        <div className='container'>
        <div className='row'>
            <div className='col-md-4'>
            
            </div>
            <div className='col-md-4'>
            <Card style={{ marginTop : "200px" }} className='topSpaceLoginForm px-4 py-4 shadow'>
            <div className='card px-3 py-4 shadow'>
            <div class="card-body cardTitle">
                <h3>Email</h3>
            </div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><BsFillEnvelopeFill/></InputGroup.Text>
                <Form.Control ref={(input)=>EmailRef=input}  placeholder="Enter Email" aria-label="Email" aria-describedby="basic-addon1"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Button onClick={verifyEmail} className='form-control loginButton forgetPasswordNextBtn'>Next <FcNext/></Button>
            </InputGroup>
            </div>
            </Card>
            </div>
            <div className='col-md-4'>

            </div>
        </div>
        <div className='backButton'><Link to="/RentersRegistration"><AiOutlineRollback/></Link></div>
    </div>

    <div className='d-none' ref={(div)=>Loader=div}>

        <RoundLoader />

    </div>
    </div>
    </Fragment>
  )
}

export default SendOtp
