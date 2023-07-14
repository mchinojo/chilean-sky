import "./App.css";
import Extract from "./Extract";
import CityButtons from "./CityButtons";
import CityWeather from "./CityWeather";
import CityName from "./CityName";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function App() {
  const [selectedCity, setSelectedCity] = useState("santo-domingo");

  const onClickCityButtons = (cityID) => {
    setSelectedCity(cityID);
  };

  return (
    <div className="App">
      <Extract city={selectedCity}></Extract>
      <Card>
        <Card.Body>
          <div className="row">
            <div className="buttons col-2">
              <CityButtons onClickCityButtons={onClickCityButtons} />
            </div>
            <div className="col-10">
              <Card.Subtitle>
                <CityName></CityName>
              </Card.Subtitle>
              <Card.Title>
                <CityWeather city={selectedCity}></CityWeather>
              </Card.Title>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
