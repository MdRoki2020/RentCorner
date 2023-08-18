import React, {Fragment, useRef} from "react";
import {Container,Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {AiFillProfile, AiOutlineMenuUnfold, AiOutlineLogout, AiFillDashboard,AiOutlinePullRequest} from "react-icons/ai";
import {FaUserPlus} from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa";
import logo from "../../Assets/Images/logo.png";
import {getRenterDetails, removeSessions } from "../../Helper/SessionHelperPublisher";



const RentersNavigation = (props) => {

    let contentRef,sideNavRef=useRef();

    const onLogout=()=>{
        removeSessions();
    }


    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
      }


  return (
    <Fragment>
            <Navbar  className="fixed-top px-0 shadow-sm " style={{ backgroundColor: 'white' }}>
                <Container fluid={true}>
                    <Navbar.Brand >
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}><AiOutlineMenuUnfold/></a>
                        {/* <img className="nav-logo mx-2"  src={logo} alt="logo"/> */}
                        <i><span>B</span>ari<span>B</span>azar<span>B</span>d </i>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getRenterDetails()['imageUrl']} alt="profile image"/>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getRenterDetails()['imageUrl']} alt="profile image"/>
                                    <h6>{getRenterDetails()['FirstName']}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/Profile" className="side-bar-item">
                                    <AiFillProfile className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">

                <NavLink   className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/RentersDashboard"  end>
                    <AiFillDashboard className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/PostRoom" >
                    <FaUserPlus className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Post Rooms</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/BookingRequest" >
                    <AiOutlinePullRequest className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Booking Request</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/AgreementHistory" >
                    <FaRegHandshake className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Agreement History</span>
                </NavLink>

            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>

    </Fragment>
  )
}

export default RentersNavigation
