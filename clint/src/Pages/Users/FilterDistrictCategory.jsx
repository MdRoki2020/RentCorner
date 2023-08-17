import React, { Fragment, useEffect, useState } from 'react'
import '../../Assets/Styles/FilterDistrictCategory.css'
import { AiTwotoneEnvironment } from "react-icons/ai"
import { useParams } from 'react-router-dom';
import { ToastErrorToast } from '../../Helper/FormHelper2';
import { FilterDistrictAndCategoryRequest } from '../../API Request/APIRequest';


const FilterDistrictCategory = () => {

  let {selectedDistrict}=useParams();
  let {selectedCategory}=useParams();

  const [filterData,setFilterData]=useState("");
  console.log(filterData)


  useEffect(() => {
    if (selectedDistrict === '' || selectedCategory === '') {
      ToastErrorToast('Something Went Wrong');
    } else {
      FilterDistrictAndCategoryRequest(selectedDistrict, selectedCategory)
        .then((data) => {
          if (data !== false) {
            // Data retrieval was successful
            setFilterData(data);
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
    </Fragment>
  )
}

export default FilterDistrictCategory
