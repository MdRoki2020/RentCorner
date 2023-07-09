import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {AiOutlinePullRequest} from "react-icons/ai";
import '../../Assets/Styles/BookingRequest.css'
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';
import { ReadBookingRequestByEmail } from '../../API Request/APIRequest';


const BookingRequest = () => {

    const [data,setData]=useState("");

    let RenterEmail=getRenterDetails()['Email'];


    const GetData = useCallback(() => {
        ReadBookingRequestByEmail(RenterEmail).then((result) => {
          setData(result);
        });
      }, [RenterEmail]);
      
      useEffect(() => {
        GetData();
      }, [GetData]);



  return (
    <Fragment>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card shadow posterWrapper animated flipInX mt-3'>
                        <div className='row'>
                        <div className='col-sm-3'>
                        <h4><AiOutlinePullRequest/></h4>
                        </div>
                        <div className='col-sm-9'>
                        <h4>Request' s !</h4>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='requestWrapper card shadow p-3'>
                        <div className='userContentWrapper align-items-center'>
                        <div className='userImage border-bottom pb-1'>
                            <img
                            src={data[0]?.userimageUrl}
                            alt='userImage'
                            className='img-fluid img-thumbnail rounded'
                            width='40'
                            height='40'
                            />
                            <span className='float-end'>{data[0]?.userName}</span>
                        </div>
                        <p className="pb-2 mt-1">
                        <b>EMAIL:</b>{" "}
                        <span className="float-end">
                            <a href={`mailto:${data[0]?.userEmail}`}>{data[0]?.userEmail}</a>
                        </span>
                        </p>       

                        <p className="pb-2">
                        <b>PHONE:</b>{" "}
                        <span className="float-end">
                            <a href={`tel:${data[0]?.userMobile}`}>{data[0]?.userMobile}</a>
                        </span>
                        </p>
                        <p className="pb-2"><b>NID:</b> <span className="float-end">{data[0]?.userNid}</span></p>
                        <p className="pb-1"><b>CATEGORY:</b> <span className="float-end">{data[0]?.category}</span></p>


                        </div>
                    </div>
                    </div>

                <div className='col-md-4'>

                    <div className='roomContentWrapper card shadow p-3'>
                            <p className='roomDetails border-bottom text-center'>Details</p>                            
                            <p className="pb-2 mt-1"><b>RenterEmail:</b> <span className="float-end">mroki815@gmail.com</span></p>
                            <p className="pb-2"><b>Category</b> <span className="float-end">01957893554</span></p>
                            <p className="pb-2"><b>HouseName:</b> <span className="float-end">8778978989723</span></p>
                            <p className="pb-1"><b>HouseNumber:</b> <span className="float-end">single</span></p>
                            <p className="pb-2"><b>UnitNumber</b> <span className="float-end">01957893554</span></p>
                            <p className="pb-2"><b>LevelNumber:</b> <span className="float-end">8778978989723</span></p>
                            <p className="pb-1"><b>UnitsPerLevel:</b> <span className="float-end">single</span></p>
                            <p className="pb-2"><b>AppartmentPrice</b> <span className="float-end">01957893554</span></p>
                            <p className="pb-2"><b>UnitPrice:</b> <span className="float-end">8778978989723</span></p>
                            <p className="pb-1"><b>UnitRentPrice:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>RoomRentPrice:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>Status:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>District:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>Thana:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>ZipCode:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>Address:</b> <span className="float-end">single</span></p>
                            <p className="pb-1"><b>RoadNumber:</b> <span className="float-end">single</span></p>

                        </div>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default BookingRequest
