import React, { Fragment, useEffect} from 'react'
import { Badge, Table } from 'react-bootstrap'
import {getRenterDetails } from "../../Helper/SessionHelperPublisher";
import { FaBuysellads } from "react-icons/fa";
import { SiHandshake,SiAnalogue } from "react-icons/si";
import ReactPaginate from 'react-paginate'
import { GiReturnArrow } from "react-icons/gi";
import { LineChart, Line,ResponsiveContainer } from 'recharts';
import { BiEdit } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../../Assets/Styles/adminDashboard.css'
import Footer from '../Users/Footer'
import { useState } from 'react';
import { FilterRoomByEmail } from '../../API Request/APIRequest';
import { GrMapLocation } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import { DeleteAlert } from '../../Helper/DeleteAlert';
import { UpdateToDO } from '../../Helper/UpdateAlert';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const RentersDashboard = () => {
  let navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  console.log(roomCount)
  console.log(rooms)

  let renterEmail=getRenterDetails()['Email'];

  const [pageNumber,setPageNumber]=useState(0);

  const usersPerPage=10;
  const pagesVisited=pageNumber * usersPerPage
  const displayUsers=rooms.slice(pagesVisited,pagesVisited+usersPerPage)
  const pageCount=Math.ceil(rooms.length / usersPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };

  useEffect(()=>{
    GetData();
    
  },[])

  const GetData=()=>{
    FilterRoomByEmail(renterEmail).then((response)=>{
        setRooms(response.data);
        setRoomCount(response.count);
      })
  }


  const UpdateItem=(id)=>{
    navigate("/UpdateProduct/"+id);
}


const DeleteItem=(id)=>{
  DeleteAlert(id).then((data)=>{
      if(data===true){
          GetData();
      }
  })
}


const StatusChangeItem=(id,status)=>{
  UpdateToDO(id, status).then((result)=>{
      if(result===true){
        GetData();
      }
  })
}

  return (
    <Fragment>
      <div className='container-fluid'>
        <Badge bg="danger mb-3">
         Publisher Dashboard
        </Badge>

        <div className='row'>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><FaBuysellads/></h3>
            <p>Your ADs</p>
            <h5 className='animated fadeInUp'>{roomCount}</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><SiHandshake/></h3>
              <p>Product Sold</p>
              <h5 className='animated fadeInUp'>8</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><GiReturnArrow/></h3>
              <p>Return Product</p>
              <h5 className='animated fadeInUp'>0</h5>
          </div>
          </div>
          <div className='col-md-3'>
          <div className='dashboardCounter card text-center shadow'>
            <h3><SiAnalogue/></h3>
              <p>Total Income</p>
              <h5 className='animated fadeInUp'>৳ 10,500</h5>
          </div>
          </div>
        </div>


        <div className='row'>
          <div className='col-md-6'>

          </div>
          <div className='col-md-6'>
          <div className='card categoriesLavel my-3 shadow'>
            <h5>Income Rate</h5>
            <ResponsiveContainer width="100%" aspect="3">
            <LineChart width={300} height={100} data={data}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
          </div>
        </div>

        <div className='row'>
          <div className='recentOrder'>

            <Badge bg="success mb-3">
            Your Posted Products
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
                  width="50" height="50"
                  />
                  </Zoom>
                  </td>
                {/* <td className='animated fadeInUp'><img className='img-thumbnail rounded' src={`https://bechedin-deploy-production.up.railway.app/${value.filePath}`} alt="laptop" width="50"/></td> */}
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
                <td className='animated fadeInUp'><Link to='/updateMap'><GrMapLocation /></Link></td>
                <td className='animated fadeInUp'>

                  <Badge bg={value.Status === "Available" ? "success" : "danger"}>
                    {value.Status}
                  </Badge>

                  <span className='text-info' onClick={StatusChangeItem.bind(this,value._id,value.Status)}><AiFillEdit/></span>
                </td>

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

      <Footer />
    </Fragment>
  )
}


const formatDate = date => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${day}-${month}-${year}   ${hours12}:${minutes}:${seconds} ${ampm}`;
};

export default RentersDashboard
