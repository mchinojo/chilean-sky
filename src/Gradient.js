import "./Gradient.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Gradient(props) {
  return (
    <div
      className="gradient"
      style={
        props.colors === undefined
          ? { backgroundImage: "red" }
          : {
              backgroundImage: `linear-gradient(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]})`,
            }
      }
    ></div>
  );
}

export default Gradient;
