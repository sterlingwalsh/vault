import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import InventoryProvider, {
  InventoryContext
} from './contexts/inventory/inventory.provider';
import FilterProvider, {
  FilterContext
} from './contexts/filter/filter.provider';

import ContextLogger from './context-logger';

const contexts = [['Inventory', InventoryContext], ['Filter', FilterContext]];

ReactDOM.render(
  <InventoryProvider>
    <InventoryContext.Consumer>
      {value => (
        <FilterProvider {...value}>
          <ContextLogger contexts={contexts} />
          <App />
        </FilterProvider>
      )}
    </InventoryContext.Consumer>
  </InventoryProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
