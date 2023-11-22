import React, { Fragment, useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { AiTwotoneEnvironment } from 'react-icons/ai';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useParams } from 'react-router-dom';
import { SuccessToast } from '../../Helper/FormHelper';
import Footer from '../Users/Footer';

// Define custom marker icon
const markerIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const UpdateMap = () => {
  const [position, setPosition] = useState([23.810331, 90.412521]); // default position

  const { id } = useParams();
  console.log(id);

  console.log(position);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPlace = {
      id,
      position,
    };
    try {
      const res = await axios.post('https://rent-corner-vercel-deploy.vercel.app/api/v1/UpdateLocation', newPlace);
      SuccessToast('Location Update Success !');
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMapClick = (event) => {
    setPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleMarkerDragEnd = (event) => {
    setPosition([event.target.getLatLng().lat, event.target.getLatLng().lng]);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow posterWrapper animated flipInX my-4">
              <div className="row">
                <div className="col-sm-3">
                  <h3 className="mt-3">
                    <FaMapMarkedAlt />
                  </h3>
                </div>
                <div className="col-sm-9">
                  <div className="posterText">
                    <h2>Update Your Location</h2>
                    <p>
                      <AiTwotoneEnvironment /> All World !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mapinfo">
          <form onSubmit={handleSubmit}>
            <MapContainer
              center={position}
              zoom={13}
              onClick={handleMapClick}
              scrollWheelZoom={true}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={position}
                icon={markerIcon}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>{position[0].toFixed(5)}, {position[1].toFixed(5)}</Popup>
              </Marker>
            </MapContainer>

            <button className="btn btn-info shadow my-4" type="submit">
              Update Place
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default UpdateMap;
