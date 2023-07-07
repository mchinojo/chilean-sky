import "./App.css";
import Extract from "./Extract";
import CityText from "./CityText";
import CityTitle from "./CityTitle";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Extract></Extract>
      <CityTitle></CityTitle>
      <CityText></CityText>
    </div>
  );
}

export default App;
