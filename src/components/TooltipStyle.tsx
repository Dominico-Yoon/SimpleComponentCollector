import Tooltip from "./Tooltip";
import "./css/TooltipStyle.css";

const TooltipStyle = () => {
  return (
    <div className="TooltipStyle">
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

export default TooltipStyle;
