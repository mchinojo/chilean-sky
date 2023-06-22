import "./Gradient.css";

function Gradient(props) {
  return (
    <header
      className="box"
      style={
        props.colors === undefined
          ? { backgroundImage: "red" }
          : {
              backgroundImage: `linear-gradient(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]})`,
            }
      }
    />
  );
}

export default Gradient;
