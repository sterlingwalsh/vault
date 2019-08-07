import React from 'react';

import Header from './components/header/header.component';
import ItemContainer from './components/item-container/item-container.component';
import Filter from './components/filter/filter.component';

import GlobalStyle from './global.styles';

// import { getGameData } from './util/steamapi';

import { MainSection } from './App.styles.jsx';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <MainSection>
        <Filter className='filter' />
        <ItemContainer className='item-container' />
      </MainSection>
    </div>
  );
};

export default App;
