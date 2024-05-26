import "./App.css";
import TooltipAvailable from "./components/TooltipAvailable";
import TooltipDirection from "./components/TooltipDirection";
import TooltipStyle from "./components/TooltipStyle";
import TooltipDelay from "./components/TooltipDelay";

const App = () => {
  return (
    <div className="container">
      <div className="container-layout">
        <section style={{ height: "100vh", padding: "0px 200px" }}>
          <TooltipDirection />
          <TooltipDelay />
          <TooltipStyle />
          <TooltipAvailable />
        </section>
      </div>
    </div>
  );
};

export default App;
