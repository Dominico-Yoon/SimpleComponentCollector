import "./App.css";
import EnableTooltip from "./components/EnableTooltip";
import DirectionTooltip from "./components/DirectionTooltip";
import StyleTooltip from "./components/StyleTooltip";
import DelayTooltip from "./components/DelayTooltip";

const App = () => {
  return (
    <div className="container">
      <div className="container-layout">
        <section style={{ height: "100vh", padding: "0px 200px" }}>
          <DirectionTooltip />
          <DelayTooltip />
          <StyleTooltip />
          <EnableTooltip />
        </section>
      </div>
    </div>
  );
};

export default App;
