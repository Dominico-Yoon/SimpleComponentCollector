import Tooltip from "./Tooltip";
import "./css/TooltipDelay.css";

const TooltipDelay = () => {
  return (
    <div className="TooltipDelay">
      <div>
        <Tooltip content="Enter Delay 1s" showDelay={1000}>
          <button className="test-button">enter delay 1s</button>
        </Tooltip>

        <Tooltip content="Leave Delay 1s" hideDelay={1000}>
          <button className="test-button">leave delay 1s</button>
        </Tooltip>

        <Tooltip
          content={
            <span role="img" aria-label="icon">
              ⭐
            </span>
          }
          showDelay={500}
          hideDelay={500}
        >
          <button className="test-button">⭐</button>
        </Tooltip>

        <Tooltip
          content={
            <>
              <span role="img" aria-label="icon">
                🔍
              </span>{" "}
              Search
            </>
          }
          showDelay={500}
          hideDelay={500}
        >
          <button className="test-button">Search</button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TooltipDelay;
