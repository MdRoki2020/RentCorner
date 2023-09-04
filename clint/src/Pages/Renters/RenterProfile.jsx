import React, { useEffect, useRef, useState } from 'react'
import { ErrorToast, SuccessToast} from '../../Helper/FormHelper';
import { useNavigate } from 'react-router-dom';
import { ProfileUpdateRequest, ReadRenterDetails } from '../../API Request/APIRequest';
import '../../Assets/Styles/RenterProfile.css'
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';

const RenterProfile = () => {

    let renterEmail = getRenterDetails()['Email'];
    let navigate=useNavigate();
    const id="d347fd63vd63dv23eedv";

    let proImageRef,fnameRef,lnameRef,mobileRef,passwordRef,CpasswordRef=useRef();


    const OnUpdate = () => {
        let image=proImageRef.value;
        let fname=fnameRef.value;
        let lname=lnameRef.value;
        let mobile=mobileRef.value;
        let password=passwordRef.value;
        let Cpassword=CpasswordRef.value;

        if (password !== Cpassword) {
            ErrorToast("Password And Confirm Password Do Not Match!");
        }
        else{
            ProfileUpdateRequest(image,renterEmail,fname,lname,mobile,password,Cpassword).then((result)=>{
                if(result===true){
                    navigate("/RenterProfile");
                    SuccessToast("Your Date is Updated");
                }
            })
        }
    }

    
    const [RenterData,setRenterData] = useState([]);

    const ReadRenterinfo= () => {
        ReadRenterDetails(renterEmail).then(data => {
          setRenterData(data);
        });
      }
      useEffect(() => {
        ReadRenterinfo();
      }, []);

      console.log(RenterData);

    


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
                              src={RenterData.imageUrl}
                              alt={RenterData.LastName}/>
                            <hr/>
                            <div className="row">
                              <div className="col-4 p-2">
                                  <label>Photo</label>
                                  <input ref={(input)=>proImageRef=input} defaultValue={RenterData.imageUrl}  placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>First Name</label>
                                  <input ref={(input)=>fnameRef=input} defaultValue={RenterData.FirstName}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Last Name</label>
                                  <input ref={(input)=>lnameRef=input} defaultValue={RenterData.LastName}  placeholder="Mobile Number" className="form-control animated fadeInUp" type="text"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Mobile</label>
                                  <input ref={(input)=>mobileRef=input} defaultValue={RenterData.Mobile}  placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Email</label>
                                  <input defaultValue={renterEmail} disabled  placeholder="Mobile" className="form-control animated fadeInUp" type="email"/>
                              </div>
                              <div className="col-4 p-2">
                                  <label>Password</label>
                                  <input ref={(input)=>passwordRef=input} defaultValue={RenterData.Password}  placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                              </div>

                              <div className="col-4 p-2">
                                  <label>C-Password</label>
                                  <input ref={(input)=>CpasswordRef=input} defaultValue={RenterData.ConformPassword}  placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
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
