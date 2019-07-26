const GAME_DATA_URL = 'http://localhost:3001/gameDetails';

const getGameData = async ids => {
  const response = await fetch(GAME_DATA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids })
  });
  const data = await response.json();
  return data;
};

module.exports = { getGameData };
