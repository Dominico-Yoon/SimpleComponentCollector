import Tooltip from "./Tooltip";
import "./css/StyleTooltip.css";

const StyleTooltip = () => {
  return (
    <div className="StyleTooltip">
      <Tooltip content="Pink" tooltipStyle={{ backgroundColor: "#fac" }}>
        <button className="test-button pink">Pink</button>
      </Tooltip>
      <Tooltip
        content="Yellow"
        tooltipStyle={{ backgroundColor: "#fff1aa", color: "#333" }}
      >
        <button className="test-button yellow">Yellow</button>
      </Tooltip>
    </div>
  );
};

export default StyleTooltip;
