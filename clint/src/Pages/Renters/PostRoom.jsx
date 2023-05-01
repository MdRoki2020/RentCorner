import React, { Fragment, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import '../../Assets/Styles/PostRoom.css'
import Swal from 'sweetalert2'

import { MdPublish } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { Button } from 'react-bootstrap';
import Footer from '../Users/Footer';
import { ErrorToast } from '../../Helper/FormHelper';
import axios from 'axios';

const PostRoom = () => {

    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    let renterEmail="mroki815@gmail.com";

        const categoriesRef = useRef();
        const houseNameRef = useRef();
        const houseNumberRef = useRef();
        const unitNumberRef = useRef();
        const levelNumberRef = useRef();
        const unitPerLevelRef = useRef();
        const featuresRef = useRef();
        const roomImageRef = useRef();
        const dynamicImageRef = useRef();
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

    const OnPost= async ()=>{

        setLoading(true);
    
        let categories = categoriesRef.current.value;
        let houseName = houseNameRef.current.value;
        let houseNumber = houseNumberRef.current.value;
        let unitNumber = unitNumberRef.current.value;
        let levelNumber = levelNumberRef.current.value;
        let unitPerLevel = unitPerLevelRef.current.value;
        let features = featuresRef.current.value;
        let roomImages = roomImageRef.current.files;
        let dynamicImage = dynamicImageRef.current.files[0];
        let appartmentPrice = appartmentPriceRef.current.value;
        let unitPrice = unitPriceRef.current.value;
        let levelPrice = levelPriceRef.current.value;
        let unitRent = unitRentRef.current.value;
        let singleRoomRent = singleRoomRentRef.current.value;
        let district = districtRef.current.value;
        let thana = thanaRef.current.value;
        let zipCode = zipCodeRef.current.value;
        let address = addressRef.current.value;
        let roadNumber = roadNumberRef.current.value;


        const formData = new FormData();
        formData.append("RenterEmail", renterEmail);
        formData.append("Category", categories);
        formData.append("HouseName", houseName);
        formData.append("HouseNumber", houseNumber);
        formData.append("UnitNumber", unitNumber);
        formData.append("LevelNumber", levelNumber);
        formData.append("UnitsPerLevel", unitPerLevel);
        formData.append("Features", features);
        for (let i = 0; i < roomImages.length; i++) {
        formData.append("Image", roomImages[i]);
        }
        formData.append("DynamicImage", dynamicImage);
        formData.append("AppartmentPrice", appartmentPrice);
        formData.append("UnitPrice", unitPrice);
        formData.append("LevelPrice", levelPrice);
        formData.append("UnitRentPrice", unitRent);
        formData.append("RoomRentPrice", singleRoomRent);
        formData.append("District", district);
        formData.append("Thana", thana);
        formData.append("ZipCode", zipCode);
        formData.append("Address", address);
        formData.append("RoadNumber", roadNumber);


        try {
            const response = await axios.post('http://localhost:8000/api/v1/CreateRooms', formData);
            setLoading(false);
            success();


            categoriesRef.current.value = "";
            houseNameRef.current.value = "";
            houseNumberRef.current.value = "";
            unitNumberRef.current.value = "";
            levelNumberRef.current.value = "";
            unitPerLevelRef.current.value = "";
            featuresRef.current.value = "";
            roomImageRef.current.value = "";
            dynamicImageRef.current.value = "";
            appartmentPriceRef.current.value = "";
            unitPriceRef.current.value = "";
            levelPriceRef.current.value = "";
            unitRentRef.current.value = "";
            singleRoomRentRef.current.value = "";
            districtRef.current.value = "";
            thanaRef.current.value = "";
            zipCodeRef.current.value = "";
            addressRef.current.value = "";
            roadNumberRef.current.value = "";


          } catch (error) {
            ErrorToast("Somethis Went Wrong !");
            setLoading(false);
          }

    }



const success=()=>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}




  return (
    <Fragment>
      <div className='container'>
      <form encType="multipart/form-data">
        <div className='row'>
          <div className='col-md-6'>

            <div className='card shadow posterWrapper animated flipInX mt-3'>
                <div className='row'>
                  <div className='col-sm-3'>
                  <h4><MdPublish/></h4>
                  </div>
                  <div className='col-sm-9'>
                  <h4>Post's !</h4>
                  </div>
                </div>
            </div>

            <div className='allInputs2'>

                
                <div className='productName mb-4'>
                <label>Product Categories</label>

                    <select ref={categoriesRef} onChange={handleOptionChange}  className='form-control animated fadeInUp'>
                        <option selected>Select Categories</option>
                        <option value="singleRoom">Rent Single Room</option>
                        <option value="apartmentSell">Apartment Sell</option>
                        <option value="rentBachelor">Rent Bachelor</option>
                        <option value="rentFamily">Rent Family</option>
                        <option value="sellUnit">Sell Unit</option>
                        <option value="sellLevel">Sell Level</option>
                    </select>

                </div>


                <div className='row mb-4'>
                    <div className='col-md-6' >
                        <label >House Name</label>
                        <input ref={houseNameRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }   type='text' maxlength="15" className='form-control animated fadeInUp' placeholder='Enter House Name'/>
                    </div>
                    <div className='col-md-6'>
                        <label >House Number</label>
                        <input ref={houseNumberRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter House Number'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <label >Unit Number</label>
                        <input ref={unitNumberRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Number'/>
                    </div>
                    <div className='col-md-6'>
                        <label >Level Number</label>
                            <select ref={levelNumberRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit" && selectedOption !== "sellLevel"}  className='form-control animated fadeInUp'>
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
                </div>

                <div className='productName mb-4'>
                  <label >Units Per Level</label>
                    <select ref={unitPerLevelRef} disabled={selectedOption !== "apartmentSell" && selectedOption !=="sellUnit" && selectedOption !=="sellLevel"} className='form-control animated fadeInUp'>
                            <option value="">Select Units Per Level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                </div>

                <div className='features'>
                  <label className='mb-2'>Fetures</label>
                  <textarea ref={featuresRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  placeholder="Write Your Extra Features" className='form-control animated fadeInUp' rows="9" cols="50"></textarea>
                </div>
                

            </div>
          </div>
          <div className='col-md-6'>

              <div className='allInputs2'>

                <div className='row my-4'>
                    <div className='col-md-6'>
                        <label >Room Images</label> <i> [ Select Exact 3 Images ] </i>
                        <input ref={roomImageRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  type='file' className='form-control animated fadeInUp' accept="image/*" multiple onChange={handleFileChange} />
                    </div>
                    <div className='col-md-6'>
                        <label >3D Image</label> <i> [ Select Exact 1 Images ] </i>
                        <input ref={dynamicImageRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='file' className='form-control animated fadeInUp'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <label >Appartment Price</label>
                        <input ref={appartmentPriceRef} disabled={selectedOption !== "apartmentSell"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Appartment Price'/>
                    </div>
                    <div className='col-md-6'>
                        <label >Unit Price</label>
                        <input ref={unitPriceRef} disabled={selectedOption !=="sellUnit"} type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Price'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <label >Level Price</label>
                        <input ref={levelPriceRef} disabled={selectedOption !=="sellLevel"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Level Price'/>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-12'>
                        <label >Unit Rent</label>
                        <input ref={unitRentRef} disabled={selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit" } type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Rent'/>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                    <label >Single Room Rent</label>
                        <input ref={singleRoomRentRef} disabled={selectedOption !== "singleRoom"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Single Room Rent'/>
                    </div>

                    <div className='col-md-6'>
                        <label>Select District</label>
                        <select ref={districtRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  className='form-control animated fadeInUp'>

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
                        <input ref={thanaRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  type='text' className='form-control animated fadeInUp' placeholder='Enter Your Thana'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Zip Code</label>
                        <input ref={zipCodeRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Your Zip Code'/>
                    </div>
                </div>

                <div className='row '>
                    <div className='col-md-6'>
                    <label >Address</label>
                        <input ref={addressRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Address'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Road Number</label>
                        <input ref={roadNumberRef} disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Road Number'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <Button onClick={OnPost} className='form-control btn btn-warning text-dark animated fadeInUp shadow' disabled={loading}>
                            {/* Next <GrNext/> */}
                            {loading ? "Uploading..." : "Save"} <AiOutlineSave/>
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


  //Multiple image Validation..
  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length !== 3) {
    ErrorToast('Please select exactly 3 images.');
    event.target.value = null;
    return;
    }
    }




    //Input Enable Disable
    function handleOptionChange(event){
        setSelectedOption(event.target.value);
    };



}

export default PostRoom