import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import "./styles.css";
import { ClipLoader } from "react-spinners";
import {
  Button,
  InputGroup,
  Input,
  Col,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
import {
  setWeatherData,
  setLoading,
  setError,
} from "./Redux/WeatherReducer.jsx";

const Forcast = (props) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weatherData);
  const loadingStatus = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  const search = (city) => {
    dispatch(setLoading(true));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=d48f79191f59ea4954d23b0e77bb82bb`
      )
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setWeatherData(response.data));
        setQuery("");
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setWeatherData(null));
        setQuery("");
        dispatch(setError({ message: "Not Found", query: query }));
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  const handleKeyPress = (event) => {
    if (query) {
      if (event.key === "Enter") {
        search(query);
      }
    }
  };

  const handleSearch = () => {
    search(query);
  };

  useEffect(() => {
    if (props.lat && props.lon) {
      dispatch(setLoading(true));
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&units=metric&APPID=d48f79191f59ea4954d23b0e77bb82bb`
        )
        .then((response) => {
          dispatch(setLoading(false));
          dispatch(setWeatherData(response.data));
          setQuery("");
        })
        .catch((error) => {
          dispatch(setLoading(false));
          dispatch(setWeatherData(null));
          setQuery("");
          dispatch(setError({ message: "Not Found", query: query }));
        });
    }
  }, [props.lat, props.lon, dispatch]);

  return (
    <div className="forecast d-flex justify-content-center align-items-center">
      {loadingStatus ? (
        <div className="d-flex justify-content-center align-items-center ClipLoaderStyle">
          <ClipLoader size={100} color="#36d7b7" />
        </div>
      ) : (
        <Card className="card-profile w-80 mt-5">
          <CardBody>
            <div className="profile-image-wrapper d-flex justify-content-center">
              <div className="profile-image">
                <ReactAnimatedWeather
                  icon={props.icon}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
              </div>
            </div>

            <h4 className="d-flex justify-content-center mt-2 mb-3">
              {weather?.name}, {weather?.sys?.country}
            </h4>

            <Badge className="profile-badge" color="light-primary">
              <Col className="mb-1" lg="12" md="12">
                <InputGroup>
                  <Input
                    type="text"
                    className="search-bar inputStyle"
                    placeholder="Search any city"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={query}
                  />
                  <Button
                    className="ButtonStyle"
                    outline
                    disabled={query ? false : true}
                    onClick={query ? handleSearch : (e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </Button>
                </InputGroup>
              </Col>
            </Badge>

            {typeof weather?.main !== "undefined" ? (
              <>
                <hr className="mb-2" />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Temperature</h6>
                    <h4 className="mb-0">
                      {Math.round(weather?.main?.temp)}°c (
                      {weather?.weather[0]?.main})
                    </h4>
                  </div>
                  <div>
                    <h6>Humidity</h6>
                    <h4 className="mb-0">
                      {" "}
                      {Math.round(weather?.main?.humidity)}%
                    </h4>
                  </div>
                </div>
                <hr className="mb-2" />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Visibility</h6>
                    <h4 className="mb-0">
                      {" "}
                      {Math.round(weather.visibility / 1000)} km
                    </h4>
                  </div>
                  <div>
                    <h6>Wind Speed</h6>
                    <h4 className="mb-0">
                      {" "}
                      {Math.round(weather.wind.speed)} Km/h
                    </h4>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center">
                {error?.query} {error?.message}
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Forcast;
