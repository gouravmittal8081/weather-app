// store.js
import { createStore, combineReducers } from "redux";
import weatherReducer from "./WeatherReducer";

// Combine reducers
const rootReducer = combineReducers({
  weather: weatherReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
