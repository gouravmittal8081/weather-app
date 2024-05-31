export const SET_LAT = "SET_LAT";
export const SET_LON = "SET_LON";


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


export const setLat = (lat) => ({
  type: SET_LAT,
  payload: lat,
});

export const setLon = (lon) => ({
  type: SET_LON,
  payload: lon,
});

const initialState = {
  userInput: "",
  searchResults: [],
  weatherData: null,
  loading: false,
  error: null,
  lat: null,
  lon: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INPUT":
      return { ...state, userInput: action.payload };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_WEATHER_DATA":
      return { ...state, weatherData: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LAT":
      return { ...state, lat: action.payload };
    case "SET_LON":
      return { ...state, lon: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
