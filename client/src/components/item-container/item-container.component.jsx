import React, { useEffect, useContext } from 'react';

import Item from '../item/item.component';

import { Container } from './item-container.styles.jsx';

import { InventoryContext } from '../../contexts/inventory/inventory.provider';
import { FilterContext } from '../../contexts/filter/filter.provider';

const ItemContainer = ({ ...otherProps }) => {
  const {
    fetchInventory,
    setCurrentGamesDisplay,
    currentGamesDisplayData
  } = useContext(InventoryContext);

  const { itemsListFiltered } = useContext(FilterContext);

  useEffect(fetchInventory, []);

  useEffect(() => {
    setCurrentGamesDisplay(
      itemsListFiltered.slice(0, 15).map(item => item.steam_appid)
    );
  }, [itemsListFiltered, setCurrentGamesDisplay]);

  console.log({ currentGamesDisplayData });
  return (
    <Container {...otherProps} className='item-container'>
      {currentGamesDisplayData.map((item, i) => (
        <Item key={i} gameData={item} />
      ))}
    </Container>
  );
};

export default ItemContainer;
