import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlinePullRequest } from 'react-icons/ai';
import '../../Assets/Styles/BookingRequest.css';
import { ReadBookingRequestByEmail, ReadDataById } from '../../API Request/APIRequest';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';
import { AiFillPrinter } from 'react-icons/ai';
import jsPDF from 'jspdf';

const BookingRequest = () => {
  const [BookingData, setBookingData] = useState([]);
  const [singleProperties, setSingleProperties] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  let RenterEmail = getRenterDetails()['Email'];

  const GetBookingRequestData = useCallback(() => {
    ReadBookingRequestByEmail(RenterEmail).then((result) => {
      setBookingData(result);
    });
  }, [RenterEmail]);

  useEffect(() => {
    GetBookingRequestData();
  }, [GetBookingRequestData]);

  const PickSingleData = useCallback((propertiesId, userName, userMobile, userEmail, userNid) => {
    console.log(userName + userMobile + userEmail + userNid);
    ReadDataById(propertiesId)
      .then((data) => {
        setSingleProperties(data[0]);
        setSelectedUser({ userName, userMobile, userEmail, userNid });
      })
      .catch((error) => {
        console.error('Error fetching single property:', error);
      });
  }, []);

  const pdfRef = useRef();

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Add the data to the PDF
    doc.text('RENT CORNER', 90, 10);
    doc.text('BOOKING SUMMARY__', 10, 20);
    doc.text('Renter Email: ' + RenterEmail, 10, 30);

    if (selectedUser) {
      const { userName, userMobile, userEmail, userNid } = selectedUser;

      doc.text('User Details__', 10, 50);
      doc.text('USER NAME: ' + userName, 10, 60);
      doc.text('EMAIL: ' + userEmail, 10, 70);
      doc.text('PHONE: ' + userMobile, 10, 80);
      doc.text('NID: ' + userNid, 10, 90);
    }

    if (singleProperties) {
      const fields = [
        { label: 'Category', value: singleProperties.Category },
        { label: 'House Name', value: singleProperties.HouseName },
        { label: 'House Number', value: singleProperties.HouseNumber },
        { label: 'Unit Number', value: singleProperties.UnitNumber },
        { label: 'Level Number', value: singleProperties.LevelNumber },
        { label: 'Units Per Level', value: singleProperties.UnitsPerLevel },
        { label: 'Apartment Price', value: singleProperties.ApartmentPrice },
        { label: 'Unit Price', value: singleProperties.UnitPrice },
        { label: 'Unit Rent Price', value: singleProperties.UnitRentPrice },
        { label: 'Room Rent Price', value: singleProperties.RoomRentPrice },
        { label: 'District', value: singleProperties.District },
        { label: 'Thana', value: singleProperties.Thana },
        { label: 'ZipCode', value: singleProperties.ZipCode },
        { label: 'Address', value: singleProperties.Address },
        { label: 'Road Number', value: singleProperties.RoadNumber },
      ];

      let yPos = 110; // Initial Y position

      fields.forEach((field) => {
        const { label, value } = field;
        if (value) {
          doc.text(`${label}: ${value}`, 10, yPos);
          yPos += 10;
        }
      });
    }

    doc.save('booking_summary.pdf');
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card shadow posterWrapper animated flipInX mt-3'>
              <div className='row'>
                <div className='col-sm-3'>
                  <h4>
                    <AiOutlinePullRequest />
                  </h4>
                </div>
                <div className='col-sm-9'>
                  <h4>Request's [{BookingData.length}]!</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            {BookingData.map((value, key) => (
              <div
                onClick={() =>
                  PickSingleData(value.propertiesId, value.userName, value.userMobile, value.userEmail, value.userNid)
                }
                className='requestWrapper card shadow p-3 mb-3 animated fadeInUp'
                key={key}
              >
                <div className='userContentWrapper align-items-center hvr-rotate'>
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
                  <p className='pb-2 mt-1'>
                    <b>EMAIL:</b>{' '}
                    <span className='float-end'>
                      <a href={`mailto:${value?.userEmail}`}>{value?.userEmail}</a>
                    </span>
                  </p>
                  <p className='pb-2'>
                    <b>PHONE:</b>{' '}
                    <span className='float-end'>
                      <a href={`tel:${value?.userMobile}`}>{value?.userMobile}</a>
                    </span>
                  </p>
                  <p className='pb-2'>
                    <b>NID:</b> <span className='float-end'>{value?.userNid}</span>
                  </p>
                  <p className='pb-1'>
                    <b>CATEGORY:</b> <span className='float-end'>{value?.category}</span>
                  </p>
                  <p className='pb-1'>
                    <i className='requestDateTime'>{formatDate(new Date(value.createdDate))}</i>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Now paste Data */}
          <div className='col-md-4'>
            <div className='roomContentWrapper card shadow p-3 ' ref={pdfRef}>
              <p className='roomDetails border-bottom text-center'>Details</p>
              {RenterEmail && (
                <p className='pb-2 mt-1'>
                  <b>RenterEmail:</b> <span className='float-end'>{RenterEmail}</span>
                </p>
              )}
              {singleProperties[0]?.Category && (
                    <p className="pb-2"><b>Category:</b> <span className="float-end">{singleProperties[0]?.Category}</span></p>
                )}
                {singleProperties[0]?.HouseName && (
                    <p className="pb-2"><b>HouseName:</b> <span className="float-end">{singleProperties[0]?.HouseName}</span></p>
                )}
                {singleProperties[0]?.HouseNumber && (
                    <p className="pb-1"><b>HouseNumber:</b> <span className="float-end">{singleProperties[0]?.HouseNumber}</span></p>
                )}
                {singleProperties[0]?.UnitNumber && (
                    <p className="pb-2"><b>UnitNumber:</b> <span className="float-end">{singleProperties[0]?.UnitNumber}</span></p>
                )}
                {singleProperties[0]?.LevelNumber && (
                    <p className="pb-2"><b>LevelNumber:</b> <span className="float-end">{singleProperties[0]?.LevelNumber}</span></p>
                )}
                {singleProperties[0]?.UnitsPerLevel && (
                    <p className="pb-1"><b>UnitsPerLevel:</b> <span className="float-end">{singleProperties[0]?.UnitsPerLevel}</span></p>
                )}
                {singleProperties[0]?.AppartmentPrice && (
                    <p className="pb-2"><b>AppartmentPrice:</b> <span className="float-end">{singleProperties[0]?.AppartmentPrice}</span></p>
                )}
                {singleProperties[0]?.UnitPrice && (
                    <p className="pb-2"><b>UnitPrice:</b> <span className="float-end">{singleProperties[0]?.UnitPrice}</span></p>
                )}
                {singleProperties[0]?.UnitRentPrice && (
                    <p className="pb-1"><b>UnitRentPrice:</b> <span className="float-end">{singleProperties[0]?.UnitRentPrice}</span></p>
                )}
                {singleProperties[0]?.RoomRentPrice && (
                    <p className="pb-1"><b>RoomRentPrice:</b> <span className="float-end">{singleProperties[0]?.RoomRentPrice}</span></p>
                )}
                {singleProperties[0]?.Status && (
                    <p className="pb-1"><b>Status:</b> <span className="float-end">{singleProperties[0]?.Status}</span></p>
                )}
                {singleProperties[0]?.District && (
                    <p className="pb-1"><b>District:</b> <span className="float-end">{singleProperties[0]?.District}</span></p>
                )}
                {singleProperties[0]?.Thana && (
                    <p className="pb-1"><b>Thana:</b> <span className="float-end">{singleProperties[0]?.Thana}</span></p>
                )}
                {singleProperties[0]?.ZipCode && (
                    <p className="pb-1"><b>ZipCode:</b> <span className="float-end">{singleProperties[0]?.ZipCode}</span></p>
                )}
                {singleProperties[0]?.Address && (
                    <p className="pb-1"><b>Address:</b> <span className="float-end">{singleProperties[0]?.Address}</span></p>
                )}
                {singleProperties[0]?.RoadNumber && (
                    <p className="pb-1"><b>RoadNumber:</b> <span className="float-end">{singleProperties[0]?.RoadNumber}</span></p>
                )}
              <button className='printButton shadow' onClick={handlePrint}>
                Print <AiFillPrinter />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const formatDate = (date) => {
  const options = {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

export default BookingRequest;
