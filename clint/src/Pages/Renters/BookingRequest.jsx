import React, { Fragment } from 'react'
import {AiOutlinePullRequest} from "react-icons/ai";


const BookingRequest = () => {
  return (
    <Fragment>
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card shadow posterWrapper animated flipInX mt-3'>
                        <div className='row'>
                        <div className='col-sm-3'>
                        <h4><AiOutlinePullRequest/></h4>
                        </div>
                        <div className='col-sm-9'>
                        <h4>Request' s !</h4>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>

                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
    </Fragment>
  )
}

export default BookingRequest
