import React, { Fragment, useRef, useState } from 'react'
import '../../Assets/Styles/userSignUpAndLogin.css'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {AiOutlineMail,AiFillLock } from "react-icons/ai";
import { VscSignIn } from "react-icons/vsc";
import { IsEmail, IsEmpty } from '../../Helper/FormHelper';
import { RentersLoginRequest } from '../../API Request/APIRequest';
// import FullScreenLoader from '../../Common/FullScreenLoader';
import { ToastErrorToast } from '../../Helper/FormHelper2';
import Footer from '../Users/Footer';
import '../../Assets/Styles/CustomLoader.css';
import spinnerImage from '../../Assets/Images/pageLoader.svg';

const UserSignin = () => {

  let EmailRef,PasswordRef=useRef();
  const [isLoading, setIsLoading] = useState(false);

    let navigate=useNavigate();

    const OnLogin=()=>{
        
        let Email=EmailRef.value;
        let Password=PasswordRef.value;


        if(IsEmail(Email)){
            ToastErrorToast("Valid Email Address Required");
        }else if(IsEmpty(Email)){
            ToastErrorToast("Email Is Required");
        }else if(IsEmpty(Password)){
            ToastErrorToast("Password Is Required");
        }else{
            // Loader.classList.remove('d-none');
            setIsLoading(true)
            RentersLoginRequest(Email,Password).then((result)=>{
                if(result===true){
                    setIsLoading(false)
                    // Loader.classList.add('d-none');
                    navigate("/RentersDashboard");
                }else{
                    setIsLoading(false)
                    // Loader.classList.add('d-none');
                    ToastErrorToast("Email And Password Dosen't Match");
                    console.log('something went wrong');
                }
            })
        }
    }

  return (
    <Fragment>
      <section>
      {isLoading ? (
          <div className="loader-container">
            <img className="loader-image" src={spinnerImage} alt="Loading..." />
          </div>
        ) : (
        <div className='container'>
        <div className='row BoxWrapper'>
            <div className='col-md-6'>
                
                <div className='signinComponents'>

                <div className='heading'>
                    <h4 className='accountHeading text-center mt-4'>Welcome To Rent Corner Web Application</h4>
                    <p className='subHeading text-center'>Enter your credentials to access your account</p>
                </div>

                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><AiOutlineMail/></span>
                <input type="email" ref={(input)=>EmailRef=input} className="form-control animated fadeInUp" placeholder="Enter Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><AiFillLock/></span>
                <input type="password" ref={(input)=>PasswordRef=input} className="form-control animated fadeInUp" placeholder="Enter Password"  aria-describedby="basic-addon1"/>
                </div>

                <div class="input-group mb-3">
                <Button onClick={OnLogin} className="form-control btn userSignInBtn text-light animated fadeInUp shadow">SignIn <VscSignIn/></Button>
                </div>

                </div>

                <div className='otherDetails'>
                    <Link to='/RentersRegistration'><p className='haventAccount text-center text-primary'>Haven't An Account !</p></Link>
                    <Link to='/sendOtp'><p className='forgetPassForSignin text-center text-primary'>Forget Password</p></Link>
                </div>
      
            </div>

            <div className='col-md-6'>
                <div className='ImageCover'>
                    
                </div>
            </div>
        </div>
        </div>
        )}

      </section>

      {/* <div className='d-none' ref={(div)=>Loader=div}>

        <FullScreenLoader />

    </div> */}

    <Footer />
    </Fragment>
  )
}

export default UserSignin
