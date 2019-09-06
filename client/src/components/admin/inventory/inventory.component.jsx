import React from 'react';

import { InventoryContainer } from './inventory.styles';

import InventoryItem from '../inventory-item/inventory-item.component';

const Inventory = ({ ...otherProps }) => (
  <InventoryContainer {...otherProps}>
    {[1, 2, 3, 4, 5].map(item => (
      <InventoryItem key={item}></InventoryItem>
    ))}
  </InventoryContainer>
);

export default Inventory;
