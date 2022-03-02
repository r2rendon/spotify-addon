import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import logo from './logo.svg';
import './App.css';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import MyLibrary from './pages/MyLibrary';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path={ROUTES.HOME} element={ <Navigate to={"/search"}/> } />
        <Route path={ROUTES.SEARCH} element={ <Search/> } />
        <Route path={ROUTES.MY_LIBRARY} element={ <MyLibrary/> } />
      </Routes>
    </Router>
  );
};

export default App;
