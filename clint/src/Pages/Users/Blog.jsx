import React, { Fragment } from 'react'
import { FaBlog } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import Blog1 from  "../../Assets/Images/blog1.jpg"
import Blog2 from  "../../Assets/Images/blog2.jpg"
import Blog3 from  "../../Assets/Images/blog3.jpg"
import Blog4 from  "../../Assets/Images/blog4.jpg"
import { Link } from 'react-router-dom';
import '../../Assets/Styles/Blog.css'
import 'hover.css/css/hover-min.css';
import Footer from './Footer';

const Blog = () => {
  return (
    <Fragment>
      <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card shadow trackerposterWrapper animated flipInX my-4 '>
                <div className='row'>
                  <div className='col-sm-3'>
                    <h3 className='mt-3'><FaBlog/></h3>
                  </div>
                  <div className='col-sm-9'>
                    <div className='posterText'>
                      <h2>Blog</h2>
                      <p><GrBlog/> Popular Area's With Furnished Apartments !</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='BlogWrapper'>
            <div className='row'>
              <div className='col-md-6'>
                  <div className='BlogListWrapper card shadow animated fadeInUp mb-2'>
                      <div className='loveList'>
                        <div className='row'>
                          <div className='col-sm-6'>
                          <Link to={'/'}>
                            <img className='img-fluid img-thumbnail' width="150px" src={Blog2} alt="blogImage" />
                          </Link>
                          </div>
                          <div className='col-md-6'>
                          <div className='details'>
                            <p className=''>
                              The top places in Dhaka are for the facilities and amenities near where you live. Dhaka, the country’s capital of Bangladesh, has seen a lot of progress and expansion in both socioeconomic fields. Therefore, people are moving to the capital city more and more every day, which means there is always a high supply of housing in the residential parts of the city. 
                            </p>
                          </div>
                          </div>
                            <p className='text-center'>
                            <span className=''><i>1-July-2023</i></span>
                            </p>
                        </div>
                      </div>
                  </div>
              </div>

              <div className='col-md-6'>
                  <div className='BlogListWrapper card shadow animated fadeInUp mb-2'>
                      <div className='loveList'>
                        <div className='row'>
                          <div className='col-sm-6'>
                          <Link to={'/'}>
                            <img className='img-fluid img-thumbnail' width="150px" src={Blog1} alt="blogImage" />
                          </Link>
                          </div>
                          <div className='col-md-6'>
                          <div className='details'>
                            <p className=''>
                            Renting property in Dhaka, particularly for newcomers, can often become unaffordable due to limited market knowledge. If you find this intimidating, don't worry. These tips can simplify negotiations and boost your skills. A straightforward, practical approach usually helps, except in high-demand areas. Many struggle with rent negotiations.
                            </p>
                          </div>
                          </div>
                            <p className='text-center'>
                            <span className=''><i>23-August-2023</i></span>
                            </p>
                        </div>
                      </div>
                  </div>
              </div>


              <div className='col-md-6'>
                  <div className='BlogListWrapper card shadow animated fadeInUp mb-2'>
                      <div className='loveList'>
                        <div className='row'>
                          <div className='col-sm-6'>
                          <Link to={'/'}>
                            <img className='img-fluid img-thumbnail' width="150px" src={Blog3} alt="blogImage" />
                          </Link>
                          </div>
                          <div className='col-md-6'>
                          <div className='details'>
                            <p className=''>
                            When purchasing a house, you don't always require a real estate agent for property viewings. The internet offers numerous options to showcase available homes. Prospective tenants can directly access leasing websites with comprehensive property information. We've assessed ideal apartment search platforms for listing properties.
                            </p>
                          </div>
                          </div>
                            <p className='text-center'>
                            <span className=''><i>5-September-2023</i></span>
                            </p>
                        </div>
                      </div>
                  </div>
              </div>

              <div className='col-md-6'>
                  <div className='BlogListWrapper card shadow animated fadeInUp mb-2'>
                      <div className='loveList'>
                        <div className='row'>
                          <div className='col-sm-6'>
                          <Link to={'/'}>
                            <img className='img-fluid img-thumbnail' width="150px" src={Blog4} alt="blogImage" />
                          </Link>
                          </div>
                          <div className='col-md-6'>
                          <div className='details'>
                            <p className=''>
                            If you're planning a move in Dhaka, consider notifying us! As a renter, you have the option to choose furnished apartments, which can save you time, money, and hassle when setting up your new home. This is especially convenient if you don't want to invest in new furniture. Dhaka offers numerous furnished apartment options.
                            </p>
                          </div>
                          </div>
                            <p className='text-center'>
                            <span className=''><i>20-Octobar-2023</i></span>
                            </p>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </Fragment>
  )
}

export default Blog
