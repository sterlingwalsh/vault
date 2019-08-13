import React, { useEffect } from 'react';

import Item from '../item/item.component';
import { connect } from 'react-redux';

import { Container } from './item-container.styles.jsx';

import { createStructuredSelector } from 'reselect';

import { selectCurrentGamesDisplay } from '../../redux/inventory/inventory.selectors';

import {
  fetchInventoryStart,
  setCurrentGamesDisplayStart
} from '../../redux/inventory/inventory.actions';

import { selectFilteredGames } from '../../redux/filter/filter.selectors';

const ItemContainer = ({
  filteredGames,
  currentGamesDisplay,
  fetchInventory,
  setCurrentGamesDisplay,
  ...otherProps
}) => {
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    setCurrentGamesDisplay(
      filteredGames.slice(0, 15).map(item => item.steam_appid)
    );
  }, [filteredGames, setCurrentGamesDisplay]);

  return (
    <Container {...otherProps} className='item-container'>
      {currentGamesDisplay.map((item, i) => (
        <Item key={i} gameData={item} />
      ))}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  filteredGames: selectFilteredGames,
  currentGamesDisplay: selectCurrentGamesDisplay
});

const mapDispatchToProps = dispatch => ({
  fetchInventory: () => dispatch(fetchInventoryStart()),
  setCurrentGamesDisplay: gameIds =>
    dispatch(setCurrentGamesDisplayStart(gameIds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemContainer);
