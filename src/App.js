import "./App.css";
import Extract from "./Extract";
import CityButtons from "./CityButtons";
import CityWeather from "./CityWeather";
import CityName from "./CityName";
import Card from "react-bootstrap/Card";

function App() {
  return (
    <div class="App">
      <Extract></Extract>
      <Card>
        <Card.Body>
          <div class="row">
            <div class="buttons col-2">
              <CityButtons />
            </div>
            <div class="col-10">
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
