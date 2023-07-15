import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AiFillFilePdf, AiOutlinePullRequest } from 'react-icons/ai';
import '../../Assets/Styles/BookingRequest.css';
import { ReadBookingRequestByEmail, ReadDataById } from '../../API Request/APIRequest';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';
import Footer from '../Users/Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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


  
  const handlePdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    const addWatermark = () => {
      const watermarkText = 'CONFORM';
      const watermarkFontSize = 40;
      const watermarkColor = [255, 87, 34]; // Orange color
      const watermarkOpacity = 0.3; // Watermark opacity (0 to 1)
  
      const textWidth = doc.getStringUnitWidth(watermarkText) * watermarkFontSize * 0.35; // Approximate width of the rotated text
      const textHeight = watermarkFontSize; // Height of the rotated text
      const x = 40; // X position for the watermark (adjusted to the left)
      const y = (pageHeight - textHeight) / 4; // Y position for the watermark (increased position)
  
      const fillColor = watermarkColor.concat(watermarkOpacity); // Add opacity to the color
  
      doc.setTextColor(...watermarkColor);
      doc.setFontSize(watermarkFontSize);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(...fillColor); // Set fill color with opacity
      doc.textWithLink(watermarkText, x, y, {
        angle: 45,
        url: 'https://example.com',
        underline: false, // Disable underline for the link
      });
  
      doc.setFillColor(0, 0, 0); // Reset fill color to default
    };
  
    // Add the data to the PDF
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#1E88E5');
    doc.setFontSize(20);
    doc.text('RENT CORNER', pageWidth / 2, 20, { align: 'center' });
  
    doc.setTextColor('#000000');
    doc.setFontSize(14);
    doc.text('BOOKING SUMMARY', 10, 40);
  
    if (selectedUser) {
      const { userName, userMobile, userEmail, userNid } = selectedUser;
  
      doc.setTextColor('#000000');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('User Details', 10, 70);
  
      const userFields = [
        { label: 'User Name', value: userName },
        { label: 'Email', value: userEmail },
        { label: 'Phone', value: userMobile },
        { label: 'NID', value: userNid },
      ];
  
      const filteredUserFields = userFields.filter(
        (field) => field.value !== null && field.value !== undefined && field.value !== ''
      );
  
      if (filteredUserFields.length > 0) {
        doc.autoTable({
          startY: 75,
          head: [['Label', 'Value']],
          body: filteredUserFields.map(({ label, value }) => [label, value.toString()]),
          theme: 'grid',
          styles: {
            cellPadding: { top: 4, right: 2, bottom: 4, left: 2 },
            fontSize: 10,
            fontStyle: 'normal',
            lineColor: '#000000',
            lineWidth: 0.2,
            fillColor: [255, 255, 255],
          },
          headStyles: {
            fillColor: [230, 230, 230],
            fontStyle: 'bold',
            textColor: '#000000',
            lineWidth: 0.2,
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
        });
      }
    }
  
    if (singleProperties) {
      const fields = [
        { label: 'Renter Email', value: singleProperties?.RenterEmail },
        { label: 'Category', value: singleProperties?.Category },
        { label: 'House Name', value: singleProperties?.HouseName },
        { label: 'House Number', value: singleProperties?.HouseNumber },
        { label: 'Unit Number', value: singleProperties?.UnitNumber },
        { label: 'Level Number', value: singleProperties?.LevelNumber },
        { label: 'Units Per Level', value: singleProperties?.UnitsPerLevel },
        { label: 'Apartment Price', value: singleProperties?.ApartmentPrice },
        { label: 'Unit Price', value: singleProperties?.UnitPrice },
        { label: 'Unit Rent Price', value: singleProperties?.UnitRentPrice },
        { label: 'Room Rent Price', value: singleProperties?.RoomRentPrice },
        { label: 'District', value: singleProperties?.District },
        { label: 'Thana', value: singleProperties?.Thana },
        { label: 'ZipCode', value: singleProperties?.ZipCode },
        { label: 'Address', value: singleProperties?.Address },
        { label: 'Road Number', value: singleProperties?.RoadNumber },
      ];
  
      doc.setTextColor('#000000');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Property Details', 10, 170);
  
      const filteredFields = fields.filter(
        (field) => field.value !== null && field.value !== undefined && field.value !== ''
      );
  
      if (filteredFields.length > 0) {
        doc.autoTable({
          startY: 175,
          head: [['Label', 'Value']],
          body: filteredFields.map(({ label, value }) => [label, value.toString()]),
          theme: 'grid',
          styles: {
            cellPadding: { top: 4, right: 2, bottom: 4, left: 2 },
            fontSize: 10,
            fontStyle: 'normal',
            lineColor: '#000000',
            lineWidth: 0.2,
            fillColor: [255, 255, 255],
          },
          headStyles: {
            fillColor: [230, 230, 230],
            fontStyle: 'bold',
            textColor: '#000000',
            lineWidth: 0.2,
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
        });
      }
    }
  
    addWatermark(); // Add watermark
  
    // Add additional rules
    doc.setTextColor('#1E88E5');
    doc.setFontSize(10);
    doc.text('Once you book properties, it cannot be canceled.', 10, pageHeight - 20);
    doc.text(
      'RENT CORNER is the first dedicated rental portal and startup in Bangladesh, founded in 2023.',
      10,
      pageHeight - 10
    );
  
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
            <div className='mainWrapper'>
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
              {singleProperties && singleProperties && (
                <>
                  {singleProperties.Category && (
                    <p className="pb-2"><b>Category:</b> <span className="float-end">{singleProperties.Category}</span></p>
                  )}
                  {singleProperties.HouseName && (
                    <p className="pb-2"><b>HouseName:</b> <span className="float-end">{singleProperties.HouseName}</span></p>
                  )}
                  {singleProperties.HouseNumber && (
                    <p className="pb-1"><b>HouseNumber:</b> <span className="float-end">{singleProperties.HouseNumber}</span></p>
                  )}
                  {singleProperties.UnitNumber && (
                    <p className="pb-2"><b>UnitNumber:</b> <span className="float-end">{singleProperties.UnitNumber}</span></p>
                  )}
                  {singleProperties.LevelNumber && (
                    <p className="pb-2"><b>LevelNumber:</b> <span className="float-end">{singleProperties.LevelNumber}</span></p>
                  )}
                  {singleProperties.UnitsPerLevel && (
                    <p className="pb-1"><b>UnitsPerLevel:</b> <span className="float-end">{singleProperties.UnitsPerLevel}</span></p>
                  )}
                  {singleProperties.AppartmentPrice && (
                    <p className="pb-2"><b>AppartmentPrice:</b> <span className="float-end">{singleProperties.AppartmentPrice}</span></p>
                  )}
                  {singleProperties.UnitPrice && (
                    <p className="pb-2"><b>UnitPrice:</b> <span className="float-end">{singleProperties.UnitPrice}</span></p>
                  )}
                  {singleProperties.UnitRentPrice && (
                    <p className="pb-1"><b>UnitRentPrice:</b> <span className="float-end">{singleProperties.UnitRentPrice}</span></p>
                  )}
                  {singleProperties.RoomRentPrice && (
                    <p className="pb-1"><b>RoomRentPrice:</b> <span className="float-end">{singleProperties.RoomRentPrice}</span></p>
                  )}
                  {singleProperties.Status && (
                    <p className="pb-1"><b>Status:</b> <span className="float-end">{singleProperties.Status}</span></p>
                  )}
                  {singleProperties.District && (
                    <p className="pb-1"><b>District:</b> <span className="float-end">{singleProperties.District}</span></p>
                  )}
                  {singleProperties.Thana && (
                    <p className="pb-1"><b>Thana:</b> <span className="float-end">{singleProperties.Thana}</span></p>
                  )}
                  {singleProperties.ZipCode && (
                    <p className="pb-1"><b>ZipCode:</b> <span className="float-end">{singleProperties.ZipCode}</span></p>
                  )}
                  {singleProperties.Address && (
                    <p className="pb-1"><b>Address:</b> <span className="float-end">{singleProperties.Address}</span></p>
                  )}
                  {singleProperties.RoadNumber && (
                    <p className="pb-1"><b>RoadNumber:</b> <span className="float-end">{singleProperties.RoadNumber}</span></p>
                  )}
                </>
              )}
              <button className='printButton shadow' onClick={handlePdf}>
                Make PDF <AiFillFilePdf />
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <Footer/>
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
