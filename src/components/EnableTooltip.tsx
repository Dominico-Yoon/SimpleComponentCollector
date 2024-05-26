import { useState } from "react";
import "./css/EnableTooltip.css";
import Tooltip from "./Tooltip";

const EnableTooltip = () => {
  const [available, setAvailable] = useState("Enable");
  const [isTooltipDisabled, setIsTooltipDisabled] = useState(false);

  const onClickAvailable = () => {
    if (available === "Enable") {
      setAvailable("Disable");
      setIsTooltipDisabled(!isTooltipDisabled);
    } else if (available === "Disable") {
      setAvailable("Enable");
      setIsTooltipDisabled(!isTooltipDisabled);
    }
  };

  return (
    <div className="EnableTooltip">
      <button className={`test-button ${available}`} onClick={onClickAvailable}>
        {available}
      </button>
      <Tooltip
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        asperiores atque"
        disabled={isTooltipDisabled}
      >
        <div className="tooltip-disable-test">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          asperiores atque
        </div>
      </Tooltip>
    </div>
  );
};

export default EnableTooltip;
