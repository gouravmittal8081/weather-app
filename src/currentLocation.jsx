import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setError, setLat, setLon } from "./Redux/WeatherReducer";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Forcast from "./forcast";
import "./styles.css";
import loader from "./images/WeatherIcons.gif";

const CurrentLocation = () => {
  const dispatch = useDispatch();
  const lat = useSelector((state) => state.weather.lat);
  const lon = useSelector((state) => state.weather.lon);

  const [icon, setIcon] = useState("CLEAR_DAY");
  const [main, setMain] = useState(undefined);

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    const timerID = setInterval(() => {
      if (lat && lon) {
        getWeather(lat, lon);
      }
    }, 600000);

    return () => {
      clearInterval(timerID);
    };
  }, [lat, lon, dispatch]);

  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const getWeather = async (lat, lon) => {
    try {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(setLat(lat));
        dispatch(setLon(lon));
        dispatch(setLoading(false));
      }, 2000);
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };

  if (lat && lon) {
    return (
      <>
        <Forcast icon={icon} weather={main} lat={lat} lon={lon} />
      </>
    );
  } else {
    return (
      <React.Fragment>
        <Row className="forecast d-flex justify-content-center align-items-center">
          <Col className="card-profile mt-5">
            <Card className="cardStyleBack">
              <CardTitle></CardTitle>
              <CardBody>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={loader} className="imgClass" alt="Loading..." />
                </div>
                <h3 className="d-flex justify-content-center align-items-center h3Style">
                  Detecting your location
                </h3>
                <h3 className="d-flex justify-content-center align-items-center mt-5 h3styleBack">
                  Your current location will be displayed on the App <br /> &
                  used for calculating Real time weather.
                </h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

export default CurrentLocation;
