import React, { Fragment, useEffect, useState } from 'react'
import { FaRegHandshake } from "react-icons/fa";
import { ReadAgreementByEmailRequest } from '../../API Request/APIRequest';
import { getRenterDetails } from '../../Helper/SessionHelperPublisher';

const AgreementHistory = () => {

  const renterEmail = getRenterDetails()['Email'];
  const [AgreementData, setAgreementData] = useState(""); // Initial value should be appropriate

  const getAgreementData = () => {
    ReadAgreementByEmailRequest(renterEmail).then(data => {
      setAgreementData(data);
    });
  }

  useEffect(() => {
    getAgreementData();
  }, []);

  console.log(AgreementData);

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

        <div className='histrorywrapper'>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </Fragment>
  ) 
}

export default AgreementHistory