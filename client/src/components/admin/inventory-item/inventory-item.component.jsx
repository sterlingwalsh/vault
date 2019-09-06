import React from 'react';

import Spinner from '../../custom-controls/spinner/spinner.component';

const InventoryItem = ({ ...otherProps }) => {
  return (
    <Spinner
      onClick={evt => {
        console.log(evt.target.value);
      }}
    ></Spinner>
  );
};

export default InventoryItem;
