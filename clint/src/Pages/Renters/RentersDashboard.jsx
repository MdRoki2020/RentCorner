import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Table, Tooltip } from 'react-bootstrap';
import { getRenterDetails } from "../../Helper/SessionHelperPublisher";
import { FaBuysellads } from "react-icons/fa";
import { SiHandshake, SiAnalogue } from "react-icons/si";
import ReactPaginate from 'react-paginate';
import { GiReturnArrow } from "react-icons/gi";
import { ResponsiveContainer, YAxis, XAxis, BarChart, CartesianGrid, Legend, Bar, PieChart, Pie, Cell } from 'recharts';
import { BiEdit } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../../Assets/Styles/adminDashboard.css';
import Footer from '../Users/Footer';
import { CountBookedRoomByEmailRequest, FilterRoomByEmail, TotalPriceByEmailRequest } from '../../API Request/APIRequest';
import { GrMapLocation } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import { DeleteAlert } from '../../Helper/DeleteAlert';
import { UpdateToDO } from '../../Helper/UpdateAlert';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import axios from 'axios';
import spinnerImage from '../../Assets/Images/rentersLoader.svg';


const RentersDashboard = () => {
  let navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [BookedRoom, setBookedRoom] = useState(0);
  const [totalPriceByEmail, setTotalPriceSum] = useState(0);
  const [ProductLevelData, setProductLevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  let renterEmail = getRenterDetails()['Email'];

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = rooms.slice(pagesVisited, pagesVisited + usersPerPage);
  const pageCount = Math.ceil(rooms.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    GetData();
    CountBookedRoomByEmail();
    TotalPriceByEmail();
    fetchData();
  }, [renterEmail]);

  const GetData = () => {
    FilterRoomByEmail(renterEmail).then((response) => {
      setRooms(response.data);
      setRoomCount(response.count);
      setIsLoading(false)
    });
  };

  const CountBookedRoomByEmail = () => {
    CountBookedRoomByEmailRequest(renterEmail).then((data) => {
      setBookedRoom(data);
      setIsLoading(false)
    });
  };

  const TotalPriceByEmail = () => {
    TotalPriceByEmailRequest(renterEmail).then((data) => {
      setTotalPriceSum(data);
      setIsLoading(false)
    });
  };

  const UpdateItem = (id) => {
    navigate("/UpdateRoom/" + id);
  };

  const DeleteItem = (id) => {
    DeleteAlert(id).then((data) => {
      if (data === true) {
        GetData();
      }
    });
  };

  const StatusChangeItem = (id, status) => {
    UpdateToDO(id, status).then((result) => {
      if (result === true) {
        GetData();
      }
    });
  };

  const fetchData = async () => {
    const response = await fetch(`https://rent-corner-vercel-deploy.vercel.app/api/v1/PropertiesLevelChart/${renterEmail}`);
    const result = await response.json();
    setProductLevelData(result);
    setIsLoading(false);
  };

  // for status pie chart
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rent-corner-vercel-deploy.vercel.app/api/v1/statusPercentage/${renterEmail}`);
        setData([
          { name: 'Available', value: response.data.availablePercentage },
          { name: 'Booked', value: response.data.bookedPercentage },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#228B22', '#800080'];


  return (
    <Fragment>
      {isLoading ? (
          <div className="loader-container">
            <img className="loader-image" src={spinnerImage} alt="Loading..." />
          </div>
        ) : (
      <div className='container-fluid'>
        <Badge bg="success mb-3">
         Renters Dashboard
        </Badge>

        <div className='row'>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><FaBuysellads/></h3>
            <p>Your Post's</p>
            <h5 className='animated fadeInUp'>{roomCount}</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><SiHandshake/></h3>
              <p>Booked Rooms</p>
              <h5 className='animated fadeInUp'>{BookedRoom}</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><GiReturnArrow/></h3>
              <p>Available Rooms</p>
              <h5 className='animated fadeInUp'>{roomCount - BookedRoom}</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><SiAnalogue/></h3>
              <p>Monthly Income</p>
              <h5 className='animated fadeInUp'>৳ {totalPriceByEmail?.totalSum ?? 0}</h5>
          </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>

          <div className='card IncomeChart my-3 shadow'>
              <h5>Product Lavel From Categories</h5>
                <ResponsiveContainer width="100%" height={285}>
                  <BarChart
                    data={ProductLevelData}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#800080" />
                  </BarChart>
              </ResponsiveContainer>
          </div>

          </div>
          <div className='col-md-6'>
          <div className='card categoriesLavel my-3 shadow'>
            <h5>Room Status Percentage</h5>
            <PieChart width={400} height={285}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
          </div>
        </div>

        <div className='row'>
          <div className='recentOrder'>

            <Badge bg="success mb-3">
            Your Posted Rooms
            </Badge>

            <div className='orderTable card mb-3'>

            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th>Image</th>
                <th>Categories</th>
                <th>HouseName</th>
                <th>HouseNumber</th>
                <th>UnitNumber</th>
                <th>LevelNumber</th>
                <th>UnitsPerLevel</th>
                <th>AppartmentPrice</th>
                <th>UnitPrice</th>
                <th>LevelPrice</th>
                <th>UnitRentPrice</th>
                <th>RoomRentPrice</th>
                <th>District</th>
                <th>Thana</th>
                <th>ZipCode</th>
                <th>Address</th>
                <th>RoadNumber</th>
                <th>Added Map</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                displayUsers.map((value,key)=>
                <tr key={key}>
                  <td>
                  <Zoom>
                  <img className='img-fluid img-thumbnail rounded' alt={value.HouseName}
                  src={value.Images[0].imageUrl}
                  width="40" height="40"
                  />
                  </Zoom>
                  </td>
                <td className='animated fadeInUp'>{value.Category}</td>
                <td className='animated fadeInUp'>{value.HouseName}</td>
                <td className='animated fadeInUp'>{value.HouseNumber}</td>
                <td className='animated fadeInUp'>{value.UnitNumber}</td>
                <td className='animated fadeInUp'>{value.LevelNumber}</td>
                <td className='animated fadeInUp'>{value.UnitsPerLevel}</td>
                <td className='animated fadeInUp'>{value.AppartmentPrice}</td>
                <td className='animated fadeInUp'>{value.UnitPrice}</td>
                <td className='animated fadeInUp'>{value.LevelPrice}</td>
                <td className='animated fadeInUp'>{value.UnitRentPrice}</td>
                <td className='animated fadeInUp'>{value.RoomRentPrice}</td>
                <td className='animated fadeInUp'>{value.District}</td>
                <td className='animated fadeInUp'>{value.Thana}</td>
                <td className='animated fadeInUp'>{value.ZipCode}</td>
                <td className='animated fadeInUp'>{value.Address}</td>
                <td className='animated fadeInUp'>{value.RoadNumber}</td>
                <td className='animated fadeInUp'><Link to={'/UpdateMap/'+value._id}><GrMapLocation /></Link></td>
                <td className='animated fadeInUp'>

                  <Badge bg={value.Status === "Available" ? "success" : "danger"}>
                    {value.Status}
                  </Badge>

                  <span className='text-info' onClick={StatusChangeItem.bind(this,value._id,value.Status)}><AiFillEdit/></span>
                </td>

                <td className='animated fadeInUp'>{formatDate(new Date(value.createdAt))}</td>

                <td className='animated fadeInUp'><span onClick={UpdateItem.bind(this,value._id)} className='text-info'><BiEdit/></span> <span onClick={DeleteItem.bind(this,value._id)} className='text-danger'><RiDeleteBin6Line/></span></td>
                </tr>

                )
              }
            </tbody>
            
            </Table>

            </div>
          </div>
        </div>

        <div className=''>
        <ReactPaginate 
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination justify-content-center"}
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
      )}
      <Footer />
    </Fragment>
  )
}


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

export default RentersDashboard
