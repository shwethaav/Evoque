import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../pages/Main/Main";
const RouterComponent = () => {
  return (
     
    
      <Router>
        <Routes>
          <Route path="/Header" element={<Header />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
      
    
   
  );
};

export default RouterComponent;
