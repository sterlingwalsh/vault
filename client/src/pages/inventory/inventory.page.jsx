import React from 'react';

import { FilterContainer, InventoryContainer } from './inventory.styles.jsx';

import ItemContainer from '../../components/vault/item-container/item-container';
import Filter from '../../components/vault/filter/filter.component';

const InventoryPage = ({ ...otherProps }) => (
  <InventoryContainer>
    <FilterContainer>
      <Filter />
    </FilterContainer>
    <ItemContainer />
  </InventoryContainer>
);

export default InventoryPage;
