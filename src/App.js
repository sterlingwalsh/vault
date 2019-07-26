import React from 'react';

import Header from './components/header/header.component';
import ItemContainer from './components/item-container/item-container.component';
import Filter from './components/filter/filter.component';

// import { getGameData } from './util/steamapi';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {}
    };
  }

  componentDidMount() {}

  render() {
    // console.log(this.state);
    return (
      <div>
        <Header />
        <section className='main-section'>
          <Filter className='filter' />
          <ItemContainer className='item-container' />
        </section>
      </div>
    );
  }
}

export default App;
