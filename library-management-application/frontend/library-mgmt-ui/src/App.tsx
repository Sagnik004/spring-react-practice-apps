import React from 'react';

import './App.css';
import Navbar from './components/layouts/navbar/Navbar';
import ExploreTopBooks from './components/layouts/homePage/ExploreTopBooks';
import Carousel from './components/layouts/homePage/Carousel';
import Heros from './components/layouts/homePage/Heros';

const App = () => {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
    </div>
  );
};

export default App;
