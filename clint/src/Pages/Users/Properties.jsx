import React, { Fragment, useEffect, useState } from 'react';
import { AiTwotoneEnvironment } from 'react-icons/ai';
import Axios from 'axios';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { GiEmptyHourglass } from "react-icons/gi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import '../../Assets/Styles/Properties.css';
import Footer from './Footer';
import '../../Assets/Styles/CustomLoader.css';
import spinnerImage from '../../Assets/Images/pageLoader.svg';

const Properties = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber,setPageNumber]=useState(0);


  const usersPerPage=18;
  const pagesVisited=pageNumber * usersPerPage;
  const displayProperties=rooms.slice(pagesVisited,pagesVisited+usersPerPage);
  const pageCount=Math.ceil(rooms.length / usersPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };

  useEffect(() => {
    searchByPriceAndSearch();
  }, [minPrice, maxPrice, searchInput]);

  const searchByPriceAndSearch = () => {
    let apiUrl = 'https://rent-corner-vercel-deploy.vercel.app/api/v1/searchByPriceAndSearch?';
    const queryParams = {};

    if (minPrice && maxPrice) {
      queryParams.minPrice = minPrice;
      queryParams.maxPrice = maxPrice;
    }

    if (searchInput) {
      queryParams.search = searchInput;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    apiUrl += queryString;

    Axios.get(apiUrl)
      .then((response) => {
        setRooms(response.data.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // console.log(rooms);

  let thirtImage=rooms[0]?.Images[2].imageUrl;

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
            <div className='card CategoriesPosterWrapper animated flipInX my-4'>
              <div className='row'>
                <div className='col-sm-3'>
                  <img
                    className='poster mx-2 img-fluid rounded'
                    src={thirtImage}
                    alt='coming soon'
                  />
                </div>
                <div className='col-sm-5'>
                  <div className='posterText'>
                    <h2>All!</h2>
                    <p>
                      <AiTwotoneEnvironment /> All Bangladesh!
                    </p>
                    <input
                      type='text'
                      value={searchInput}
                      onChange={handleSearchInputChange}
                      className='searchDistrict shadow'
                      placeholder='Search For Locations Near You'
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <form>
                    <label>
                      Min Price: <br/>
                      <input
                        type='range'
                        min='1000'
                        max='100000'
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className='minPrice'
                      />
                      &nbsp;&nbsp;{minPrice}
                    </label>
                    <br />
                    <label>
                      Max Price: <br/>
                      <input
                        type='range'
                        min='0'
                        max='900000'
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className='maxPrice'
                      />
                      &nbsp;&nbsp;{maxPrice}
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <section>
      <div className='container'>
        {/* <h5>Products</h5> */}
        <Badge bg="success mb-3">
          All Properties
        </Badge>

        <div className='row d-block d-lg-flex'>
          {displayProperties.length > 0 ? (
            displayProperties.map((value, key) => (
              <div className='col-md-2' key={key}>
                <Link to={'/PropertiesDetails/' + value._id}>
                  <div className='allItems hvr-float-shadow mb-3'>
                    <div className="card animated zoomIn">
                      {value.Images && value.Images.length > 0 && (
                        <img className="card-img-top img-thumbnail" src={value.Images[0].imageUrl} alt="laptop" />
                      )}
                      <div className="card-body">
                        <h6 className="card-title text-center">{value.HouseName}</h6>
                        <h6 className="card-title text-center"></h6>
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
                        <Link to={'/PropertiesDetails/' + value._id}>
                          <button className='btn btn-secondary form-control'>
                            {value.Status}{' '}
                            {value.Status === 'Booked' ? (
                              <AiTwotoneCheckCircle style={{ color: 'red' }} />
                            ) : value.Status === 'Available' ? (
                              <AiTwotoneCheckCircle style={{ color: 'blue' }} />
                            ) : (
                              <AiTwotoneCheckCircle />
                            )}
                          </button>
                        </Link>
                        <div className="text-center mt-2">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center my-5"><i>No Data Found<GiEmptyHourglass/></i></div>
          )}
        </div>
      </div>
      </section>

      <section>
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
      </section>
      <Footer />
    </Fragment>
  );
};

export default Properties;
