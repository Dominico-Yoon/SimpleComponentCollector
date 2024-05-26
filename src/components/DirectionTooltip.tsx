import Tooltip from "./Tooltip";
import "./css/DirectionTooltip.css";

const DirectionTooltip = () => {
  return (
    <div className="DirectionTooltip">
      <div>
        <div className="top-wrapper">
          <Tooltip content="Top Left Tooltip" position="topLeft">
            <button className="test-button top-left">Top Left</button>
          </Tooltip>

          <Tooltip content="">
            <button className="test-button top"></button>
          </Tooltip>

          <Tooltip content="Top Right Tooltip" position="topRight">
            <button className="test-button top-right">Top Right</button>
          </Tooltip>
        </div>

        <div className="left-wrapper">
          <Tooltip content="Left Tooltip" position="left">
            <button className="test-button">Left</button>
          </Tooltip>
        </div>

        <div className="right-wrapper">
          <Tooltip content="Right Tooltip" position="right">
            <button className="test-button">Right</button>
          </Tooltip>
        </div>

        <div className="bottom-wrapper">
          <Tooltip content="Bottom Left Tooltip" position="bottomLeft">
            <button className="test-button">Bottom Left</button>
          </Tooltip>
          <Tooltip content="Bottom Tooltip" position="bottom">
            <button className="test-button">Bottom</button>
          </Tooltip>
          <Tooltip content="Bottom Right Tooltip" position="bottomRight">
            <button className="test-button">Bottom Right</button>
          </Tooltip>
        </div>
      </div>

      <div className="overflow-scroll">
        <div className="top-wrapper">
          <Tooltip content="Top Left Tooltip" position="topLeft">
            <button className="test-button">Top Left</button>
          </Tooltip>
          <Tooltip content="">
            <button className="test-button top"></button>
          </Tooltip>
          <Tooltip content="Top Right Tooltip" position="topRight">
            <button className="test-button">Top Right</button>
          </Tooltip>
        </div>

        <div className="left-wrapper">
          <Tooltip content="Left Tooltip" position="left">
            <button className="test-button">Left</button>
          </Tooltip>
        </div>

        <div className="right-wrapper">
          <Tooltip content="Right Tooltip" position="right">
            <button className="test-button">Right</button>
          </Tooltip>
        </div>

        <div className="bottom-wrapper">
          <Tooltip content="Bottom Left Tooltip" position="bottomLeft">
            <button className="test-button">Bottom Left</button>
          </Tooltip>
          <Tooltip content="Bottom Tooltip" position="bottom">
            <button className="test-button">Bottom</button>
          </Tooltip>
          <Tooltip content="Bottom Right Tooltip" position="bottomRight">
            <button className="test-button">Bottom Right</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DirectionTooltip;
