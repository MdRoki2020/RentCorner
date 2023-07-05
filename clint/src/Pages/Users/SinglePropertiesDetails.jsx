import React, { Fragment, useEffect, useRef, useState } from 'react';
import { TbDetails } from 'react-icons/tb';
import { GiEmptyHourglass } from "react-icons/gi";
import { BsCartPlus } from "react-icons/bs";
import { CreateCommentRequest, ReadCommentsById, ReadDataById, RelatedProduct, RequestForBooking } from '../../API Request/APIRequest';
import { Link, useParams } from 'react-router-dom';
import '../../Assets/Styles/singlePropertiesDetails.css';
import ReactImageMagnify from 'react-image-magnify';
import { Pannellum } from 'pannellum-react';
import { Badge, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { AiOutlineCheckCircle,AiOutlineRotateRight,AiOutlineSketch,AiOutlineSend } from "react-icons/ai";
import Footer from './Footer';
import { ErrorToast, IsEmpty, SuccessToast } from '../../Helper/FormHelper';
import { ToastErrorToast, ToastSuccessToast } from '../../Helper/FormHelper2';
import { getUserDetails } from '../../Helper/SessionHelperUser';

const SinglePropertiesDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    ReadDataById(id).then((data) => {
      setData(data);
    });
  }, [id]);

  let firstImage = data[0]?.Images[0]?.imageUrl;
  let secondImage = data[0]?.Images[1]?.imageUrl;
  let thirdImage = data[0]?.Images[2]?.imageUrl;
  let dynamicImage = data[0]?.DynamicImage;

  useEffect(() => {
    setMainImage(firstImage);
  }, [firstImage]);



  //for comment
  let CommentRef=useRef();
  const OnComment=()=>{
    let comment=CommentRef.value;

    if(IsEmpty(comment)){
      ToastErrorToast("Please Write Comment");
    }else{
      SuccessToast("Please Wait...");
      CreateCommentRequest(id,comment).then((result)=>{

    if(result===true){
      CommentRef.value="";
      GetData();
      ToastSuccessToast("Comment Successfully Added");
    }
    else{
      ErrorToast('Something Went Wrong');
      console.log('something went wrong');
    }
    })
    }
  }



  const [Comment,setComment]=useState([]);
  const [pageNumber,setPageNumber]=useState(0);

  const usersPerPage=6;
  const pagesVisited=pageNumber * usersPerPage
  const displayComments=Comment.slice(pagesVisited,pagesVisited+usersPerPage)
  const pageCount=Math.ceil(Comment.length / usersPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };



  const GetData=()=>{
    ReadCommentsById(id).then((data)=>{
      setComment(data);
      })
  }

  useEffect(()=>{
    GetData();
  },[GetData])

  

      // let singlePropertiesId = data[0] ? data[0]._id : null;
      let category = data[0] ? data[0].Category : null;

    // fetch user details from local storage
    const BookingRequest = () => {
      let userDetails = getUserDetails();
      let userEmail = userDetails ? userDetails['Email'] : null;
      let userMobile = userDetails ? userDetails['Mobile'] : null;
      let userNid = userDetails ? userDetails['Nid'] : null;
      let userimageUrl = userDetails ? userDetails['imageUrl'] : null;
      let singlePropertiesId = data[0] ? data[0]._id : null;
      let category = data[0] ? data[0].Category : null;
    
      if (!userEmail || !userMobile || !userNid || !userimageUrl || !singlePropertiesId || !category) {
        if (!toastDisplayed) {
          setToastDisplayed(true);
          ToastErrorToast("You Need To Login First");
        }
      } else {
        Swal.fire({
          title: 'Confirmation',
          text: 'Are You Sure To Send Booking Request ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sure',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            
            RequestForBooking(singlePropertiesId,userEmail,userMobile,userNid,userimageUrl,category).then((result)=>{
        
              if(result===true){
                ToastSuccessToast("Request Has Been Send");
              }
              else{
              ToastErrorToast('Something Went Wrong');
              console.log('something went wrong');
              }
            })

          }
        });
      }
    };


  //for related produdct
  const [propertiesPageNumber,setPropertiesPageNumber]=useState(0);
  const [propertiesSingle,setpropertiesSingle]=useState([]);

  const propertiesPerPage=12;
  const propertiespagesVisited=propertiesPageNumber * propertiesPerPage;
  const displayProperties = propertiesSingle.slice(propertiespagesVisited, propertiespagesVisited + propertiesPerPage);
  const propertiespageCount=Math.ceil(propertiesSingle.length / propertiesPerPage);
  const propertieschangePage=({selected})=>{
    setPropertiesPageNumber(selected);
  };

  useEffect(() => {
    RelatedProduct(category).then((result) => {
      setpropertiesSingle(result);
    });
  }, [category]);



  return (
    <Fragment>
      <div className="container">
        <div className='row'>
        <div className='col-md-12'>
            <div className='card CategoriesPosterWrapper animated flipInX my-4'>
            <div className='row'>
                <div className='col-sm-2'>
                <h2 className="mt-3 mx-3">
                <TbDetails />
                </h2>
                </div>
                <div className='col-sm-10'>
                <div className='posterText'>
                <h2>Details</h2>
                <p>Single Properties Details</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

      <div className="row">
        <div className="col-md-4">
          <div className="product-image-viewer">
            <div className="main-image-viewer img-fluid">
              {mainImage && (
                <ReactImageMagnify
                {...{
                    smallImage: {
                    alt: 'productImage',
                    isFluidWidth: true,
                    src: mainImage,
                    },
                    largeImage: {
                    alt: 'productImage',
                    src: mainImage,
                    width: 1200,
                    height: 1800,
                    },
                    style: {
                    zIndex: 9999,
                    },
                }}
                />
              )}
              </div>
          </div>
        </div>
        <div className="col-md-2">
        <div className="small-image-viewers">
          <img
            className="img-fluid img-thumbnail mb-3"
            src={firstImage}
            alt="First item"
            onClick={() => handleImageClick(firstImage)}
          />
          <img
            className="img-fluid img-thumbnail mb-3"
            src={secondImage}
            alt="Second item"
            onClick={() => handleImageClick(secondImage)}
          />
          <img
            className="img-fluid img-thumbnail mb-3"
            src={thirdImage}
            alt="Third item"
            onClick={() => handleImageClick(thirdImage)}
          />
          {/* Add more small images here */}
        </div>

        </div>
        <div className="col-md-6">
        <Pannellum
            width="100%"
            height="400px"
            image={dynamicImage}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            autoRotate={20}
            onLoad={() => {
            console.log("panorama loaded");
            }}
        />
        </div>
      </div>

      <div className='description'>
        <div className='row'>
          <div className='col-md-8'>
            <Badge bg="danger my-3">
            Description
            </Badge>
            <div className='card sightWrapper bg-light px-2 py-2 mb-3'>
            <div className="row">
              <div className="col-md-6">
                {data[0]?.HouseName && (
                  <p className="border-bottom pb-2">
                    <b>HouseName:</b> <span className="float-end">{data[0]?.HouseName}</span>
                  </p>
                )}
                {data[0]?.HouseNumber && (
                  <p className="border-bottom pb-2">
                    <b>HouseNumber:</b> <span className="float-end">{data[0]?.HouseNumber}</span>
                  </p>
                )}
                {data[0]?.UnitNumber && (
                  <p className="border-bottom pb-2">
                    <b>UnitNumber:</b> <span className="float-end">{data[0]?.UnitNumber}</span>
                  </p>
                )}
                {data[0]?.LevelNumber && (
                  <p className="border-bottom pb-2">
                    <b>LevelNumber:</b> <span className="float-end">{data[0]?.LevelNumber}</span>
                  </p>
                )}
                {data[0]?.UnitsPerLevel && (
                  <p className="border-bottom pb-2">
                    <b>UnitsPerLevel:</b> <span className="float-end">{data[0]?.UnitsPerLevel}</span>
                  </p>
                )}
              </div>
              <div className="col-md-6">
                {data[0]?.Category && (
                  <p className="border-bottom pb-2">
                    <b>Category:</b> <span className="float-end">{data[0]?.Category}</span>
                  </p>
                )}
                {data[0]?.AppartmentPrice && (
                  <p className="border-bottom pb-2">
                    <b>AppartmentPrice:</b> <span className="float-end">৳ {data[0]?.AppartmentPrice}</span>
                  </p>
                )}
                {data[0]?.UnitPrice && (
                  <p className="border-bottom pb-2">
                    <b>UnitPrice:</b> <span className="float-end">৳ {data[0]?.UnitPrice}</span>
                  </p>
                )}
                {data[0]?.LevelPrice && (
                  <p className="border-bottom pb-2">
                    <b>LevelPrice:</b> <span className="float-end">৳ {data[0]?.LevelPrice}</span>
                  </p>
                )}
                {data[0]?.UnitRentPrice && (
                  <p className="border-bottom pb-2">
                    <b>UnitRentPrice:</b> <span className="float-end">৳ {data[0]?.UnitRentPrice}</span>
                  </p>
                )}
                {data[0]?.RoomRentPrice && (
                  <p className="border-bottom pb-2">
                    <b>RoomRentPrice:</b> <span className="float-end">৳ {data[0]?.RoomRentPrice}</span>
                  </p>
                )}
              </div>
              {data[0]?.Features && (
                <p className="border-bottom pb-2">
                  <b>Features:</b> <span className="float-end">{data[0]?.Features}</span>
                </p>
              )}
            </div>

            </div>
          </div>
          <div className='col-md-4'>
            <div className='cartSubTotal'>
              <Badge bg="danger my-3">
              Cart SubTotal
              </Badge>
              <table className='subTotalTable table table-striped table-hover table-bordered table-responsive'>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>
                      {data[0]?.Category === 'singleRoom' && `৳ ${data[0]?.RoomRentPrice}`}
                      {data[0]?.Category === 'apartmentSell' && `৳ ${data[0]?.AppartmentPrice}`}
                      {data[0]?.Category === 'rentBachelor' && `৳ ${data[0]?.UnitRentPrice}`}
                      {data[0]?.Category === 'rentFamily' && `৳ ${data[0]?.UnitRentPrice}`}
                      {data[0]?.Category === 'sellUnit' && `৳ ${data[0]?.UnitPrice}`}
                      {data[0]?.Category === 'sellLevel' && `৳ ${data[0]?.LevelPrice}`}
                    </td>
                  </tr>
                  <tr>
                    <td>Application Cost</td>
                    <td>৳ 250</td>
                  </tr>
                  <tr>
                    <td><b>Total</b></td>
                    <td className='animated fadeInUp'>
                      {/* <b>৳ 900</b> */}
                      <b>{data[0]?.Category === 'singleRoom' && `৳ ${data[0]?.RoomRentPrice +250 }`}</b>
                      <b>{data[0]?.Category === 'apartmentSell' && `৳ ${data[0]?.AppartmentPrice +250}`}</b>
                      <b>{data[0]?.Category === 'rentBachelor' && `৳ ${data[0]?.UnitRentPrice +250}`}</b>
                      <b>{data[0]?.Category === 'rentFamily' && `৳ ${data[0]?.UnitRentPrice +250}`}</b>
                      <b>{data[0]?.Category === 'sellUnit' && `৳ ${data[0]?.UnitPrice +250}`}</b>
                      <b>{data[0]?.Category === 'sellLevel' && `৳ ${data[0]?.LevelPrice +250}`}</b>
                      </td>
                  </tr>
                </tbody>
              </table>

              <Button className='btn btn-primary form-control shadow' onClick={BookingRequest}><AiOutlineRotateRight/> Request For Booking</Button>
              <Button className='btn btn-info form-control shadow my-3'><AiOutlineSketch/> Added Fav List</Button>

            </div>
          </div>
        </div>

        <div className='addressInfo '>
          <div className='row'>
            <div className='col-md-8'>
              <Badge bg="danger mb-3">
              Address
              </Badge>
              <div className='sightWrapper card bg-light px-2 py-2 mb-3'>
                <div className='row'>
                  <div className='col-md-6'>
                    <p className="border-bottom pb-2"><b>District:</b> <span className="float-end">{data[0]?.District}</span></p>
                    <p className="border-bottom pb-2"><b>Thana:</b> <span className="float-end">{data[0]?.Thana}</span></p>
                    <p className="border-bottom pb-2"><b>ZipCode:</b> <span className="float-end">{data[0]?.ZipCode}</span></p>
                  </div>
                  <div className='col-md-6'>
                    <p className="border-bottom pb-2"><b>Address:</b> <span className="float-end">{data[0]?.Address}</span></p>
                    <p className="border-bottom pb-2"><b>RoadNumber:</b> <span className="float-end">{data[0]?.RoadNumber}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>

            </div>
          </div>
        </div>

        <div className='features'>
          <div className='row'>
            <div className='col-md-8'>
              <Badge bg="danger mb-3">
              Features
              </Badge>
              <div className='sightWrapper card bg-light px-2 py-2 mb-3'>
                <div className='row'>
                  <div className='col-md-4'>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">24 hours CC TV coverage</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Automatic fire alarm system</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Baridhara Park</span></p>
                  </div>
                  <div className='col-md-4'>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Corner Plot</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Dedicated Electricity Line</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Generator Backup</span></p>
                  </div>
                  <div className='col-md-4'>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Good Location</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Open Space</span></p>
                    <p className="border-bottom pb-2"><b><AiOutlineCheckCircle/></b> <span className="mx-2">Road side view</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <Badge bg="danger mb-3">
                Comments
              </Badge>

              <div className="comment-input-box">
              <textarea
                ref={(input)=>CommentRef=input}
                className="comment-input"
                placeholder="Write a comment..."
              />
              <button onClick={OnComment} type="submit" className="comment-submit-button shadow">
                Submit <AiOutlineSend/>
              </button>
              </div>

              {/* <div className="messenger-message">
                <div className="message-header">
                  <span className="sender">Anonymous</span>
                  <span className="timestamp">27-06-2022</span>
                </div>
                <div className="message-content">Wow Its Nice</div>
              </div> */}

                {
                  displayComments.map((value,key)=>
                  <div className="messenger-message">
                    <div className="message-header">
                      <span className="sender">Anonymous</span>
                      <span className="timestamp">{formatDate(new Date(value.createdDate))}</span>
                    </div>      
                    <div className="message-content">{value.Comments}</div>
                  </div>
                    )
                }

                <div className=''>
                  <ReactPaginate 
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-end"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='row'>
        <div className='col-md-8'>

        <Badge bg="success mb-3">
        Related {category}
        </Badge>

          <div className='row d-block d-lg-flex'>
              {displayProperties.length > 0 ? (
              displayProperties.map((value) => (
                <div className='col-md-2' key={value._id}>
                  <Link to={`/PropertiesDetails/${value._id}`}>
                    <div className='allItems hvr-float-shadow mb-3'>
                      <div className="card animated zoomIn">
                        <img className="card-img-top img-thumbnail" src={value.Images[0].imageUrl} alt="laptop" />
                        <div className="card-body">
                          <h6 className="card-title text-center">{value.HouseName}</h6>
                          <div className='price text-center'>
                            <i>
                              <b>
                                {value.Category === 'singleRoom' && `৳${value.RoomRentPrice}`}
                                {value.Category === 'apartmentSell' && `৳${value.AppartmentPrice}`}
                                {value.Category === 'rentBachelor' && `৳${value.UnitRentPrice}`}
                                {value.Category === 'rentFamily' && `৳${value.UnitRentPrice}`}
                                {value.Category === 'sellUnit' && `৳${value.UnitPrice}`}
                                {value.Category === 'sellLevel' && `৳${value.LevelPrice}`}
                              </b>
                            </i>
                          </div>
                          <Link to={`/PropertiesDetails/${value._id}`}>
                            <button className='btn btn-secondary form-control'>
                              <BsCartPlus />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center my-5"><i>No Data Found in This Category <GiEmptyHourglass/></i></div>
            )}

        </div>

        <div className=''>
            <ReactPaginate 
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={propertiespageCount}
              onPageChange={propertieschangePage}
              containerClassName={"pagination justify-content-start"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
         </div>

        </div>
        <div className='col-md-4'></div>
      </div>
    </div>

      <Footer />
    </Fragment>
  );
};

const formatDate = date => {
  const options = {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

export default SinglePropertiesDetails;
