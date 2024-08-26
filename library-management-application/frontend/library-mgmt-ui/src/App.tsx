import React from 'react';

import './App.css';
import HomePage from './layouts/homePage/HomePage';
import Navbar from './layouts/navbar/Navbar';
import Footer from './layouts/footer/Footer';
import SearchBooksPage from './layouts/searchBooksPage/SearchBooksPage';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage />
      <Footer />
    </div>
  );
};

export default App;
