import React, { Fragment } from 'react'
import '../../Assets/Styles/FilterDistrictCategory.css'
import { AiTwotoneEnvironment } from "react-icons/ai"


const FilterDistrictCategory = () => {
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
                    {/* <input type='text' onChange={handleInputChange} value={searchTerm} className='searchDistrict shadow' placeholder='Search For Locations Near You' /> */}
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
