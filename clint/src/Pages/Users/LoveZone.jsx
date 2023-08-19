import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { GiSelfLove } from "react-icons/gi";
import '../../Assets/Styles/loveZone.css';
import { getUserDetails } from '../../Helper/SessionHelperUser';
import { ReadLoveListFilterByEmail } from '../../API Request/APIRequest';
import { MdRemoveCircle } from "react-icons/md";
import Footer from './Footer';
import { DeleteAlertForLoveList } from '../../Helper/DeleteAlertForLoveList';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/CustomLoader.css';
import spinnerImage from '../../Assets/Images/pageLoader.svg';


const LoveZone = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  let userDetails = getUserDetails();
  let userEmail = userDetails ? userDetails['Email'] : null;

  const ReadData = useCallback(() => {
    ReadLoveListFilterByEmail(userEmail)
      .then((res) => {
        setData(res);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error);
      });
  }, [userEmail]);

  useEffect(() => {
    ReadData();
  }, [ReadData]);


  const DeleteItem=(id)=>{
    DeleteAlertForLoveList(id).then((data)=>{
        if(data===true){
            ReadData();
        }
    })
  }

  return (
    <Fragment>
      {isLoading ? (
          <div className="loader-container">
            <img className="loader-image" src={spinnerImage} alt="Loading..." />
          </div>
        ) : (
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

            <div className='allDataWrapper'>
            {data.length === 0 ? (
              <div className="text-center">You haven't added anything to Love Zone Or Login First</div>
                ) : (
                data.map((value, key) => (
                <div>
                    <div key={key}>
                    <div className='loveListWrapper card shadow animated fadeInUp mb-2'>
                      <div className='loveList'>
                        <div className='row'>
                          <div className='col-sm-6'>
                          <Link to={'/PropertiesDetails/' + value.PropertiesId}>
                            <img className='img-fluid' width="130px" src={value.image} alt={value.HouseName} />
                            <span className='loveListName'>{value.HouseName}</span>
                          </Link>
                          </div>
                          <div className='col-md-6'>
                          <div className='details'>
                              <p className=''>
                              <b>CATEGORY:</b> <span className='float-end'>{value.category}</span>
                              </p>
                              {
                                value.Status==='Available' ?(
                                    <p className=''>
                                    <b>Status:</b> <span className='float-end text-primary'>{value.Status}</span>
                                    </p>
                                ):(
                                    <p className=''>
                                    <b>Status:</b> <span className='float-end text-danger'>{value.Status}</span>
                                    </p>
                                )
                              }
                              <p className=''>
                              <b></b> <span className='float-end text-danger' onClick={DeleteItem.bind(this,value._id)}><MdRemoveCircle/></span>
                              </p>
                          </div>
                          </div>
                            <p className='text-center'>
                            <span className=''><i>{formatDate(new Date(value.createdDate))}</i></span>
                            </p>
                        </div>
                      </div>
                    </div>
                    </div>
                <div>
                </div>
                </div>
                ))
                )}
            </div>
          </div>
        </div>
      </div>
      )}
      <Footer/>
    </Fragment>
  );
};

const formatDate = (date) => {
  const options = {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

export default LoveZone;
