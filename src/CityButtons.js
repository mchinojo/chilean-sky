import ListGroup from "react-bootstrap/ListGroup";

function CityButtons() {
  const alertClicked = () => {
    alert("You clicked a city");
  };
  return (
    <header id="topPage">
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action onClick={alertClicked}>
          This one is a button
        </ListGroup.Item>
        <ListGroup.Item action onClick={alertClicked}>
          This one is a button
        </ListGroup.Item>
        <ListGroup.Item action onClick={alertClicked}>
          This one is a button
        </ListGroup.Item>
      </ListGroup>
    </header>
  );
}

export default CityButtons;
