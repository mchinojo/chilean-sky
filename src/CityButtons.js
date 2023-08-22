import ListGroup from "react-bootstrap/ListGroup";
import cities from "./components/data/cities.json";
import "./CityButtons.css";

function CityButtons(props) {
  const citiesArray = Object.values(cities);

  return (
    <header id="topPage">
      <div className="city-list-container">
        <ListGroup defaultActiveKey="#link1">
          {citiesArray.map((city) => {
            return (
              <ListGroup.Item
                defaultActiveKey={city.cityID}
                action
                onClick={() => {
                  props.onClickCityButtons(city.cityID);
                }}
              >
                {city.cityName}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </header>
  );
}

export default CityButtons;
