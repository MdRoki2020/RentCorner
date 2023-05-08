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

function App() {
  return (
    <Fragment>
        <BrowserRouter>
        
        <Routes>
          {/* For User */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="*" element={<Page404/>} />
          
          {/* For Renters */}
          <Route path="/PostRoom" element={<PostRoomLayout/>} />
          <Route path="/RentersLogin" element={<UserSigninLayout/>} />
          <Route path="/RentersRegistration" element={<UserSignUpLayout/>} />
          <Route path="/RentersDashboard" element={<RentersDashboardLayout/>} />

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
