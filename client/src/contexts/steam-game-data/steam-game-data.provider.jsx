import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";

import { getGameData } from "./steamapi";
import Logger from "../../deep equality logger/context-logger";

export const SteamGameDataContext = createContext();

export const useGameData = () => useContext(SteamGameDataContext);

export const SteamGameDataProvider = ({ children }) => {
  const value = useSteamGameData();
  return (
    <SteamGameDataContext.Provider value={value}>
      <Logger title={"Game Data"} context={SteamGameDataContext} />
      {children}
    </SteamGameDataContext.Provider>
  );
};

export const useSteamGameData = () => {
  const [currentDisplayedGames, setCurrentDisplayedGames] = useState([]);

  const [fetchingGamesData, setFetchingGamesData] = useState(true);
  const [currentGamesDisplayData, setCurrentGamesDisplayData] = useState([]);

  const fetchGamesData = useCallback(ids => {
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
  }, []);

  useEffect(() => {
    fetchGamesData(currentDisplayedGames);
  }, [currentDisplayedGames, fetchGamesData]);

  return {
    setCurrentDisplayedGames,
    currentGamesDisplayData,
    fetchingGamesData
  };
};

export default SteamGameDataProvider;
