import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './layouts/homePage/HomePage';
import Navbar from './layouts/navbar/Navbar';
import Footer from './layouts/footer/Footer';
import SearchBooksPage from './layouts/searchBooksPage/SearchBooksPage';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
};

export default App;
