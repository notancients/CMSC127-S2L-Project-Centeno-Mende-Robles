import LandingPage from './pages/landingpage/page_landing';
import Login from './pages/login/page_login';
import EstablishmentList from './pages/establishment_list/page_establishment_list';
import HomePage from './pages/homepage/page_homepage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {

  return(
    <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/view-all-establishments" element={<EstablishmentList />}></Route>
        <Route path="/homepage" element={<HomePage/>}></Route>
    
    </Routes>
  )
}

export default Router;