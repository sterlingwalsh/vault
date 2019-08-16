export const sortAlpha = itemsList =>
  itemsList.sort((item1, item2) => item1.name.localeCompare(item2.name));

export const applyFilter = (itemsList, filter) => {
  let filtered = false;
  for (let category in filter) {
    for (let option in filter[category]) {
      if (filter[category][option].status) {
        filtered = true;
        break;
      }
    }
    if (filtered) break;
  }
  if (!filtered) return itemsList;

  let filteredItemsList = [...itemsList];

  for (let category in filter) {
    const categoryOptions = filter[category];
    let categoryIsFiltered = false;
    for (let option of Object.values(categoryOptions)) {
      if (option.status) categoryIsFiltered = true;
    }
    if (!categoryIsFiltered) continue;

    filteredItemsList = filteredItemsList.filter(item => {
      for (let key of Object.keys(categoryOptions)) {
        if (categoryOptions[key].status) {
          if (item[category].includes(Number(key))) {
            return true;
          }
        }
      }
      return false;
    });
  }
  return filteredItemsList;
};

export const populateFilter = filter => {
  const currentFilter = {};
  for (let section in filter) {
    const sectionObject = {};
    let sectionFormat = section.replace('list', '');
    filter[section].forEach((item, i) => {
      if (item) {
        sectionObject[i] = { name: item, status: 0 };
      }
    });
    currentFilter[sectionFormat] = sectionObject;
  }
  return currentFilter;
};
