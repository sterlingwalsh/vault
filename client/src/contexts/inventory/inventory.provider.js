import React, { createContext, useState, useEffect, useCallback } from 'react';

import { inventory_trimmed } from '../../data/inventory_trimmed';

import { hydrateInventory } from './inventory.utils';

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [itemsList, setItemsList] = useState([]);
  const [fetchingInventory, setfetchingInventory] = useState(false);

  const fetchInventory = useCallback(() => {
    setfetchingInventory(true);
    setItemsList(Object.values(hydrateInventory(inventory_trimmed)));
    setfetchingInventory(false);
  }, []);

  useEffect(fetchInventory, []);

  return (
    <InventoryContext.Provider
      value={{
        itemsList,
        fetchingInventory,
        fetchInventory
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
