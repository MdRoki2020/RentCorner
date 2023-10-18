import React, { useState, useEffect, useRef, Fragment } from 'react';
import { AiTwotoneEnvironment } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import '../../Assets/Styles/Tracker.css';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import Footer from './Footer';
import '../../Assets/Styles/CustomLoader.css';
import spinnerImage from '../../Assets/Images/pageLoader.svg';
 
// Define custom marker icon
const markerIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const Tracker = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/PlaceGet');
        setPlaces(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (mapRef.current && places.length > 0) {
      if (!mapRef.current.map) {
        const map = L.map(mapRef.current).setView([23.810331, 90.412521], 13);

        const osm = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          }
        );
        osm.addTo(map);

        L.control.locate().addTo(map);

        mapRef.current.map = map;
      }

      // Add markers for places to the map
      places.forEach(place => {
        const popupContent = document.createElement('div');
        popupContent.style.width = '200px';

        const image = document.createElement('img');
        image.src = place.Images[0].imageUrl;
        image.alt = place.HouseName;
        image.style.width = '100%';

        const name = document.createElement('p');
        name.style.marginBottom = '0';
        name.textContent = place.HouseName;

        const link = document.createElement('a');
        link.href = `/PropertiesDetails/${place._id}`;
        link.appendChild(popupContent);
        popupContent.appendChild(image);
        popupContent.appendChild(name);

        const marker = L.marker([place.position.coordinates[0], place.position.coordinates[1]], {
          icon: markerIcon
        }).addTo(mapRef.current.map).bindPopup(link);
      });
    }
  }, [places]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="loader-container">
          <img className="loader-image" src={spinnerImage} alt="Loading..." />
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card shadow trackerposterWrapper animated flipInX my-4 '>
                <div className='row'>
                  <div className='col-sm-3'>
                    <h3 className='mt-3'><BiCurrentLocation/></h3>
                  </div>
                  <div className='col-sm-9'>
                    <div className='posterText'>
                      <h2>Tracking Your Self</h2>
                      <p><AiTwotoneEnvironment/> Find Properties Easily Using Shortest Path !</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow mb-4 img-fluid img-thumbnail' id="map" style={{ width: "100%", height: "400px" }} ref={mapRef} />
        </div>
      )} 
      <Footer/>
    </Fragment>
  )
}

export default Tracker;
