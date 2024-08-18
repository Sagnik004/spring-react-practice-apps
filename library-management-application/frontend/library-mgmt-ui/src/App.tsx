import React from 'react';

import './App.css';
import Navbar from './components/layouts/navbar/Navbar';
import ExploreTopBooks from './components/layouts/homePage/ExploreTopBooks';

const App = () => {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
    </div>
  );
};

export default App;
