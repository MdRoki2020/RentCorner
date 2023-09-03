import React, { useRef } from 'react'
import { ErrorToast} from '../../Helper/FormHelper';
import { useNavigate } from 'react-router-dom';
import { ProfileUpdateRequest } from '../../API Request/APIRequest';

const RenterProfile = () => {

    let navigate=useNavigate();
    const id="d347fd63vd63dv23eedv";

    let proImageRef,fnameRef,lnameRef,mobileRef,emailRef,passwordRef,CpasswordRef=useRef();


    const OnUpdate = () => {
        let image=proImageRef.value;
        let fname=fnameRef.value;
        let lname=lnameRef.value;
        let mobile=mobileRef.value;
        let email= emailRef.value;
        let password=passwordRef.value;
        let Cpassword=CpasswordRef.value;

        if(!password===Cpassword){
            ErrorToast("Password And Conform Password Not Match !")
        }
        else{
            ProfileUpdateRequest(id,image,email,fname,lname,mobile,password,Cpassword).then((result)=>{
                if(result===true){
                    navigate("/");
                }
            })
        }
    }

    


  return (
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <img
                            //   ref={showProImage}
                              className="icon-nav-img-lg"
                              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                              alt=""/>
                            <hr/>
                            <div className="row">
                              <div className="col-4 p-2">
                                  <label>Photo</label>
                                  <input ref={(input)=>proImageRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>First Name</label>
                                  <input ref={(input)=>fnameRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Last Name</label>
                                  <input ref={(input)=>lnameRef=input}  placeholder="Mobile Number" className="form-control animated fadeInUp" type="text"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Mobile</label>
                                  <input ref={(input)=>mobileRef=input}  placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Email</label>
                                  <input ref={(input)=>emailRef=input}  placeholder="Mobile" className="form-control animated fadeInUp" type="email"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Password</label>
                                  <input ref={(input)=>passwordRef=input}  placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                              </div>

                              <div className="col-4 p-2">
                                  <label>C-Password</label>
                                  <input ref={(input)=>CpasswordRef=input}  placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                              </div>
                              <div className="col-8 p-2 mt-3">
                                  <button onClick={OnUpdate}  className="btn form-control float-end animated fadeInUp profileBttn"> Update</button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RenterProfile
