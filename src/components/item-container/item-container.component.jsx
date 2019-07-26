import React from 'react';

import Item from '../item/item.component';

import './item-container.styles.scss';

const ItemContainer = ({ ...otherProps }) => {
  const items = Array(12)
    .fill(null)
    .map((item, i) => <Item key={i} gameId={1930} expanded={i === 2} />);
  return (
    <div {...otherProps} className='item-container'>
      {items}
    </div>
  );
};

export default ItemContainer;
