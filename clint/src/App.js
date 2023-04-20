import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import Page404 from './Pages/Users/Page404';

function App() {
  return (
    <Fragment>
        <BrowserRouter>
        
        <Routes>
          {/* for user */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="*" element={<Page404/>}/>

          {/* For Renters */}


          {/* For Admin */}


          {/* for recovery password */}
          {/* <Route path="/sendOtp" element={<SendOtp />}/>
          <Route path="/verifyOtp" element={<VerifyOtp />}/>
          <Route path="/createPassword" element={<CreatePassword />} /> */}
          
        </Routes>

        </BrowserRouter>
      </Fragment>
  );
}

export default App;
