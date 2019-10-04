import React, { useContext, useEffect } from "react";

import { useInventory } from "../../../contexts/inventory/inventory.provider";
import { FilterContext } from "../../../contexts/filter/filter.provider";
import SteamGameDataProvider, {
  useSteamGameData
} from "../../../contexts/steam-game-data/steam-game-data.provider";

import ItemContainerComponent from "./item-container.component";

const ItemContainerProviderWrapper = WrappedComponent => () => (
  <SteamGameDataProvider>
    <WrappedComponent />
  </SteamGameDataProvider>
);

const ItemContainer = ({ ...otherProps }) => {
  const { fetchInventory } = useInventory();

  const { itemsListFiltered } = useContext(FilterContext);

  const {
    setCurrentDisplayedGames,
    currentGamesDisplayData
  } = useSteamGameData();

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
