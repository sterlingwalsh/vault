import React from 'react';

import Item from '../item/item.component';

import { Container } from './item-container.styles.jsx';

const ItemContainerComponent = ({
  currentGamesDisplayData = [],
  ...otherProps
}) => {
  return (
    <Container {...otherProps} className='item-container'>
      {currentGamesDisplayData.map((item, i) => (
        <Item key={i} gameData={item} />
      ))}
    </Container>
  );
};

export default ItemContainerComponent;
