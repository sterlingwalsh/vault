export const sortAlpha = itemsList =>
  itemsList.sort((item1, item2) => item1.name.localeCompare(item2.name));

export const applyFilter = (itemsList, filter) => {
  console.log({ itemsList, filter });

  let filtered = false;
  for (let category in filter) {
    for (let option in filter[category]) {
      if (filter[category][option]) {
        filtered = true;
        break;
      }
    }
    if (filtered) break;
  }
  if (!filtered) return itemsList;
  return itemsList;
};
