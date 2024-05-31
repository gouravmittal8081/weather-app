export const setUserInput = (input) => ({
  type: "SET_USER_INPUT",
  payload: input,
});

export const setSearchResults = (results) => ({
  type: "SET_SEARCH_RESULTS",
  payload: results,
});

export const setWeatherData = (data) => ({
  type: "SET_WEATHER_DATA",
  payload: data,
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});
