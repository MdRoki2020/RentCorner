import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {AiOutlinePullRequest} from "react-icons/ai";
import '../../Assets/Styles/BookingRequest.css'
import { ReadBookingRequestByEmail } from '../../API Request/APIRequest';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';


const BookingRequest = () => {

    const [BookingData,setBookingData]=useState([]);
    // const [PropertiesData,setPropertiesData]=useState("");

    let RenterEmail=getRenterDetails()['Email'];


    const GetBookingRequestData = useCallback(() => {
        ReadBookingRequestByEmail(RenterEmail).then((result) => {
          setBookingData(result);
        });
      }, [RenterEmail]);

    //   let propertiesId= data[0]?.propertiesId;


    //   const GetPropertiesData = useCallback(() => {
    //     AllPropertiesList(propertiesId).then((result) => {
    //       setPropertiesData(result);
    //     });
    //   }, [propertiesId]);

      
      useEffect(() => {
        GetBookingRequestData();
    }, [GetBookingRequestData]);

      

    const PickSingleData=(propertiesId)=>{
        console.log(propertiesId);
    }



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
                        <h4>Request' s [{BookingData.length}]!</h4>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    
                    {
                        BookingData.map((value, key) => (
                            <div onClick={PickSingleData.bind(this,value.propertiesId)} className='requestWrapper card shadow p-3 mb-3' key={key}>
                                <div className='userContentWrapper align-items-center'>
                                <div className='userImage border-bottom pb-1'>
                                    <img
                                    src={value.userimageUrl}
                                    alt='userImage'
                                    className='img-fluid img-thumbnail rounded'
                                    width='40'
                                    height='40'
                                    />
                                    <span className='float-end'>{value?.userName}</span>
                                </div>
                                <p className="pb-2 mt-1">
                                <b>EMAIL:</b>{" "}
                                <span className="float-end">
                                    <a href={`mailto:${value?.userEmail}`}>{value?.userEmail}</a>
                                </span>
                                </p>       

                                <p className="pb-2">
                                <b>PHONE:</b>{" "}
                                <span className="float-end">
                                    <a href={`tel:${value?.userMobile}`}>{value?.userMobile}</a>
                                </span>
                                </p>
                                <p className="pb-2"><b>NID:</b> <span className="float-end">{value?.userNid}</span></p>
                                <p className="pb-1"><b>CATEGORY:</b> <span className="float-end">{value?.category}</span></p>

                                </div>
                            </div>
                        ))
                    }
                    </div>

                {/* <div className='col-md-4'>
                    <div className='roomContentWrapper card shadow p-3'>
                    <p className='roomDetails border-bottom text-center'>Details</p>
                    {RenterEmail && (
                        <p className="pb-2 mt-1"><b>RenterEmail:</b> <span className="float-end">{RenterEmail}</span></p>
                    )}
                    {PropertiesData[0]?.Category && (
                        <p className="pb-2"><b>Category:</b> <span className="float-end">{PropertiesData[0]?.Category}</span></p>
                    )}
                    {PropertiesData[0]?.HouseName && (
                        <p className="pb-2"><b>HouseName:</b> <span className="float-end">{PropertiesData[0]?.HouseName}</span></p>
                    )}
                    {PropertiesData[0]?.HouseNumber && (
                        <p className="pb-1"><b>HouseNumber:</b> <span className="float-end">{PropertiesData[0]?.HouseNumber}</span></p>
                    )}
                    {PropertiesData[0]?.UnitNumber && (
                        <p className="pb-2"><b>UnitNumber:</b> <span className="float-end">{PropertiesData[0]?.UnitNumber}</span></p>
                    )}
                    {PropertiesData[0]?.LevelNumber && (
                        <p className="pb-2"><b>LevelNumber:</b> <span className="float-end">{PropertiesData[0]?.LevelNumber}</span></p>
                    )}
                    {PropertiesData[0]?.UnitsPerLevel && (
                        <p className="pb-1"><b>UnitsPerLevel:</b> <span className="float-end">{PropertiesData[0]?.UnitsPerLevel}</span></p>
                    )}
                    {PropertiesData[0]?.AppartmentPrice && (
                        <p className="pb-2"><b>AppartmentPrice:</b> <span className="float-end">{PropertiesData[0]?.AppartmentPrice}</span></p>
                    )}
                    {PropertiesData[0]?.UnitPrice && (
                        <p className="pb-2"><b>UnitPrice:</b> <span className="float-end">{PropertiesData[0]?.UnitPrice}</span></p>
                    )}
                    {PropertiesData[0]?.UnitRentPrice && (
                        <p className="pb-1"><b>UnitRentPrice:</b> <span className="float-end">{PropertiesData[0]?.UnitRentPrice}</span></p>
                    )}
                    {PropertiesData[0]?.RoomRentPrice && (
                        <p className="pb-1"><b>RoomRentPrice:</b> <span className="float-end">{PropertiesData[0]?.RoomRentPrice}</span></p>
                    )}
                    {PropertiesData[0]?.Status && (
                        <p className="pb-1"><b>Status:</b> <span className="float-end">{PropertiesData[0]?.Status}</span></p>
                    )}
                    {PropertiesData[0]?.District && (
                        <p className="pb-1"><b>District:</b> <span className="float-end">{PropertiesData[0]?.District}</span></p>
                    )}
                    {PropertiesData[0]?.Thana && (
                        <p className="pb-1"><b>Thana:</b> <span className="float-end">{PropertiesData[0]?.Thana}</span></p>
                    )}
                    {PropertiesData[0]?.ZipCode && (
                        <p className="pb-1"><b>ZipCode:</b> <span className="float-end">{PropertiesData[0]?.ZipCode}</span></p>
                    )}
                    {PropertiesData[0]?.Address && (
                        <p className="pb-1"><b>Address:</b> <span className="float-end">{PropertiesData[0]?.Address}</span></p>
                    )}
                    {PropertiesData[0]?.RoadNumber && (
                        <p className="pb-1"><b>RoadNumber:</b> <span className="float-end">{PropertiesData[0]?.RoadNumber}</span></p>
                    )}
                    </div>
                </div> */}
            </div>
        </div>
    </Fragment>
  )
}

export default BookingRequest
