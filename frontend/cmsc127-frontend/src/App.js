import './App.css';
import axios from "axios";

import { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Router from './react_router';
import AppBar from './pages/components/appbar';
import { LoginProvider } from './react_provider';

function App() {
  return(
    <>
      <LoginProvider>
      <AppBar/>
      <Router />
    </LoginProvider>
    </>
  )
}

export default App;
