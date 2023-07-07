import "./Gradient.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <Card.Subtitle>Card Subtitle</Card.Subtitle>
          <Card.Title>Card Title</Card.Title>
        </Card.Body>
      </Card>

      {/* <div
        className="box"
        style={
          props.colors === undefined
            ? { backgroundImage: "red" }
            : {
                backgroundImage: `linear-gradient(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]})`,
              }
        }
      /> */}
    </div>
  );
}

export default Gradient;
