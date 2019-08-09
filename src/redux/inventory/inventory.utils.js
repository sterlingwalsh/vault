// import { FILTERS } from '../../data/vault_filters';

const inventoryMap = {
  i: 'steam_appid',
  n: 'name',
  t: 'type',
  h: 'header_image',
  p: 'platforms',
  l: 'supported_languages',
  g: 'genres',
  c: 'categories',
  cs: 'controller_support'
};

export const hydrateInventory = inventory => {
  const hydratedInventory = {};
  for (let item in inventory) {
    const newGameData = {};
    for (let prop in inventoryMap) {
      newGameData[inventoryMap[prop]] = inventory[item][prop];
    }
    hydratedInventory[item] = newGameData;
  }
  return hydratedInventory;
};
