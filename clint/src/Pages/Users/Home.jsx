import React, { Fragment, useState } from 'react'
// import '../Assets/Style/Home.css'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import '../../Assets/Styles/Home.css'
import { Badge, } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'hover.css/css/hover-min.css';
import { AiOutlineRight,AiOutlinePhone,AiOutlineMail } from "react-icons/ai";
import { CiLocationArrow1 } from "react-icons/ci";
import bachelor from '../../Assets/Images/bachelor.jpg'
import family from '../../Assets/Images/family.jpg'
import apartment from '../../Assets/Images/apartment.jpg'
import unit from '../../Assets/Images/unit.jpg'
import rent from '../../Assets/Images/rent.jpg'
import level from '../../Assets/Images/level.jpg'
import HomePoster1 from '../../Assets/Images/HomePoster1.jpg'
import HomePoster2 from '../../Assets/Images/HomePoster2.png'


function Home() {

  // Define custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  const [places, setPlaces] = useState([]);


  return (
    <Fragment>
      <section>
        <div className='wrapper'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
              <div className='coverMeta text-center'>
                <h2 className='textContentWrapper animated fadeInUp delay-2s'>Best Quality Rooms Of</h2>
                <h2 className='textContentWrapper animated fadeInUp'>Our Collections</h2>
                <p className='coverText animated fadeInUpBig'>Sold Your Old Drafts Safely</p>
                <p className='coverText animated fadeInUpBig'>Safe Delevered Of Our Own Community</p>
              </div>
              </div>
              {/* <div className='col-md-6'>
                  <div className='subscribeComponents mt-5 text-center animated fadeInUp'>
                  <input className='shadow' placeholder='Enter Email'/><Button className='hvr-sweep-to-right hvr-pop shadow btn btn-info text-light'> </Button>
                  </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className='categorySection'>
        <div className='container'>
          <div className='category mt-4 mb-4'>
            <Badge bg="danger mb-3">
            Categories
            </Badge>
            
            <div className='row'>
              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Laptop'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={rent} alt="rent" />
                  <div className="card-body">
                    <h5 className="card-title text-center">For Rent</h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Mobile'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={apartment} alt="apartment" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Apartment Sell</h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Watch'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={bachelor} alt="bachelor" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rent Bachelor</h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Television'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={family} alt="family" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rent Family</h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Electronics'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={unit} alt="unit" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Sell Unit</h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

              <div className='col-md-2 hvr-pulse-shrink'>
              <Link to='/Products/Fashion'>
              <div className='allItems'>
                <div className="card">
                  <img className="card-img-top" src={level} alt="level" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Sell Level </h5>
                  </div>
                </div>
              </div>
              </Link>
              </div>

            </div>
          </div>
        </div>

        <div className='container mb-4'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card posterWrapper animated fadeInLeft'>
              <div className='row'>
                <div className='col-sm-3'>
                <img className='poster' src={HomePoster1} alt='poster1'/>
                </div>
                <div className='col-sm-9'>
                <div className='posterText'>
                  <h2>Find Your Best Home!</h2>
                  <p>Search Listing All Bangladesh</p>
                  <Link to='/'><button className='btn btn-warning shadow rounded-pill hvr-pop'>Filter <AiOutlineRight/></button></Link>
                </div>
                </div>
              </div>
              </div>
            </div>

            <div className='col-md-6'>
            <div className='card posterWrapper animated fadeInRight'>
              <div className='row'>
                <div className='col-sm-3'>
                <img className='poster' src={HomePoster2} alt='poster2'/>
                </div>
                <div className='col-sm-9'>
                <div className='posterText'>
                  <h2>Discover Amazing People !</h2>
                  <p>Connect With Users And Room Renters</p>
                  <Link to='/'><button className='btn btn-info shadow rounded-pill hvr-pop'>All Ads <AiOutlineRight/></button></Link>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
        <Badge bg="danger mb-3">
            Available Properties
        </Badge>
        </div>

        <div className='container card mb-4'>
        <MapContainer style={{ height: '400px', width: '100%' }} center={[23.810331, 90.412521]} zoom={13} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {places.map(place => (
            <Marker key={place._id} position={[place.position.coordinates[0], place.position.coordinates[1]]} icon={markerIcon}>
              <Popup>
                <Popup>
                  <div>
                    <img src={place.image} alt={place.name} style={{ width: '100%' }} />
                    <p>{place.name}</p>
                  </div>
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
