import React, { Fragment, useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import '../../Assets/Styles/Home.css'
import { Badge, Button, } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'hover.css/css/hover-min.css';
import { AiOutlineRight,AiOutlinePhone,AiOutlineMail } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { CiLocationArrow1 } from "react-icons/ci";
import bachelor from '../../Assets/Images/bachelor.jpg'
import family from '../../Assets/Images/family.jpg'
import apartment from '../../Assets/Images/apartment.jpg'
import unit from '../../Assets/Images/unit.jpg'
import rent from '../../Assets/Images/rent.jpg'
import level from '../../Assets/Images/level.jpg'
import HomePoster1 from '../../Assets/Images/HomePoster1.jpg'
import HomePoster2 from '../../Assets/Images/HomePoster2.png'
import axios from 'axios';
import '../../Assets/Styles/CustomLoader.css';
import spinnerImage from '../../Assets/Images/fontLoader.svg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ToastErrorToast } from '../../Helper/FormHelper2';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { ReadAgreement, ReadPublisherData} from '../../API Request/APIRequest';


// Define custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });


function Home() {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [agreementLength,setAgreementLength]=useState(0);
  const [publisherLength,setPublisherLength]=useState(0);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/PlaceGet');
        setPlaces(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }

    fetchPlaces();
    getAgreementData();
    getPublisherData();
  }, []);



  const getAgreementData = () => {
    ReadAgreement().then(data => {
      setAgreementLength(data.length);
    });
  }

  const getPublisherData = () => {
    ReadPublisherData().then(data => {
      setPublisherLength(data.length);
    });
  }
  

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };


  //for search
  let navigate=useNavigate();

     const DistrictRef = useRef(null);
     const categoriesRef = useRef(null);


     const DistrictAndCategoryAndHandelar = () => {
      const selectedDistrict = DistrictRef.current.value;
      const selectedCategory = categoriesRef.current.value;
    
      if (selectedDistrict === "") {
        ToastErrorToast("Please Select District");
      } else if (selectedCategory === "") {
        ToastErrorToast("Please Select Category");
      } else {
        navigate(`/FilterDistrictCategory/${selectedDistrict}/${selectedCategory}`);
      }
    };


    //for banner slider
    const [showBtnAndCover, setShowBtnAndCover] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        if (!isHovered) {
          setShowBtnAndCover((prevShow) => !prevShow);
        }
      }, 5000);

      return () => clearInterval(interval);
    }, [isHovered]);


    const [counterOn, setCounterOn] = useState(false);

  return (
    <Fragment>
      <section>
        {isLoading ? (
          <div className="loader-container">
            <img className="loader-image" src={spinnerImage} alt="Loading..." />
          </div>
        ) : (
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >

                  <div className='coverWrapper'>
                      <div className={`btnAndCoverWrapper ${showBtnAndCover ? 'fade-in' : 'fade-out'}`}>
                          <div className='text-center animated fadeInUp'>
                            <h2 className="textContentWrapper">NOW IN FUTURE BariBazarBd</h2>
                            <p className="coverText">Best Quality Rooms Of Our Collection Visit Here</p>
                            <Link to={'/Blog'}><Button className="textBannerButton shadow btn text-light">Learn More</Button></Link>
                          </div>
                      </div>

                    <div className={`introContains ${showBtnAndCover ? 'fade-out' : 'fade-in'}`}>
                      <div className='coverMeta text-center animated fadeInUp'>
                        <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-4'>
                        <div className='DistrictWrapper'>
                          <select ref={DistrictRef}>
                              <option selected value="">Select District</option>
                              <option value="Dhaka">Dhaka</option>
                              <option value="Faridpur">Faridpur</option>
                              <option value="Gazipur">Gazipur</option>
                              <option value="Gopalganj">Gopalganj</option>
                              <option value="Jamalpur">Jamalpur</option>
                              <option value="Kishoreganj">Kishoreganj</option>
                              <option value="Madaripur">Madaripur</option>
                              <option value="Manikganj">Manikganj</option>
                              <option value="Munshiganj">Munshiganj</option>
                              <option value="Mymensingh">Mymensingh</option>
                              <option value="Narayanganj">Narayanganj</option>
                              <option value="Narsingdi">Narsingdi</option>
                              <option value="Netrokona">Netrokona</option>
                              <option value="Rajbari">Rajbari</option>
                              <option value="Shariatpur">Shariatpur</option>
                              <option value="Sherpur">Sherpur</option>
                              <option value="Tangail">Tangail</option>
                              <option value="Bogra">Bogra</option>
                              <option value="Joypurhat">Joypurhat</option>
                              <option value="Naogaon">Naogaon</option>
                              <option value="Natore">Natore</option>
                              <option value="Nawabganj">Nawabganj</option>
                              <option value="Pabna">Pabna</option>
                              <option value="Rajshahi">Rajshahi</option>
                              <option value="Sirajgonj">Sirajgonj</option>
                              <option value="Dinajpur">Dinajpur</option>
                              <option value="Gaibandha">Gaibandha</option>
                              <option value="Kurigram">Kurigram</option>
                              <option value="Lalmonirhat">Lalmonirhat</option>
                              <option value="Nilphamari">Nilphamari</option>
                              <option value="Panchagarh">Panchagarh</option>
                              <option value="Rangpur">Rangpur</option>
                              <option value="Thakurgaon">Thakurgaon</option>
                              <option value="Barguna">Barguna</option>
                              <option value="Barisal">Barisal</option>
                              <option value="Bhola">Bhola</option>
                              <option value="Jhalokati">Jhalokati</option>
                              <option value="Patuakhali">Patuakhali</option>
                              <option value="Pirojpur">Pirojpur</option>
                              <option value="Bandarban">Bandarban</option>
                              <option value="Brahmanbaria">Brahmanbaria</option>
                              <option value="Chandpur">Chandpur</option>
                              <option value="Chittagong">Chittagong</option>
                              <option value="Comilla">Comilla</option>
                              <option value="Cox's Bazar">Cox's Bazar</option>
                              <option value="Feni">Feni</option>
                              <option value="Khagrachari">Khagrachari</option>
                              <option value="Lakshmipur">Lakshmipur</option>
                              <option value="Noakhali">Noakhali</option>
                              <option value="Rangamati">Rangamati</option>
                              <option value="Habiganj">Habiganj</option>
                              <option value="Maulvibazar">Maulvibazar</option>
                              <option value="Sunamganj">Sunamganj</option>
                              <option value="Sylhet">Sylhet</option>
                              <option value="Bagerhat">Bagerhat</option>
                              <option value="Chuadanga">Chuadanga</option>
                              <option value="Jessore">Jessore</option>
                              <option value="Jhenaidah">Jhenaidah</option>
                              <option value="Khulna">Khulna</option>
                              <option value="Kushtia">Kushtia</option>
                              <option value="Magura">Magura</option>
                              <option value="Meherpur">Meherpur</option>
                              <option value="Narail">Narail</option>
                              <option value="Satkhira">Satkhira</option>
                          </select>
                        </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='categoryWrapper'>
                            <select ref={categoriesRef}>
                              <option selected value="">Select Categories</option>
                              <option value="singleRoom">Rent Single Room</option>
                              <option value="apartmentSell">Apartment Sell</option>
                              <option value="rentBachelor">Rent Bachelor</option>
                              <option value="rentFamily">Rent Family</option>
                              <option value="sellUnit">Sell Unit</option>
                              <option value="sellLevel">Sell Level</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-2'></div>
                        </div>
                      </div>
                      <div className='text-center'>
                      <Button onClick={DistrictAndCategoryAndHandelar} className="hvr-pop bannerButton shadow btn text-light">Search <FiSearch/></Button>
                      </div>
                      <div className='smallMetaText'>
                        <span>ALL BANGLADESH &nbsp; <FaLocationArrow/></span>
                      </div>                  
                    </div>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className='categorySection'>
        <div className='container'>
          <div className='category mt-4 mb-4'>
            <Badge bg="danger mb-3">
            Categories
            </Badge>
            
            <Carousel
              responsive={responsive}
              autoPlay={true}
              infinite={true}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              autoPlaySpeed={1000}
            >
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/singleRoom'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={rent} alt="rent" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Single Room</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/apartmentSell'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={apartment} alt="apartment" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Apartment Sell</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/rentBachelor'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={bachelor} alt="bachelor" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Rent Bachelor</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/rentFamily'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={family} alt="family" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Rent Family</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/sellUnit'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={unit} alt="unit" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Sell Unit</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='hvr-pulse-shrink'>
                <Link to='/PropertiesCategory/sellLevel'>
                  <div className='allItems'>
                    <div className="card">
                      <img className="card-img-top img-fluid img-thumbnail" src={level} alt="level" />
                      <div className="card-body">
                        <h5 className="card-title text-center">Sell Level</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Carousel>
          </div>
        </div>

        <div className='container mb-4'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card posterWrapper shadow'>
              <div className='row'>
                <div className='col-sm-3'>
                <img className='poster' src={HomePoster1} alt='poster1'/>
                </div>
                <div className='col-sm-9'>
                <div className='posterText'>
                  <h2>Find Your Best Home!</h2>
                  <p>Search Listing All Bangladesh</p>
                  <Link to='/AllProperties'><button className='btn shadow rounded-pill hvr-pop'>Filter <AiOutlineRight/></button></Link>
                </div>
                </div>
              </div>
              </div>
            </div>

            <div className='col-md-6'>
            <div className='card posterWrapper shadow'>
              <div className='row'>
                <div className='col-sm-3'>
                <img className='poster' src={HomePoster2} alt='poster2'/>
                </div>
                <div className='col-sm-9'>
                <div className='posterText'>
                  <h2>Discover Amazing People !</h2>
                  <p>Connect With Users And Room Renters</p>
                  <Link to='/AllProperties'><button className='btn shadow rounded-pill hvr-pop'>All Ads <AiOutlineRight/></button></Link>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
      <section className='counting'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='singleContact'>
                {counterOn && <CountUp start={0} end={100} duration={2} className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop' />}
                <h6>Total User</h6>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='singleContact'>
                {counterOn && <CountUp start={0} end={150} duration={2} className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop' />}
                <h6>Total Properties</h6>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='singleContact'>
                {counterOn && <CountUp start={0} end={publisherLength} duration={2} className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop' />}
                <h6>Total Publisher</h6>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='singleContact'>
                {counterOn && <CountUp start={0} end={agreementLength} duration={2} className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop' />}
                <h6>Agreement Done</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollTrigger>

      <section>
        <div className='container'>
        <Badge bg="danger mb-3">
            Available Properties
        </Badge>
        </div>

        <div className='container mb-4 img-fluid img-thumbnail'>
        <MapContainer style={{ height: '400px', width: '100%' }} center={[23.810331, 90.412521]} zoom={13} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {places.map(place => (
            <Marker key={place._id} position={[place.position.coordinates[0], place.position.coordinates[1]]} icon={markerIcon}>
              <Popup>
                <Popup>
                  <Link to={'/PropertiesDetails/' + place._id}>
                    <img src={place.Images[0].imageUrl} alt={place.HouseName} style={{ width: '100%' }} />
                    <p>{place.HouseName}</p>
                  </Link>
                </Popup>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        </div>
      </section>

      <section className='getInTouch pt-4'>
        <div className='container'>
        {/* <h5 className='mb-4'>Get In Touch</h5> */}
        <Badge bg="danger mb-3">
        Get In Touch
        </Badge>
          <div className='row'>
            <div className='col-md-4'>
              <div className='singleContact'>
                <div className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop'> <AiOutlinePhone/> </div>
                <h5>Phone</h5>
                <p>If you have to need any help you can call any time. Our teem spend there time for give best service.</p>
                <p>++8801717453205</p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='singleContact'>
                <div className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-pop'> <AiOutlineMail/> </div>
                <h5>Email</h5>
                <p>If you have want to send massage, You can send email us. We shall back to response very quickly!</p>
                <p>mroki815@gmail.com</p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='singleContact'>
                <div className='singleContactBox card shadow mb-3 hvr-float-shadow hvr-Buzz hvr-pop'> <CiLocationArrow1/> </div>
                <h5>Location</h5>
                <p>Our Company has located in Chittagong, Bangladesh. please visit <a href='https://rsroki.info'>Rs Roki (Protfolio)</a> for more info.</p>
                <p>Mirpur Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
      </Fragment>
  )
}

export default Home
