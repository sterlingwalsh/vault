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

import createContextLogger from './deep equality logger/context-logger';

// import { runTests } from './diff-test';
// runTests();

const contexts = [['Inventory', InventoryContext], ['Filter', FilterContext]];
const Logger = createContextLogger({
  contexts,
  comparisonOptions: { skipFunctions: true }
});

ReactDOM.render(
  <InventoryProvider>
    <InventoryContext.Consumer>
      {value => (
        <FilterProvider {...value}>
          <Logger />
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
