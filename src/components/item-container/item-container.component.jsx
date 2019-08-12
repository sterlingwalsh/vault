import React, { useEffect } from 'react';

import Item from '../item/item.component';
import { connect } from 'react-redux';

import { Container } from './item-container.styles.jsx';

import {
  fetchInventoryStart,
  setCurrentGamesDisplayStart
} from '../../redux/inventory/inventory.actions';

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
    setCurrentGamesDisplay(filteredGames.slice(0, 15));
  }, [filteredGames, setCurrentGamesDisplay]);

  const items = currentGamesDisplay.map((item, i) => (
    <Item key={i} gameData={item} />
  ));
  console.log({ currentGamesDisplay });
  return (
    <Container {...otherProps} className='item-container'>
      {items}
    </Container>
  );
};

const mapStateToProps = ({ inventory }) => ({
  filteredGames: inventory.filteredGames,
  currentGamesDisplay: inventory.currentGamesDisplay
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
