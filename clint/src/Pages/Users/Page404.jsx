import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../../Assets/Styles/Page404.css';
import ErrorImage from '../../Assets/Images/ErrorPageImage.gif'

const Page404 = () => {
  return (
    <Fragment>
        <div className='container'>
            <div className='row'>
                <div className='ErrorContains text-center'>
                    <h2>ROOM-CORNER APP</h2>
                    <div className='ErrorPage'>
                        <img className='img-fluid' src={ErrorImage} alt='Page 404'/>
                    </div>
                    <div className='LinkOptions'>
                        <Link to="/"><p className='backBtn'> Back</p></Link>
                        <Link to="/"><p className='HomeBtn'> Home</p></Link>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Page404