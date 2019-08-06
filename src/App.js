import React from 'react';

import Header from './components/header/header.component';
import ItemContainer from './components/item-container/item-container.component';
import Filter from './components/filter/filter.component';

import GlobalStyle from './global.styles';

// import { getGameData } from './util/steamapi';

import './App.scss';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <section className='main-section'>
        <Filter className='filter' />
        <ItemContainer className='item-container' />
      </section>
    </div>
  );
};

export default App;
