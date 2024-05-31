import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store.jsx";
import CurrentLocation from "./currentLocation";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrentLocation />
      </div>
    </Provider>
  );
}

export default App;
