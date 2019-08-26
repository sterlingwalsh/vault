import React, { createContext, useState, useEffect, useCallback } from 'react';

import { getGameData } from './steamapi';

export const SteamGameDataContext = createContext();

const SteamGameDataProvider = ({ children }) => {
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

  return (
    <SteamGameDataContext.Provider
      value={{
        setCurrentDisplayedGames,
        currentGamesDisplayData,
        fetchingGamesData
      }}
    >
      {children}
    </SteamGameDataContext.Provider>
  );
};

export default SteamGameDataProvider;
