import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/vault/header/header.component';
import InventoryPage from './pages/inventory/inventory.page';
import AdminPage from './pages/admin/admin.page';

import GlobalStyle from './global.styles';

// import { getGameData } from './util/steamapi';

import { MainSection, Body } from './App.styles.jsx';

const App = (...AllProps) => {
  return (
    <Body>
      <GlobalStyle />
      <Router>
        <Header className='header' />
        <MainSection>
          <Route path='/vault/:id' component={InventoryPage} />
          <Route path='/admin/:id' component={AdminPage} />
          <Route path='/' exact component={InventoryPage} />
        </MainSection>
      </Router>
    </Body>
  );
};

export default App;
