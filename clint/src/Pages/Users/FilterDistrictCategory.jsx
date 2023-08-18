import React, { Fragment, useEffect, useState } from 'react'
import '../../Assets/Styles/FilterDistrictCategory.css'
import { AiTwotoneEnvironment } from "react-icons/ai"
import { Link, useParams } from 'react-router-dom';
import { ToastErrorToast } from '../../Helper/FormHelper2';
import { FilterDistrictAndCategoryRequest } from '../../API Request/APIRequest';
import { GiEmptyHourglass } from "react-icons/gi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { Badge } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import spinnerImage from '../../Assets/Images/pageLoader.svg';



const FilterDistrictCategory = () => {

  let {selectedDistrict}=useParams();
  let {selectedCategory}=useParams();

  const [filterData,setFilterData]=useState("");
  const [pageNumber,setPageNumber]=useState(0);
  const [isLoading, setIsLoading] = useState(true);



  const usersPerPage=18;
  const pagesVisited=pageNumber * usersPerPage;
  const displayData=filterData.slice(pagesVisited,pagesVisited+usersPerPage);
  const pageCount=Math.ceil(filterData.length / usersPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };



  useEffect(() => {
    if (selectedDistrict === '' || selectedCategory === '') {
      ToastErrorToast('Something Went Wrong');
    } else {
      FilterDistrictAndCategoryRequest(selectedDistrict, selectedCategory)
        .then((data) => {
          if (data !== false) {
            setFilterData(data);
            setIsLoading(false);
          } else {
            console.log('Something went wrong with data retrieval');
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    }
  }, [selectedDistrict, selectedCategory]);

  
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
                      <img className='poster mx-2 img-fluid rounded ' src="https://img.freepik.com/free-photo/modern-beige-fabric-couch-plant-living-room_53876-138116.jpg" alt="filterImages"/>
                      </div>
                      <div className='col-sm-9'>
                      <div className='posterText'>
                      <h2>Filter By District And Categories!</h2>
                      <p><AiTwotoneEnvironment/> All Bangladesh !</p>
                      </div>
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
    Filter By District And Categories!
    </Badge>

    <div className='row d-block d-lg-flex'>
      {displayData.length > 0 ? (
        displayData.map((value, key) => (
          <div className='col-md-2' key={key}>
            <Link to={'/PropertiesDetails/' + value._id}>
              <div className='allItems hvr-float-shadow mb-3'>
                <div className="card animated zoomIn">
                  <img className="card-img-top img-thumbnail" src={value.Images[0].imageUrl} alt="laptop" />
                  <div className="card-body">
                    <h6 className="card-title text-center">{value.HouseName}</h6>
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
        <div className="text-center my-5"><i>No Data Found in This Category <GiEmptyHourglass/></i></div>
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

    </Fragment>
  )
}

export default FilterDistrictCategory
