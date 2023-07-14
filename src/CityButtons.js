import ListGroup from "react-bootstrap/ListGroup";
import cities from "./components/data/cities.json";

function CityButtons(props) {
  const citiesArray = Object.values(cities);

  return (
    <header id="topPage">
      <ListGroup defaultActiveKey="#link1">
        {citiesArray.map((city) => {
          return (
            <ListGroup.Item
              key={city.cityID}
              action
              onClick={() => {
                props.onClickCityButtons(city.cityName);
              }}
            >
              {city.cityName}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </header>
  );
}

export default CityButtons;
