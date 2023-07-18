import React, { Fragment, useEffect, useState } from 'react';
import { AiTwotoneEnvironment } from 'react-icons/ai';
import Axios from 'axios';

const Properties = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    searchByPriceAndSearch();
  }, [minPrice, maxPrice, searchInput]);

  const searchByPriceAndSearch = () => {
    let apiUrl = 'http://localhost:8000/api/v1/searchByPriceAndSearch?';
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

  console.log(rooms);

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card CategoriesPosterWrapper animated flipInX my-4'>
              <div className='row'>
                <div className='col-sm-3'>
                  <img
                    className='poster mx-2 img-fluid rounded'
                    src='https://www.decorsnob.com/wp-content/uploads/Average-Size-of-a-Living-Room-1024x661.jpg.webp'
                    alt='coming'
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
                      placeholder='What Are You Want'
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <form>
                    <label>
                      Min Price:
                      <input
                        type='range'
                        min='0'
                        max='100000'
                        value={minPrice}
                        onChange={handleMinPriceChange}
                      />
                      {minPrice}
                    </label>
                    <br />
                    <label>
                      Max Price:
                      <input
                        type='range'
                        min='0'
                        max='100000'
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                      />
                      {maxPrice}
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Properties;
