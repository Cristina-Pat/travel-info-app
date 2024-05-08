const mockFavourites = [];

const addFavourite = async (location) => {
  mockFavourites.push(location);
  return { success: true };
};

const removeFavourite = async (location) => {
  const index = mockFavourites.indexOf(location);
  if (index > -1) {
    mockFavourites.splice(index, 1);
  }
  return { success: true };
};

const getFavourites = async () => {
  return mockFavourites;
};

const favouritesService = {
  addFavourite,
  removeFavourite,
  getFavourites
};

export default favouritesService;