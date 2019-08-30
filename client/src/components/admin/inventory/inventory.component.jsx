import React from 'react';

import { InventoryContainer } from './inventory.styles';

const Inventory = ({ ...otherProps }) => (
  <InventoryContainer {...otherProps}></InventoryContainer>
);

export default Inventory;
