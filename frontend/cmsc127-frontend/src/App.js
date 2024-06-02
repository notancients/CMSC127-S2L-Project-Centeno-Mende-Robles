import './App.css';
import axios from "axios";

import { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landingpage/page_landing';
import Login from './pages/login/page_login';
import EstablishmentList from './pages/establishment_list/page_establishment_list';

function App() {

  return(
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/view-all-establishments" element={<EstablishmentList />}></Route>

    </Routes>
  )
}

export default App;
