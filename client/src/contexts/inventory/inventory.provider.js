import React, { createContext, useState, useEffect } from 'react';

import { inventory_trimmed } from '../../data/inventory_trimmed';

import { hydrateInventory } from './inventory.utils';

import { getGameData } from '../../util/steamapi';

const INITIAL_CONTEXT = {
  fetchingInventory: true,
  fetchInventory: () => {},
  itemsList: [],
  currentGamesDisplay: [],
  setCurrentGamesDisplay: () => {},
  fetchingGamesData: false,
  fetchGamesData: () => {},
  currentGamesDisplayData: []
};

export const InventoryContext = createContext(INITIAL_CONTEXT);

const InventoryProvider = ({ children }) => {
  const [itemsList, setItemsList] = useState(INITIAL_CONTEXT.itemsList);
  const [fetchingInventory, setfetchingInventory] = useState(
    INITIAL_CONTEXT.fetching
  );
  const [currentGamesDisplay, setCurrentGamesDisplay] = useState(
    INITIAL_CONTEXT.currentGamesDisplay
  );
  const [fetchingGamesData, setFetchingGamesData] = useState(
    INITIAL_CONTEXT.fetchingGameData
  );
  const [currentGamesDisplayData, setCurrentGamesDisplayData] = useState(
    INITIAL_CONTEXT.currentGamesDisplayData
  );

  const fetchInventory = () => {
    setfetchingInventory(true);
    setItemsList(Object.values(hydrateInventory(inventory_trimmed)));
    setfetchingInventory(false);
  };

  const fetchGamesData = ids => {
    if (!ids.length) return;
    setFetchingGamesData(true);
    getGameData(ids)
      .then(response => {
        setCurrentGamesDisplayData(
          response.map(game => Object.values(game)[0].data)
        );
      })
      .catch(err => console.log(err))
      .finally(() => setFetchingGamesData(false));
  };

  useEffect(() => {
    fetchGamesData(currentGamesDisplay)
  }, [currentGamesDisplay])



  return (
    <InventoryContext.Provider
      value={{
        itemsList,
        fetchingInventory,
        fetchInventory,
        fetchGamesData,
        currentGamesDisplay,
        setCurrentGamesDisplay,
        currentGamesDisplayData
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
