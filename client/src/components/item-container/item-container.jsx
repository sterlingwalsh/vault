import React, { useContext, useEffect } from 'react';

import { InventoryContext } from '../../contexts/inventory/inventory.provider';
import { FilterContext } from '../../contexts/filter/filter.provider';
import SteamGameDataProvider, {
  SteamGameDataContext
} from '../../contexts/steam-game-data/steam-game-data.provider';

import ItemContainerComponent from './item-container.component';

import createContextLogger from '../../deep equality logger/context-logger';

const Logger = createContextLogger({
  contexts: [['Game Data', SteamGameDataContext]]
});

const ItemContainerProviderWrapper = WrappedComponent => () => (
  <SteamGameDataProvider>
    <Logger />
    <WrappedComponent />
  </SteamGameDataProvider>
);

const ItemContainer = ({ ...otherProps }) => {
  const { fetchInventory } = useContext(InventoryContext);

  const { itemsListFiltered } = useContext(FilterContext);

  const { setCurrentDisplayedGames, currentGamesDisplayData } = useContext(
    SteamGameDataContext
  );

  useEffect(fetchInventory, []);

  useEffect(() => {
    setCurrentDisplayedGames(
      itemsListFiltered.slice(0, 15).map(item => item.steam_appid)
    );
  }, [itemsListFiltered, setCurrentDisplayedGames]);

  return (
    <ItemContainerComponent
      currentGamesDisplayData={currentGamesDisplayData}
      {...otherProps}
    />
  );
};

export default ItemContainerProviderWrapper(ItemContainer);
