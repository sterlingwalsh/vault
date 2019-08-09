import React from 'react';

import Header from './components/header/header.component';
import ItemContainer from './components/item-container/item-container.component';
import Filter from './components/filter/filter.component';

import GlobalStyle from './global.styles';

// import { getGameData } from './util/steamapi';

import { MainSection, FilterContainer, Body } from './App.styles.jsx';

const App = () => {
  return (
    <Body>
      <GlobalStyle />
      <Header className='header' />
      <MainSection>
        <FilterContainer>
          <Filter className='filter' />
        </FilterContainer>
        <ItemContainer className='item-container' />
      </MainSection>
    </Body>
  );
};

export default App;
