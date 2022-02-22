import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import logo from './logo.svg';
import './App.css';
import WebApp from './pages/WebApp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.WEB_APP} element={<WebApp/>} />
      </Routes>
    </Router>
  );
};

export default App;
