import React, { Fragment } from 'react'
import { AiTwotoneEnvironment } from "react-icons/ai"
import { BsCartPlus } from "react-icons/bs";
import '../../Assets/Styles/categoriesItems.css'
import { Badge, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Footer from './Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import 'hover.css/css/hover-min.css';
import { FilterByCategories } from '../../API Request/APIRequest';
import '../../Assets/Styles/PropertiesCategory.css';
import { GiEmptyHourglass } from "react-icons/gi";
import { AiTwotoneCheckCircle } from "react-icons/ai";


const PropertiesCategory = () => {

  let {category}=useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [properties,setProperties]=useState([]);
  const [pageNumber,setPageNumber]=useState(0);


  const usersPerPage=18;
  const pagesVisited=pageNumber * usersPerPage;
  const displayProperties=properties.slice(pagesVisited,pagesVisited+usersPerPage);
  const pageCount=Math.ceil(properties.length / usersPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };



  useEffect(() => {
    const fetchSearchResults =  () => {
      try {

        FilterByCategories(category,searchTerm).then((data)=>{

          setProperties(data);

          })
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm.length > 0) {
      fetchSearchResults();
    } else {
      fetchSearchResults();
    }
  }, [searchTerm]);




  let posterImage=properties[0]?.Images[2].imageUrl;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  

  return (
<Fragment>
  <section>

  <div className='container'>
    <div className='row'>
    <div className='col-md-12'>
        <div className='card CategoriesPosterWrapper animated flipInX my-4'>
          <div className='row'>
            <div className='col-sm-3'>
            <img className='poster mx-2 img-fluid rounded ' src={posterImage} alt={properties.HouseName}/>
            </div>
            <div className='col-sm-9'>
            <div className='posterText'>
              <h2>{category} !</h2>
              <p><AiTwotoneEnvironment/> All Bangladesh !</p>
              <input type='text' onChange={handleInputChange} value={searchTerm} className='searchDistrict shadow' placeholder='What Are You Want' />
            </div>
            </div>
          </div>
          </div>
    </div>
    </div>
  </div>
  </section>

  <section>
  <div className='container'>
    {/* <h5>Products</h5> */}
    <Badge bg="success mb-3">
      {category}
    </Badge>

      <div className='row d-block d-lg-flex'>
      {displayProperties.length > 0 ? (
        displayProperties.map((value, key) => (
          <div className='col-md-2' key={key}>
            <Link to={'/PropertiesDetails/' + value._id}>
              <div className='allItems hvr-float-shadow mb-3'>
                <div className="card animated zoomIn">
                  <img className="card-img-top img-thumbnail" src={value.Images[0].imageUrl} alt="laptop" />
                  <div className="card-body">
                    <h6 className="card-title text-center">{value.HouseName}</h6>
                    <h6 className="card-title text-center">
                    
                  </h6>
                    <div className='price text-center'>
                      <i>
                        <b>
                          {category === 'singleRoom' && `৳${value.RoomRentPrice}`}
                          {category === 'apartmentSell' && `৳${value.AppartmentPrice}`}
                          {category === 'rentBachelor' && `৳${value.UnitRentPrice}`}
                          {category === 'rentFamily' && `৳${value.UnitRentPrice}`}
                          {category === 'sellUnit' && `৳${value.UnitPrice}`}
                          {category === 'sellLevel' && `৳${value.LevelPrice}`}
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

  
  <Footer />  
</Fragment>
  )
}

export default PropertiesCategory
