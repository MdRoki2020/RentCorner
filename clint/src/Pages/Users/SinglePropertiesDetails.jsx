import React, { useEffect, useState } from 'react';
import { TbDetails } from 'react-icons/tb';
import { ReadDataById } from '../../API Request/APIRequest';
import { useParams } from 'react-router-dom';
import '../../Assets/Styles/singlePropertiesDetails.css';
import ReactImageMagnify from 'react-image-magnify';
import { Pannellum } from 'pannellum-react';

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
  let dynamicImage = data[0]?.DynamicImage;

  useEffect(() => {
    setMainImage(firstImage);
  }, [firstImage]);

  console.log(data);

  return (
    <div className="container">
        <div className='row'>
        <div className='col-md-12'>
            <div className='card CategoriesPosterWrapper animated flipInX my-4'>
            <div className='row'>
                <div className='col-sm-2'>
                <h2 className="mt-3 mx-3">
                <TbDetails />
                </h2>
                </div>
                <div className='col-sm-10'>
                <div className='posterText'>
                <h2>Details</h2>
                <p>Single Properties Details</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

      <div className="row">
        <div className="col-md-4">
          <div className="product-image-viewer">
          <div className="main-image-viewer img-fluid">
            {mainImage && (
                <ReactImageMagnify
                {...{
                    smallImage: {
                    alt: 'productImage',
                    isFluidWidth: true,
                    src: mainImage,
                    },
                    largeImage: {
                    src: mainImage,
                    width: 1200,
                    height: 1800,
                    },
                    style: {
                    zIndex: 9999,
                    },
                }}
                />
            )}
            </div>

            <div className="small-image-viewers">
              <img
                className="img-fluid img-thumbnail mb-3"
                src={firstImage}
                alt="Image 0"
                onClick={() => handleImageClick(firstImage)}
              />
              <img
                className="img-fluid img-thumbnail mb-3"
                src={secondImage}
                alt="Image 1"
                onClick={() => handleImageClick(secondImage)}
              />
              <img
                className="img-fluid img-thumbnail mb-3"
                src={thirdImage}
                alt="Image 2"
                onClick={() => handleImageClick(thirdImage)}
              />
              {/* Add more small images here */}
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
        <Pannellum
            width="100%"
            height="400px"
            image={dynamicImage}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            autoRotate={20}
            onLoad={() => {
            console.log("panorama loaded");
            }}
        />
        </div>
      </div>
    </div>
  );
};

export default SinglePropertiesDetails;
