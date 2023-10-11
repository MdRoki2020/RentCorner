import React, { useEffect, useRef, useState } from 'react';
import { ErrorToast, SuccessToast } from '../../Helper/FormHelper';
import { useNavigate } from 'react-router-dom';
import { ProfileUpdateRequest, ReadRenterDetails } from '../../API Request/APIRequest';
import '../../Assets/Styles/RenterProfile.css';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';
import Zoom from 'react-medium-image-zoom';

const RenterProfile = () => {
  const renterEmail = getRenterDetails()['Email'];
  const navigate = useNavigate();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const CpasswordRef = useRef();

  const OnUpdate = () => {
    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    const Cpassword = CpasswordRef.current.value;

    if (password !== Cpassword) {
      ErrorToast("Password And Confirm Password Do Not Match!");
    } else {
      ProfileUpdateRequest(renterEmail, fname, lname, mobile, password, Cpassword)
        .then((result) => {
          if (result === true) {
            navigate("/RenterProfile");
            SuccessToast("Your Profile is Updated");
          }
        });
    }
  }

  const [RenterData, setRenterData] = useState({});

  const ReadRenterinfo = () => {
    ReadRenterDetails(renterEmail).then((data) => {
      if (data && data.length > 0) {
        setRenterData(data[0]); // Assuming data[0] contains the renter's profile
      }
    });
  };

  useEffect(() => {
    ReadRenterinfo();
  }, [renterEmail]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <div className="container-fluid">
                    
                    <Zoom>
                    <img
                    className="icon-nav-img-lg img-thumbnail img-fluid"
                    src={RenterData.imageUrl}
                    alt={RenterData.LastName}/>
                    </Zoom>

                    <hr/>
                    <div className="row">
                    <div className="col-4 p-2">
                        <label>First Name</label>
                        <input
                        ref={fnameRef}
                        defaultValue={RenterData.FirstName || ''}
                        placeholder="First Name"
                        className="form-control animated fadeInUp"
                        type="text"
                    />
                    </div>
                    <div className="col-4 p-2">
                        <label>Last Name</label>
                        <input
                        ref={lnameRef}
                        defaultValue={RenterData.LastName || ''}
                        placeholder="Last Name"
                        className="form-control animated fadeInUp"
                        type="text"
                    />
                    </div>
                    <div className="col-4 p-2">
                        <label>Mobile</label>
                        <input
                        ref={mobileRef}
                        defaultValue={RenterData.Mobile || ''}
                        placeholder="Mobile"
                        className="form-control animated fadeInUp"
                        type="text"
                    />                    
                    </div>
                    <div className="col-4 p-2">
                    <label>Email</label>
                        <input
                        defaultValue={renterEmail}
                        disabled
                        placeholder="Email"
                        className="form-control animated fadeInUp"
                        type="email"
                    />                    
                    </div>
                    <div className="col-4 p-2">
                        <label>Password</label>
                        <input
                        ref={passwordRef}
                        defaultValue={RenterData.Password || ''}
                        placeholder="Password"
                        className="form-control animated fadeInUp"
                        type="password"
                        />                    
                    </div>

                    <div className="col-4 p-2">
                        <label>C-Password</label>
                        <input
                        ref={CpasswordRef}
                        defaultValue={RenterData.ConformPassword || ''}
                        placeholder="Confirm Password"
                        className="form-control animated fadeInUp"
                        type="password"
                    />                    
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
  );
}

export default RenterProfile;
