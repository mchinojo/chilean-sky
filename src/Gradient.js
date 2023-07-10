import "./Gradient.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import CityText from "./CityText";
import CityTitle from "./CityTitle";

function Gradient(props) {
  return (
    <div>
      <Card>
        <Card.Body
          style={
            props.colors === undefined
              ? { backgroundImage: "red" }
              : {
                  backgroundImage: `linear-gradient(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]})`,
                }
          }
        >
          <Card.Subtitle>
            <CityTitle></CityTitle>
          </Card.Subtitle>
          <Card.Title>
            <CityText></CityText>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Gradient;
