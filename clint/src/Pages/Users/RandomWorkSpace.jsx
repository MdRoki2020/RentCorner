import React, { useState, useEffect, useRef, Fragment } from 'react';
import { AiTwotoneEnvironment } from "react-icons/ai"
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

// Define custom marker icon
const markerIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const RandomWorkSpace = () => {
  const [place, setPlace] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/PlaceGetById/6464f84a090523766e145c1a`);
        console.log(response.data); // Check the fetched data in the browser's console
        setPlace(response.data[0]); // Since the response is an array, use response.data[0] to access the first place
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlace();

    if (!mapRef.current) {
      const map = L.map("map").setView([23.810331, 90.412521], 13);

      const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }
      );
      osm.addTo(map);

      L.control.locate().addTo(map);

      mapRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (place && place.position && place.position.coordinates) {
      // Check if the popup already exists and close it before creating a new one
      if (mapRef.current._popup) {
        mapRef.current._popup.remove();
      }

      const marker = L.marker([place.position.coordinates[0], place.position.coordinates[1]], {
        icon: markerIcon // Add the custom marker icon here
      }).addTo(mapRef.current);

      // Create the popup content
      const popupContent = document.createElement('div');
      popupContent.style.width = '200px';

      // You can customize the content as per your requirements here
      popupContent.textContent = `House Name: ${place.HouseName}\nDistrict: ${place.District}`;

      // Create the popup and bind it to the marker
      marker.bindPopup(popupContent).openPopup();
    }
  }, [place]);

  return (
    <Fragment>
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
        <div className='card shadow mb-4 img-fluid img-thumbnail' id="map" style={{ width: "100%", height: "400px" }} />
      </div>
      <Footer/>
    </Fragment>
  );
}

export default RandomWorkSpace;
