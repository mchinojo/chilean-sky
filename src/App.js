import "./App.css";
import Extract from "./Extract";
import CityButtons from "./CityButtons";
import CityWeather from "./CityWeather";
import CityName from "./CityName";
import Card from "react-bootstrap/Card";

function App() {
  return (
    <div className="App">
      <Extract city={"santo-domingo"}></Extract>
      <Card>
        <Card.Body>
          <div className="row">
            <div className="buttons col-2">
              <CityButtons onSelectCity={() => {}} />
            </div>
            <div className="col-10">
              <Card.Subtitle>
                <CityName></CityName>
              </Card.Subtitle>
              <Card.Title>
                <CityWeather></CityWeather>
              </Card.Title>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
