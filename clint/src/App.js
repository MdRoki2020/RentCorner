import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import Page404 from './Pages/Users/Page404';
import PostRoomLayout from './Layout/PostRoomLayout';
import UserSigninLayout from './Layout/UserSigninLayout';
import RentersDashboardLayout from './Layout/RentersDashboardLayout';
import UserSignUpLayout from './Layout/UserSignUpLayout';
import SendOtp from './AccountRecover/SendOtp';
import VerifyOtp from './AccountRecover/VerifyOtp';
import CreatePassword from './AccountRecover/CreatePassword';
import UpdateMapLayout from './Layout/UpdateMapLayout';
import TrackerLayout from './Layout/TrackerLayout';
import PropertiesCategoryLayout from './Layout/PropertiesCategoryLayout';

function App() {
  return (
    <Fragment>
        <BrowserRouter>
        
        <Routes>
          {/* For User */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/Tracker" element={<TrackerLayout />} />
          <Route path="/PropertiesCategory/:categories" element={<PropertiesCategoryLayout />} />
          <Route path="*" element={<Page404/>} />
          
          {/* For Renters */}
          <Route path="/PostRoom" element={<PostRoomLayout/>} />
          <Route path="/RentersLogin" element={<UserSigninLayout/>} />
          <Route path="/RentersRegistration" element={<UserSignUpLayout/>} />
          <Route path="/RentersDashboard" element={<RentersDashboardLayout/>} />
          <Route path="/UpdateMap/:id" element={<UpdateMapLayout/>} />

          {/* For Admin */}
          




          {/* for recovery password */}
          <Route path="/sendOtp" element={<SendOtp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/createPassword" element={<CreatePassword />} />
          
        </Routes>

        </BrowserRouter>
      </Fragment>
  );
}

export default App;
