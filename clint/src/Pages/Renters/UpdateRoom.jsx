import React, {Fragment, useEffect, useRef, useState} from 'react'
import { Button } from 'react-bootstrap';
import Footer from '../Users/Footer';
import { MdBrowserUpdated } from "react-icons/md";
import { ReadDataById, RentersPropertiesUpdate } from '../../API Request/APIRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { ErrorToast, SuccessToast } from '../../Helper/FormHelper';

const UpdateRoom = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [LevelNumber, setLevelNumber] = useState('');
    const [UnitsPerLevel, setUnitsPerLevel] = useState('');
    const [District, setDistrict] = useState('');


    useEffect(() => {
        ReadDataById(id).then((data) => {
          setData(data);
          setLevelNumber(data[0] ? data[0].LevelNumber : '');
          setUnitsPerLevel(data[0] ? data[0].UnitsPerLevel : '');
          setDistrict(data[0] ? data[0].District : '');
        });
      }, [id]);

      const handleLevelNumberChange = (e) => {
        setLevelNumber(e.target.value);
      };

      const handleUnitsPerLevelChange = (e) => {
        setUnitsPerLevel(e.target.value);
      };

      const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
      };

     
    //   let Category = data[0] ? data[0].Category : null;
      let HouseName = data[0] ? data[0].HouseName : null;
      let HouseNumber = data[0] ? data[0].HouseNumber : null;
      let UnitNumber= data[0] ? data[0].UnitNumber : null;
    //   let LevelNumber = data[0] ? data[0].LevelNumber : null;
    //   let UnitsPerLevel = data[0] ? data[0].UnitsPerLevel : null;
      let Features= data[0] ? data[0].Features : null;
      let AppartmentPrice = data[0] ? data[0].AppartmentPrice : null;
      let UnitPrice = data[0] ? data[0].UnitPrice : null;
      let LevelPrice= data[0] ? data[0].LevelPrice : null;
      let UnitRentPrice = data[0] ? data[0].UnitRentPrice : null;
      let RoomRentPrice = data[0] ? data[0].RoomRentPrice : null;
    //   let District= data[0] ? data[0].District : null;
      let Thana = data[0] ? data[0].Thana : null;
      let ZipCode = data[0] ? data[0].ZipCode : null;
      let RoadNumber = data[0] ? data[0].RoadNumber : null;
      let Address = data[0] ? data[0].Address : null;





      const houseNameRef = useRef();
      const houseNumberRef = useRef();
      const unitNumberRef = useRef();
      const levelNumberRef = useRef();
      const unitPerLevelRef = useRef();
      const featuresRef = useRef();
      const appartmentPriceRef = useRef();
      const unitPriceRef = useRef();
      const levelPriceRef = useRef();
      const unitRentRef = useRef();
      const singleRoomRentRef = useRef();
      const districtRef = useRef();
      const thanaRef = useRef();
      const zipCodeRef = useRef();
      const addressRef = useRef();
      const roadNumberRef = useRef();

      // eslint-disable-next-line no-const-assign
      let navigate = useNavigate();

      // eslint-disable-next-line no-const-assign
      const OnUpdate = () => {
        setLoading(true);
        let houseName = houseNameRef.current?.value;
        let houseNumber = houseNumberRef.current?.value;
        let unitNumber = unitNumberRef.current?.value;
        let levelNumber = levelNumberRef.current?.value;
        let unitPerLevel = unitPerLevelRef.current?.value;
        let features = featuresRef.current?.value;
        let appartmentPrice = appartmentPriceRef.current?.value;
        let unitPrice = unitPriceRef.current?.value;
        let levelPrice = levelPriceRef.current?.value;
        let unitRent = unitRentRef.current?.value;
        let singleRoomRent = singleRoomRentRef.current?.value;
        let district = districtRef.current?.value;
        let thana = thanaRef.current?.value;
        let zipCode = zipCodeRef.current?.value;
        let address = addressRef.current?.value;
        let roadNumber = roadNumberRef.current?.value;

        RentersPropertiesUpdate(id, houseName, houseNumber, unitNumber, levelNumber, unitPerLevel, features, appartmentPrice, unitPrice, levelPrice, unitRent, singleRoomRent, district, thana, zipCode, address, roadNumber).then((result) => {
          if (result === true) {
            setLoading(false);
            navigate("/RentersDashboard");
            SuccessToast("Data Updated Success !");
          } else {
            ErrorToast("Something Went Wrong !");
            setLoading(false);
          }
        });
      };





  return (
    <Fragment>
      <div className='container'>
      <form encType="multipart/form-data">
        <div className='row'>
          <div className='col-md-6'>
            <div className='card shadow posterWrapper animated flipInX mt-3 mb-3'>
                <div className='row'>
                  <div className='col-sm-3'>
                  <h4><MdBrowserUpdated/></h4>
                  </div>
                  <div className='col-sm-9'>
                  <h4>Update !</h4>
                  </div>
                </div>
            </div>
            <div className='allInputs2'>
                {/* <div className='productName mb-4'>
                <label>Product Categories</label>
                    <select ref={categoriesRef} className='form-control animated fadeInUp' value={Category} onChange={handleCategoryChange}>
                        <option selected>Select Categories</option>
                        <option value="singleRoom">Rent Single Room</option>
                        <option value="apartmentSell">Apartment Sell</option>
                        <option value="rentBachelor">Rent Bachelor</option>
                        <option value="rentFamily">Rent Family</option>
                        <option value="sellUnit">Sell Unit</option>
                        <option value="sellLevel">Sell Level</option>
                    </select>
                </div> */}
                <div className='row mb-4'>
                    <div className='col-md-6' >
                        <label >House Name</label>
                        <input ref={houseNameRef} defaultValue={HouseName}  type='text' maxlength="15" className='form-control animated fadeInUp' placeholder='Enter House Name'/>
                    </div>
                    <div className='col-md-6'>
                        <label >House Number</label>
                        <input ref={houseNumberRef} defaultValue={HouseNumber}  type='text' className='form-control animated fadeInUp' placeholder='Enter House Number'/>
                    </div>
                </div>

                <div className='row'>
                    {UnitNumber && (
                    <div className='col-md-6'>
                        <label>Unit Number</label>
                        <input
                        ref={unitNumberRef}
                        defaultValue={UnitNumber}
                        type='text'
                        className='form-control animated fadeInUp'
                        placeholder='Enter Unit Number'
                        />
                    </div>
                    )}

                    {LevelNumber && (
                    <div className='col-md-6'>
                    <label >Level Number</label>
                        <select ref={levelNumberRef} value={LevelNumber}  className='form-control animated fadeInUp' onChange={handleLevelNumberChange}>
                            <option value="">Select Level Number</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </div>

                    )}
                </div>
                {UnitsPerLevel && (
                <div className='productName mb-4'>
                <label >Units Per Level</label>
                <select ref={unitPerLevelRef} value={UnitsPerLevel} className='form-control animated fadeInUp' onChange={handleUnitsPerLevelChange}>
                        <option value="">Select Units Per Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                )}
                <div className='features mb-3'>
                  <label className='mb-2'>Fetures</label>
                  <textarea ref={featuresRef} defaultValue={Features}  placeholder="Write Your Extra Features" className='form-control animated fadeInUp' rows="9" cols="50"></textarea>
                </div>
            </div>
          </div>
          <div className='col-md-6'>
              <div className='allInputs2'>
                <div className='row my-4'></div>
                <div className='row'>
                    {AppartmentPrice && (
                    <div className='col-md-6'>
                    <label >Appartment Price</label>
                    <input ref={appartmentPriceRef} defaultValue={AppartmentPrice}  type='text' className='form-control animated fadeInUp' placeholder='Enter Appartment Price'/>
                    </div>
                    )
                    }
                    {UnitPrice && (
                    <div className='col-md-6'>
                    <label >Unit Price</label>
                    <input ref={unitPriceRef} defaultValue={UnitPrice} type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Price'/>
                    </div>
                    )
                    }
                </div>
                <div className='row py-4'>
                {LevelPrice && (
                    <div className='col-md-12'>
                    <label >Level Price</label>
                    <input ref={levelPriceRef} defaultValue={LevelPrice}  type='text' className='form-control animated fadeInUp' placeholder='Enter Level Price'/>
                </div>
                )}
                </div>
                <div className='row mb-4'>
                    {UnitRentPrice && (
                        <div className='col-md-12'>
                        <label >Unit Rent</label>
                        <input ref={unitRentRef} defaultValue={UnitRentPrice} type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Rent'/>
                    </div>
                    )}
                </div>
                <div className='row mb-4'>
                {RoomRentPrice && (
                    <div className='col-md-6'>
                    <label >Single Room Rent</label>
                        <input ref={singleRoomRentRef} defaultValue={RoomRentPrice}  type='text' className='form-control animated fadeInUp' placeholder='Enter Single Room Rent'/>
                    </div>
                )}
                    <div className='col-md-6'>
                        <label>Select District</label>
                        <select ref={districtRef} value={District} className='form-control animated fadeInUp' onChange={handleDistrictChange}>

                            <option value="">Select District</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Faridpur">Faridpur</option>
                            <option value="Gazipur">Gazipur</option>
                            <option value="Gopalganj">Gopalganj</option>
                            <option value="Jamalpur">Jamalpur</option>
                            <option value="Kishoreganj">Kishoreganj</option>
                            <option value="Madaripur">Madaripur</option>
                            <option value="Manikganj">Manikganj</option>
                            <option value="Munshiganj">Munshiganj</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Narayanganj">Narayanganj</option>
                            <option value="Narsingdi">Narsingdi</option>
                            <option value="Netrokona">Netrokona</option>
                            <option value="Rajbari">Rajbari</option>
                            <option value="Shariatpur">Shariatpur</option>
                            <option value="Sherpur">Sherpur</option>
                            <option value="Tangail">Tangail</option>
                            <option value="Bogra">Bogra</option>
                            <option value="Joypurhat">Joypurhat</option>
                            <option value="Naogaon">Naogaon</option>
                            <option value="Natore">Natore</option>
                            <option value="Nawabganj">Nawabganj</option>
                            <option value="Pabna">Pabna</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Sirajgonj">Sirajgonj</option>
                            <option value="Dinajpur">Dinajpur</option>
                            <option value="Gaibandha">Gaibandha</option>
                            <option value="Kurigram">Kurigram</option>
                            <option value="Lalmonirhat">Lalmonirhat</option>
                            <option value="Nilphamari">Nilphamari</option>
                            <option value="Panchagarh">Panchagarh</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Thakurgaon">Thakurgaon</option>
                            <option value="Barguna">Barguna</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Bhola">Bhola</option>
                            <option value="Jhalokati">Jhalokati</option>
                            <option value="Patuakhali">Patuakhali</option>
                            <option value="Pirojpur">Pirojpur</option>
                            <option value="Bandarban">Bandarban</option>
                            <option value="Brahmanbaria">Brahmanbaria</option>
                            <option value="Chandpur">Chandpur</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Comilla">Comilla</option>
                            <option value="Cox's Bazar">Cox's Bazar</option>
                            <option value="Feni">Feni</option>
                            <option value="Khagrachari">Khagrachari</option>
                            <option value="Lakshmipur">Lakshmipur</option>
                            <option value="Noakhali">Noakhali</option>
                            <option value="Rangamati">Rangamati</option>
                            <option value="Habiganj">Habiganj</option>
                            <option value="Maulvibazar">Maulvibazar</option>
                            <option value="Sunamganj">Sunamganj</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Bagerhat">Bagerhat</option>
                            <option value="Chuadanga">Chuadanga</option>
                            <option value="Jessore">Jessore</option>
                            <option value="Jhenaidah">Jhenaidah</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Kushtia">Kushtia</option>
                            <option value="Magura">Magura</option>
                            <option value="Meherpur">Meherpur</option>
                            <option value="Narail">Narail</option>
                            <option value="Satkhira">Satkhira</option>
                        </select>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                    <label >Thana</label>
                        <input ref={thanaRef} defaultValue={Thana}  type='text' className='form-control animated fadeInUp' placeholder='Enter Your Thana'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Zip Code</label>
                        <input ref={zipCodeRef} defaultValue={ZipCode} type='text' className='form-control animated fadeInUp' placeholder='Enter Your Zip Code'/>
                    </div>
                </div>

                <div className='row '>
                    <div className='col-md-6'>
                    <label >Address</label>
                        <input ref={addressRef} defaultValue={Address} type='text' className='form-control animated fadeInUp' placeholder='Enter Address'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Road Number</label>
                        <input ref={roadNumberRef} defaultValue={RoadNumber} type='text' className='form-control animated fadeInUp' placeholder='Enter Road Number'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <Button onClick={OnUpdate}  className='form-control btn btn-info text-dark animated fadeInUp shadow' disabled={loading}>
                        {loading ? "Updated..." : "Update"} <GrUpdate/>
                        
                        </Button>
                    </div>
                </div>

            </div>

          </div>
        </div>
        </form>
      </div>


      <Footer />
    </Fragment>
  )
}

export default UpdateRoom
