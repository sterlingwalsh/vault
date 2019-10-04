import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";

import { inventory_trimmed } from "../../data/inventory_trimmed";
import { hydrateInventory } from "./inventory.utils";
import Logger from "../../deep equality logger/context-logger";

export const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const inventory = useInventoryValues();
  return (
    <InventoryContext.Provider value={inventory}>
      <Logger title={"Inventory"} context={InventoryContext} />
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryValues = () => {
  const [itemsList, setItemsList] = useState([]);
  const [fetchingInventory, setfetchingInventory] = useState(false);

  const fetchInventory = useCallback(() => {
    setfetchingInventory(true);
    setItemsList(Object.values(hydrateInventory(inventory_trimmed)));
    setfetchingInventory(false);
  }, []);

  useEffect(fetchInventory, []);

  return {
    itemsList,
    fetchingInventory,
    fetchInventory
  };
};

export default InventoryProvider;
