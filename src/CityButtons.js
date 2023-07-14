import ListGroup from "react-bootstrap/ListGroup";

function CityButtons({ onSelectCity }) {
  const handleCityClick = (city) => {
    onSelectCity(city);
  };
  return (
    <header id="topPage">
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action onClick={() => handleCityClick("santiago")}>
          Santiago
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => handleCityClick("santo-domingo")}>
          Santo Domingo
        </ListGroup.Item>
      </ListGroup>
    </header>
  );
}

export default CityButtons;
