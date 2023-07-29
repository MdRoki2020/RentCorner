import React, { useState, useEffect, useRef, Fragment } from 'react';
import { AiTwotoneEnvironment } from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';
import '../../Assets/Styles/Tracker.css';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Footer from './Footer';

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
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/PlaceGetById/6464f6d5090523766e145c15'
        );
        setPlace(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlace();

    if (!mapRef.current) {
      const map = L.map('map').setView([23.810331, 90.412521], 13);

      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      });

      osm.addTo(map);

      L.control.locate().addTo(map);

      mapRef.current = map;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(L.latLng(latitude, longitude));
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (place && place.position && currentLocation) {
      // Add the popup icon
      const popupIcon = L.marker(place.position.coordinates, { icon: markerIcon }).addTo(
        mapRef.current
      );
      popupIcon.bindPopup(place.HouseName).openPopup();

      // Initialize the routing control
      const routingControl = L.Routing.control({
        waypoints: [currentLocation, place.position.coordinates],
        routeWhileDragging: true,
        createMarker: (i, waypoint) => {
          // Display popup icon only for the end point (destination)
          if (i === 1) {
            return L.marker(waypoint.latLng, { icon: markerIcon });
          }
        },
      }).addTo(mapRef.current);

      // Update the map bounds to include both the current location and popup icon
      const bounds = L.latLngBounds([currentLocation, place.position.coordinates]);
      mapRef.current.fitBounds(bounds);
    }
  }, [place, currentLocation]);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow trackerposterWrapper animated flipInX my-4 ">
              <div className="row">
                <div className="col-sm-3">
                  <h3 className="mt-3">
                    <BiCurrentLocation />
                  </h3>
                </div>
                <div className="col-sm-9">
                  <div className="posterText">
                    <h2>Tracking Your Self</h2>
                    <p>
                      <AiTwotoneEnvironment /> Find Properties Easily Using Shortest Path !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow mb-4 img-fluid img-thumbnail" id="map" style={{ width: '100%', height: '400px' }} />
      </div>
      <Footer />
    </Fragment>
  );
};

export default RandomWorkSpace;
