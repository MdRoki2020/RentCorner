import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FaRegHandshake } from "react-icons/fa";
import { ReadAgreementByEmailRequest } from '../../API Request/APIRequest';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';
import { Table } from 'react-bootstrap';
import '../../Assets/Styles/AgreementHistory.css';
import Zoom from 'react-medium-image-zoom';
import ReactPaginate from 'react-paginate';
import { AiOutlineClear } from "react-icons/ai";
import Footer from '../Users/Footer';
import { DeleteAgreementHistory } from '../../Helper/DeleteAgreement';
import { ToastErrorToast, ToastSuccessToast } from '../../Helper/FormHelper2';


const AgreementHistory = () => {

  const renterEmail = getRenterDetails()['Email'];
  const [AgreementData, setAgreementData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [paginationNumber, setPaginationNumber] = useState(10);

  const paginationNumberRef=(e)=>{
    let paginationNumber= e.target.value;
    setPaginationNumber(paginationNumber);
    console.log(paginationNumber);

  }

  const usersPerPage = paginationNumber;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = AgreementData.slice(pagesVisited, pagesVisited + usersPerPage);
  const pageCount = Math.ceil(AgreementData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const DeleteAgreement = (id) => {
    DeleteAgreementHistory(id).then((data) => {
      if (data === true) {
        ToastSuccessToast("Clear");
        getAgreementData();
      }
    });
  };

  const getAgreementData = () => {
    ReadAgreementByEmailRequest(renterEmail).then(data => {
      setAgreementData(data);
    });
  }
  useEffect(() => {
    getAgreementData();
  }, []);

  return (
    <Fragment>
      <div className='container'>
        <div className='AgreementHistoryWrapper'>
            <div className='row'>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
              <div className='card shadow posterWrapper animated flipInX mt-1'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <h4>
                      <FaRegHandshake />
                    </h4>
                  </div>
                  <div className='col-sm-9'>
                    <h4>Agreement History</h4>
                  </div>
                </div>
              </div>
              </div>
              <div className='col-md-2'></div>
            </div>
        </div>

        <div className='historyWrapper card'>
          <div className='numberWrapper'>
          <span>Show</span>
          <span>
            <select onChange={paginationNumberRef}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </span>
          <span>Entries</span>
          </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">UserImage</th>
              <th scope="col">AgreementDate</th>
              <th scope="col">UserName</th>
              <th scope="col">UserMobile</th>
              <th scope="col">UserEmail</th>
              <th scope="col">UserNID</th>
              <th scope="col">PropertyCategory</th>
              <th scope="col">PropertyName</th>
              <th scope="col">PropertyNumber</th>
              <th scope="col">UnitNumber</th>
              <th scope="col">LevelNumber</th>
              <th scope="col">RenterEmail</th>
              <th scope="col">AgreementStatus</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <Zoom>
                    <img
                      className='img-fluid img-thumbnail rounded'
                      alt={user.userName}
                      src={user.userImage}
                      width="40"
                      height="40"
                    />
                  </Zoom>
                </td>
                <td>{formatDate(new Date(user.createdDate))}</td>
                <td>{user.userName}</td>
                <td>{user.userMobile}</td>
                <td>{user.userEmail}</td>
                <td>{user.userNid}</td>
                <td>{user.propertiesCategory}</td>
                <td>{user.propertiesName}</td>
                <td>{user.propertiesNumber}</td>
                <td>{user.propertiesUnitNumber}</td>
                <td>{user.propertiesLevelNumber}</td>
                <td>{user.RenterEmail}</td>
                <td>{user.AgreementStatus}</td>
                <td><span onClick={DeleteAgreement.bind(this,user._id)} className='text-danger'><AiOutlineClear/></span></td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className=' mt-3'>
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
      </div>

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

export default AgreementHistory