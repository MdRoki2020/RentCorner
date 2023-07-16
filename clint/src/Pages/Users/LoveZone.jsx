import React, { Fragment } from 'react'
import { GiSelfLove } from "react-icons/gi";
import '../../Assets/Styles/loveZone.css'


const LoveZone = () => {
  return (
    <Fragment>
        <div className='container'>
            <div className='row'>
            <div className='col-md-6'>
                <div className='card shadow trackerposterWrapper animated flipInX my-4 '>
                    <div className='row'>
                    <div className='col-sm-4'>
                        <h3 className='mt-3'><GiSelfLove/></h3>
                    </div>
                    <div className='col-sm-8'>
                        <h4 className='mt-3'>Love Zone</h4>
                    </div>
                    </div>
                </div>


                <div className='loveListWrapper card shadow animated fadeInUp'>
                    <div className='loveList'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <img className='img-fluid' width="150px" src='https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg' alt='image'/>
                                <span className='loveListName'>MART</span>
                                
                            </div>

                            <div className='col-md-6'>
                                <div className='details'>
                                    <p className=''>
                                        <b>CATEGORY:</b> <span className='float-end'>SingleRoom</span>
                                    </p>
                                    <p className=''>
                                        <b>Status:</b> <span className='float-end'>Available</span>
                                    </p>
                                </div>
                            </div>

                            <p className='text-center'>
                                    
                                <span className=''><i>25 jun 2023</i></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='col-md-6'>
                
            </div> */}
            </div>
        </div>
    </Fragment>
  )
}

export default LoveZone