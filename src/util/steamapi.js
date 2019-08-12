const GAME_DATA_URL = 'http://localhost:3001/gameDetails';

const getGameData = async ids => {
  const response = await fetch(GAME_DATA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids })
  });
  const json = await response.json();
  return json;
};

module.exports = { getGameData };
