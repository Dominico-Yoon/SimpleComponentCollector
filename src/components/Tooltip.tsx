import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./css/Tooltip.css";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?:
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";
  showDelay?: number;
  hideDelay?: number;
  tooltipStyle?: CSSProperties;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  showDelay = 0,
  hideDelay = 0,
  tooltipStyle = {},
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    showTimeoutRef.current = window.setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        let newCoords = { top: 0, left: 0 };
        switch (position) {
          case "topLeft":
            newCoords = {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "topRight":
            newCoords = {
              top: rect.top + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
          case "bottomLeft":
            newCoords = {
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "bottomRight":
            newCoords = {
              top: rect.bottom + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
          case "leftTop":
            newCoords = {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "leftBottom":
            newCoords = {
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "rightTop":
            newCoords = {
              top: rect.top + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
          case "rightBottom":
            newCoords = {
              top: rect.bottom + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
          case "left":
            newCoords = {
              top: rect.top + rect.height / 2 + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "right":
            newCoords = {
              top: rect.top + rect.height / 2 + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
          case "bottom":
            newCoords = {
              top: rect.bottom + window.scrollY,
              left: rect.left + rect.width / 2 + window.scrollX,
            };
            break;
          default: // 'top'
            newCoords = {
              top: rect.top + window.scrollY,
              left: rect.left + rect.width / 2 + window.scrollX,
            };
            break;
        }
        setCoords(newCoords);
        setVisible(true);
      }
    }, showDelay);
  };

  const hideTooltip = () => {
    if (disabled) return;
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  };

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="tooltip-container">
      <div
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={triggerRef}
      >
        {children}
      </div>
      {visible &&
        ReactDOM.createPortal(
          <div
            className={`tooltip-content tooltip-${position}`}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              ...tooltipStyle,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
