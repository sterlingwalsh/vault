import React from 'react';

import Item from '../item/item.component';

import { Container } from './item-container.styles.jsx';

const ItemContainer = ({ ...otherProps }) => {
  const items = Array(12)
    .fill(null)
    .map((item, i) => <Item key={i} gameId={1930} expanded={i === 2} />);
  return (
    <Container {...otherProps} className='item-container'>
      {items}
    </Container>
  );
};

export default ItemContainer;
