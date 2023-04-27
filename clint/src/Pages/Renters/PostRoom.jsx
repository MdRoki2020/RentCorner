import React, { Fragment, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import '../../Assets/Styles/PostRoom.css'
import { MdPublish } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { Button } from 'react-bootstrap';
import Footer from '../Users/Footer';
import { ErrorToast } from '../../Helper/FormHelper';

const PostRoom = () => {
    const [selectedOption, setSelectedOption] = useState("");




  return (
    <Fragment>
      <div className='container'>
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

                    <select onChange={handleOptionChange}  className='form-control animated fadeInUp'>
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
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }   type='text' maxlength="15" className='form-control animated fadeInUp' placeholder='Enter House Name'/>
                    </div>
                    <div className='col-md-6'>
                        <label >House Number</label>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter House Number'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <label >Unit Number</label>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Number'/>
                    </div>
                    <div className='col-md-6'>
                        <label >Level Number</label>
                            <select disabled={selectedOption !== "singleRoom" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit" && selectedOption !== "sellLevel"}  className='form-control animated fadeInUp'>
                                <option selected>Select Level Number</option>
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
                    <select disabled={selectedOption !== "apartmentSell" && selectedOption !=="sellUnit" && selectedOption !=="sellLevel"} className='form-control animated fadeInUp'>
                            <option selected>Select Units Per Level</option>
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
                  <textarea disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  placeholder="Write Your Extra Features" className='form-control animated fadeInUp' rows="9" cols="50"></textarea>
                </div>
                

            </div>
          </div>
          <div className='col-md-6'>
              <form enctype="multipart/form-data">
              <div className='allInputs2'>

                <div className='row my-4'>
                    <div className='col-md-6'>
                        <label >Room Images</label> <i> [ Select Exact 3 Images ] </i>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  type='file' className='form-control animated fadeInUp' accept="image/*" multiple onChange={handleFileChange} />
                    </div>
                    <div className='col-md-6'>
                        <label >3D Image</label> <i> [ Select Exact 1 Images ] </i>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='file' className='form-control animated fadeInUp'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        <label >Appartment Price</label>
                        <input disabled={selectedOption !== "apartmentSell"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Appartment Price'/>
                    </div>
                    <div className='col-md-6'>
                        <label >Unit Price</label>
                        <input disabled={selectedOption !=="sellUnit"} type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Price'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <label >Level Price</label>
                        <input disabled={selectedOption !=="sellLevel"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Level Price'/>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-12'>
                        <label >Unit Rent</label>
                        <input disabled={selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !=="sellUnit" } type='text' className='form-control animated fadeInUp' placeholder='Enter Unit Rent'/>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                    <label >Single Room Rent</label>
                        <input disabled={selectedOption !== "singleRoom"}  type='text' className='form-control animated fadeInUp' placeholder='Enter Single Room Rent'/>
                    </div>

                    <div className='col-md-6'>
                        <label>Select District</label>
                        <select disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  className='form-control animated fadeInUp'>

                            <option >Select District</option>
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
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" }  type='text' className='form-control animated fadeInUp' placeholder='Enter Your Thana'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Zip Code</label>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Your Zip Code'/>
                    </div>
                </div>

                <div className='row '>
                    <div className='col-md-6'>
                    <label >Address</label>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Address'/>
                    </div>

                    <div className='col-md-6'>
                    <label >Road Number</label>
                        <input disabled={selectedOption !== "singleRoom" && selectedOption !== "apartmentSell" && selectedOption !== "rentBachelor" && selectedOption !== "rentFamily" && selectedOption !== "sellUnit" && selectedOption !== "sellLevel" } type='text' className='form-control animated fadeInUp' placeholder='Enter Road Number'/>
                    </div>
                </div>

                <div className='row py-4'>
                    <div className='col-md-12'>
                        <Button  className='form-control btn btn-warning text-dark animated fadeInUp shadow'>Next <GrNext/></Button>
                    </div>
                </div>

            </div>
              </form>
          </div>
        </div>
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