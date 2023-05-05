import React, { Fragment, useRef } from 'react'
import '../../Assets/Styles/userSignUpAndLogin.css'
import {Link, useNavigate,} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { AiOutlineUserAdd } from "react-icons/ai";
import FullScreenLoader from '../../Common/FullScreenLoader';
import { ErrorToast, IsEmail, IsEmpty } from '../../Helper/FormHelper';
import Swal from 'sweetalert2';
import { SignupRequest } from '../../API Request/APIRequest';

const UserSignup = () => {

    let FirstNameRef,LastNameRef,MobileRef,EmailRef,ImageRef,PasswordRef,ConformPasswordRef,Loader=useRef();
    let navigate=useNavigate();

    const OnSignUp=()=>{

        
        let FirstName=FirstNameRef.value;
        let LastName=LastNameRef.value;
        let Mobile=MobileRef.value;
        let Email=EmailRef.value;
        let image=ImageRef.files[0];
        let Password=PasswordRef.value;
        let ConformPassword=ConformPasswordRef.value;        
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
          else if(IsEmpty(image)){
            ErrorToast("Photo Required");
          }
          else if(IsEmpty(Password)){
            ErrorToast("Password Required");
          }
          else if(IsEmpty(ConformPassword)){
            ErrorToast("Conform Required");
          }
          else if(Password!==ConformPassword){
            ErrorToast("Password And Conform Password Dosen't Match");
          }else{

            Loader.classList.remove('d-none');

            const formData=new FormData();
            formData.append('FirstName',FirstName);
            formData.append('LastName',LastName);
            formData.append('Mobile',Mobile);
            formData.append('Email',Email);
            formData.append('file',image);
            formData.append('Password',Password);
            formData.append('ConformPassword',ConformPassword);      
        SignupRequest(formData).then((result)=>{
        
        if(result===true){
          Loader.classList.add('d-none');
          navigate("/RentersLogin");

          FirstNameRef.value="";
          LastNameRef.value="";
          MobileRef.value="";
          EmailRef.value="";
          ImageRef.value="";
          PasswordRef.value="";
          ConformPasswordRef.value="";

          success();

        }
        else{

        Loader.classList.add('d-none');
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
  return (
    <Fragment>
      <section>
        <div className='container'>
        <div className='row BoxWrapper'>
            <div className='col-md-6'>
                <div className='heading'>
                    <h4 className='accountHeading text-center mt-4'>Get Your Free Account Now</h4>
                    <p className='subHeading text-center'>Free Forever. No Payment Needed</p>
                </div>
                
                <form method="post" enctype="multipart/form-data">
                <div className='row my-4'>
                    <div className='col-md-6'>
                        <input type='text' ref={(input)=>FirstNameRef=input} className='form-control animated fadeInUp' placeholder='Enter First Name'/>
                    </div>
                    <div className='col-md-6'>
                        <input type='text' ref={(input)=>LastNameRef=input} className='form-control animated fadeInUp' placeholder='Enter Last Name'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <input type='text' ref={(input)=>MobileRef=input} className='form-control animated fadeInUp' placeholder='Enter Mobile Number'/>
                    </div>
                    <div className='col-md-6'>
                        <input type='email' ref={(input)=>EmailRef=input} className='form-control animated fadeInUp' placeholder='Enter Email Address'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12 input-group'>
                        <input type='file' ref={(input)=>ImageRef=input} className='form-control animated fadeInUp' placeholder='Enter Email'/>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input type='password' ref={(input)=>PasswordRef=input} className='form-control animated fadeInUp' placeholder='Enter Password'/>
                    </div>
                    <div className='col-md-6'>
                        <input type='password' ref={(input)=>ConformPasswordRef=input} className='form-control animated fadeInUp' placeholder='Enter Conform Password'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <Button onClick={OnSignUp} className='form-control btn btn-warning text-light animated fadeInUp shadow'>Signup With Email <AiOutlineUserAdd/></Button>
                    </div>
                </div>
                </form>

                <div className='otherDetails'>
                    <Link to='/RentersLogin'><p className='haveAnAccount text-center text-primary'>Already Have An Account !</p></Link>
                    <Link to='/sendOtp'><p className='forgetPass text-center text-primary'>Forget Password</p></Link>
                </div>
      
            </div>

            <div className='col-md-6'>
                <div className='ImageCover'>
                    
                </div>
            </div>
        </div>
        </div>

      </section>

    <div className='d-none' ref={(div)=>Loader=div}>

    <FullScreenLoader />

    </div>
    </Fragment>
  )
}

export default UserSignup
