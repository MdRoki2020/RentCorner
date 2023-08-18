import React, { Fragment } from 'react'
import { FaRegHandshake } from "react-icons/fa";

const AgreementHistory = () => {
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
      </div>
    </Fragment>
  ) 
}

export default AgreementHistory