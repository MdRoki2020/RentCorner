import React, { Fragment, useEffect, useState } from 'react';
import { GiSelfLove } from "react-icons/gi";
import '../../Assets/Styles/loveZone.css';
import { getUserDetails } from '../../Helper/SessionHelperUser';
import { ReadLoveListFilterByEmail } from '../../API Request/APIRequest';
import { MdRemoveCircle } from "react-icons/md";
import Footer from './Footer';
import { DeleteAlertForLoveList } from '../../Helper/DeleteAlertForLoveList';
import { Link } from 'react-router-dom';

const LoveZone = () => {
  const [data, setData] = useState([]);

  let userDetails = getUserDetails();
  let userEmail = userDetails ? userDetails['Email'] : null;

  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = () => {
    ReadLoveListFilterByEmail(userEmail)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const DeleteItem=(id)=>{
    DeleteAlertForLoveList(id).then((data)=>{
        if(data===true){
            ReadData();
        }
    })
  }

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

            <div className='allDataWrapper'>
            {data.length === 0 ? (
              <div className="text-center">You haven't added anything to Love Zone</div>
                ) : (
                data.map((value, key) => (
                <div>
                    <Link to={'/PropertiesDetails/' + value.PropertiesId}>
                    <div key={key}>
                    <div className='loveListWrapper card shadow animated fadeInUp mb-2'>
                        <div className='loveList'>
                        <div className='row'>
                            <div className='col-sm-6'>
                            <img className='img-fluid' width="130px" src={value.image} alt='image' />
                            <span className='loveListName'>{value.HouseName}</span>
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
                </Link>
                <div>

                </div>
                </div>
                
                ))
                )}
            </div>
          </div>
        </div>
      </div>

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
