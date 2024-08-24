import React from 'react';

import './App.css';
import HomePage from './layouts/homePage/HomePage';
import Navbar from './layouts/navbar/Navbar';
import Footer from './layouts/footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
