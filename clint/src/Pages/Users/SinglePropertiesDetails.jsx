import React, { useEffect, useState } from 'react';
import { TbDetails } from 'react-icons/tb';
import { ReadDataById } from '../../API Request/APIRequest';
import { useParams } from 'react-router-dom';
import '../../Assets/Styles/singlePropertiesDetails.css';

const SinglePropertiesDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState('');

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    ReadDataById(id).then((data) => {
      setData(data);
    });
  }, [id]);

  let firstImage = data[0]?.Images[0]?.imageUrl;
  let secondImage = data[0]?.Images[1]?.imageUrl;
  let thirdImage = data[0]?.Images[2]?.imageUrl;

  useEffect(() => {
    setMainImage(firstImage);
  }, [firstImage]);

  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card CategoriesPosterWrapper animated flipInX my-4">
            <div className="row">
              <div className="col-sm-3">
                <h3 className="mt-3 mx-3">
                  <TbDetails />
                </h3>
              </div>
              <div className="col-sm-9">
                <div className="posterText">
                  <h2>Details</h2>
                  <p>Single Product Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className='col-md-4'>


        <div className="product-image-viewer">
          <div className="main-image-viewer">
            {mainImage && <img className='img-fluid img-thumbnail' src={mainImage} alt="Main Image" />}
          </div>
          <div className="small-image-viewers">
            <img
              className='img-fluid img-thumbnail'
              src={secondImage}
              alt="Image 1"
              onClick={() => handleImageClick(secondImage)}
            />
            <img
              className='img-fluid img-thumbnail'
              src={thirdImage}
              alt="Image 2"
              onClick={() => handleImageClick(thirdImage)}
            />
            {/* Add more small images here */}
          </div>
        </div>


        </div>
        <div className='col-md-7'></div>
      </div>
    </div>
  );
};

export default SinglePropertiesDetails;
