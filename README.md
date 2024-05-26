# 💡 Tooltip Components

![image](https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/4471dac2-1b64-4eab-b95b-ef371f732b63)



> Button에 Mouse Hover, Out시 Tooltip이 나오는 TypeScript를 이용해 만든 React App 입니다.
> 
> 

### 목차

1. [주요 기능](#주요-기능)
    - [1-1. Tooltip 구현](#Tooltip-구현)
      * [1-1-1. Tooltip 구현](#1-1-1.-Tooltip-구현)
      * [1-1-2. Tooltip 최상위 요소 이동](#1-1-2.-Tooltip-최상위-요소-이동)
    - [1-2. Tooltip Direction](#1-2.-Tooltip-Direction)
    - [1-3. Tooltip Delay](#1-3.-Tooltip-Delay)
      * [1-3-1. Tooltip Delay](#1-3-1.-Tooltip-Delay)
      * [1-3-2. Tooltip Delay Customize](#1-3-2.-Tooltip-Delay-Customize)
      * [1-3-3. Tooltip Delay All-Type](#1-3-1.-Tooltip-Delay-All-Type)
    - [1-4. Tooltip Style](#1-4.-Tooltip-Style)
    - [1-5. Tooltip Available](#1-5.-Tooltip-Available)
2. [사용한 기술 스택 및 라이브러리](#사용한-기술-스택-및-라이브러리)

## [주요 기능]

### [1-1-1. Tooltip 구현]

- [x] Button Hover시, Tooltip 생성
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/6432950c-794d-4f74-8bfc-c15719d92333">


  1. Tooltip을 나오게 하는 Tooltip 컴포넌트 생성
  2. Tooltip 컴포넌트에서 필요한 props를 interface로 생성 (content - 툴팁 내용)
```javascript
interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}
```

  3. useState를 사용하여 visivle이라는 state를 만들어 주고 기본적으로는 onMouseEvnet가 없기 때문에 false로 설정
```javascript
const [visible, setVisible] = useState(false);
```

  4. onMouseEvent가 있을시 visible을 변경 해줘야 하므로 함수 생성
```javascript
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
```

  5. Tooltip 컴포넌트 랜더링 (visible이 true면 content props로 받아온 내용으로 tooltip 생성)
```javascript
  return (
    <div className="tooltip-container">
      <div
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {visible && <div className="tooltip-content">{content}</div>}
    </div>
  );
```

  6. App.tsx에 Tooltip 컴포넌트 import 한 뒤 Tooltip 컴포넌트에서 필요한 props 전달 후 랜더링
```javascript
import React from 'react';
import Tooltip from './Tooltip';

const App: React.FC = () => {
  return (
    <div style={{ padding: '50px' }}>
      <Tooltip content="This is a tooltip">
        <button>Hover over me</button>
      </Tooltip>
    </div>
  );
};
```
  7. 결과 화면
  <img width="300" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/38e571c6-bf99-4161-8c5f-671fb0a13a23">



### 1-1-2. Tooltip 최상위 요소 이동

- [x] overflow: hidden / scroll 일 경우에도 Tooltip이 최상위에 보이게 하기 위해 createPortal 사용
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/7947015a-7768-4c91-9134-ae0f12200894">


  1. Tooltip 컴포넌트 수정
  2. useState로 position state를 만들어 준 후, 초기값으로 {top:0, left:0} 객체로 설정
  ```javascript
  const [position, setPosition] = useState({ top: 0, left: 0 });
  ```
  3. useRef를 사용하여 triggerRef null로 초기화
  ```javascript
  const triggerRef = useRef<HTMLDivElement>(null);
  ```
  4. visible의 값이 바뀔 때마다 리랜더링 될 수 있게끔 useEffect 설정
  5. rect에 getBoundingClientRect()로 triggerRef의 current값을 저장 후 position을 지정
  ```javascript
    useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, [visible]);
  ```
  6. ReactDOM.createPortal으로 Tooltip컴포넌트를 최상위에서 랜더링 될 수 있게 지정해준다.
  ```javascript
        {visible &&
        ReactDOM.createPortal(
          <div
            className="tooltip-content"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            {content}
          </div>,
          document.body
        )}
  ```
  7. 결과 화면
<img width="300" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/817815a0-199f-4044-b16e-e81e90899563">
<img width="300" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/d5ed9d67-dfae-4e7f-94a1-c08543242b45">



### 1-2 Tooltip Direction

- [x] 툴팁 방향을 left, right, bottom, topLeft... 으로 뜰 수 있게 방향 툴팁 컴포넌트 수정 / TooltipDirection 컴포넌트 생성
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/848892e3-526a-4826-ba7d-ef49a727d1ee">
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/3f3f2ad5-710b-47ca-87b6-bab56eeac50f">


  1. Tooltip 컴포넌트 수정
  2. interface에 position 추가
  ```javascript
  interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  }
  ```
  3. position state의 이름이 중복이므로 좌표인 coord, setCoord로 변경
  ```javascript
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  ```
  4. position 위치 별로 설정 해야하므로 useEffect 수정
  ```javascript
    useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let newCoords = { top: 0, left: 0 };
      switch (position) {
        case 'topLeft':
          newCoords = { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
          break;
        case 'topRight':
          newCoords = { top: rect.top + window.scrollY, left: rect.right + window.scrollX };
          break;
  // ... (중략)
          default: // 'top'
          newCoords = { top: rect.top + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX };
          break;
      }
      setCoords(newCoords);
    }
  }, [visible, position]);
  ```
  5. 각 버튼들이 있어야 하므로 TooltipDirection 컴포넌트 생성
  ```javascript
  import Tooltip from "./Tooltip";
  import "./TooltipDirection.css";

  const TooltipDirection = () => {
    return (
      <div className="TooltipDirection">
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
  // ... (중략)
  ```
  6. App 컴포넌트에 랜더링 될 수 있게 TooltipDirection 컴포넌트 추가
  ```javascript
  const App = () => {
  return (
    <div className="container">
      <div className="container-layout">
        <section style={{ height: "100vh", padding: "0px 200px" }}>
          <TooltipDirection />
        </section>
      </div>
    </div>
  );
  };
  ```
  7. 결과 화면
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/487d5f41-fcda-45c8-a11c-01ba33a462a1">



### 1-3-1. Tooltip Delay

- [x] 툴팁이 나타나거나 사라질 때 딜레이를 추가하려면 setTimeout을 사용하여 딜레이 구현
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/60bd4ad8-88da-4e53-a0cd-c5e8d1b817db">


  1. Tooltip 컴포넌트 수정
  2. interface에showDelay / hideDelay 추가
  ```javascript
    interface TooltipProps {
      content: ReactNode;
      children: ReactNode;
      position?: 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
      showDelay?: number;
      hideDelay?: number;
    }
  ```
  3. useRef로 showTimeoutRef와 hideTimeoutRef를 number타입과 null이 들어 오니 Union으로 설정 해주고 null로 초기화
  ```javascript
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  ```
  4. showTooltip 함수를 생성 (onMouseEnter 할 때 props로 받아온 showDelay의 숫자로 delay 생성)
  ```javascript
    const showTooltip = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    showTimeoutRef.current = window.setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        let newCoords = { top: 0, left: 0 };
        switch (position) {
          case 'topLeft':
            newCoords = { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
            break;
          case 'topRight':
            newCoords = { top: rect.top + window.scrollY, left: rect.right + window.scrollX };
            break;
  // ...(중략)
            default: // 'top'
            newCoords = { top: rect.top + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX };
            break;
        }
        setCoords(newCoords);
        setVisible(true);
      }
    }, showDelay);
  };
  ```
  5. hideTooltip 함수 생성 (onMouseLeave 할 때 props로 받아온 hideDelay의 숫자로 delay 생성)
  ```javascript
    const hideTooltip = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  };
  ```
  6. useEffect로 Mount될 때 만약 show/hideTimeoutRef에 null값이 아닌 숫자가 들어 가있으면 clearTimout으로 초기화 시켜줍니다.
  ```javascript
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
  ```
  7. 버튼 생성을 위해 TooltipDelay 컴포넌트 생성
  ```javascript
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
            </div>
        </div>
      );
    };

    export default TooltipDelay;
  ```
  8. App 컴포넌트에 랜더링 될 수 있게 TooltipDelay 컴포넌트 추가
  ```javascript
  const App = () => {
      return (
        <div className="container">
          <div className="container-layout">
            <section style={{ height: "100vh", padding: "0px 200px" }}>
              <TooltipDirection />
              <TooltipDelay />
            </section>
          </div>
        </div>
      );
    };
  ```
  9. 결과 화면
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/c0571d8c-c215-4c8a-aea4-d3bffde806c4">



### 1-3-2. Tooltip Delay Customize

- [x] 이미 showDelay, hideDelay를 props에 추가 하여서 사용자가 원하는 시간으로 딜레이를 설정할 수 있습니다.
```javascript
        <Tooltip content="Enter Delay 1s" showDelay={1000}>
          <button className="test-button">enter delay 1s</button>
        </Tooltip>
        <Tooltip content="Leave Delay 1s" hideDelay={1000}>
          <button className="test-button">leave delay 1s</button>
        </Tooltip>
```



### 1-3-3. Tooltip Delay All-Type

- [x] tooltip의 내용을 적는 content props를 ReactNode 타입으로 설정 해주어 다양한 형태의 데이터 전달 가능
```javascript
interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  showDelay?: number;
  hideDelay?: number;
}
```

```javascript
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
```

결과 화면

<img width="300" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/4272f6fe-7179-405d-941f-3878c840660b">
<img width="300" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/8ad25773-5a4a-469c-a96d-3cb1fea9d85d">



### 1-4. Tooltip Style

- [x] Tooltip 컴포넌트에 tooltipStyle props를 추가하고 CSSProperties타입으로 설정하여 랜더링 될때 style에 spread 연산자로 추가
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/8bec8070-52d1-4151-b45c-9f99c7f7f844">


  1. Tooltip 컴포넌트 수정
  2. 인터페이스 수정
  ```javascript
    interface TooltipProps {
      content: ReactNode;
      children: ReactNode;
      position?: 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
      showDelay?: number;
      hideDelay?: number;
      tooltipStyle?: CSSProperties;
    }
  ```
3. 랜더링 될때 ...tooltipStyle 추가
      ```javascript
          {visible &&
        ReactDOM.createPortal(
          <div
            className={`tooltip-content tooltip-${position}`}
            style={{ top: `${coords.top}px`, left: `${coords.left}px`, ...tooltipStyle }}
          >
            {content}
          </div>,
          document.body
        )}
    ```
4. 버튼 생성을 위해 TooltipStyle 컴포넌트 생성
    ```javascript
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
    ```
5. App 컴포넌트에 랜더링 될 수 있게 TooltipStyle 컴포넌트 추가
  ```javascript
  const App = () => {
      return (
        <div className="container">
          <div className="container-layout">
            <section style={{ height: "100vh", padding: "0px 200px" }}>
              <TooltipDirection />
              <TooltipDelay />
              <TooltipStyle />
            </section>
          </div>
        </div>
      );
    };
  ```
6. 결과 화면
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/0066a966-2c5f-438a-9b8b-6f8ea0f37d25">



### 1-5. Tooltip Available

- [x] Tooltip 컴포넌트에 disabled Props를 추가하여 props가 true일 때 툴팁이 나타나지 않도록 설정
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/096f4238-d01b-4ca2-96b1-a5d030b2922c">
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/cbbd96f0-b5be-4afa-84c4-69ebf5cf2cc4">


  1. Tooltip 컴포넌트 수정
  2. interface에 disabled Props 추가
  ```javascript
    interface TooltipProps {
      content: ReactNode;
      children: ReactNode;
      position?: 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
      showDelay?: number;
      hideDelay?: number;
      tooltipStyle?: CSSProperties;
      disabled?: boolean;
    }
  ```
  3. showTooltip, hideTooltip 함수에 disalbed가 true일 경우 return 조건 추가
  ```javascript
   const showTooltip = () => {
    if (disabled) return;
  // ... (중략)
  }
    const hideTooltip = () => {
    if (disabled) return;
  // ... (중략)
  }
  ```
  4. 버튼 및 기능을 확인 하기 위한 TooltipAvailable 컴포넌트 생성
  5. useState로 버튼에 Enable / Disable 이 들어가는 state 생성 기본값은 "Enalbe"로 생성
  6. useState로 tooltip의 disable인지를 확인하는 state 생성 기본값은 false로 생성
  ```javascript
  const [available, setAvailable] = useState("Enable");
  const [isTooltipDisabled, setIsTooltipDisabled] = useState(false);
  ```
  7. onClickAvailable 함수를 만들어 onClick 이벤트가 발생 했을 때 avilable state값이 Enable이면 setAvailable로 "Disable"로 만들고 isTooltipDisabled를 반댓값으로 설정
  8. available이 Disable 이면 setAvailable로 "Enable"로 바꿔주고 isTooltipDisabled를 반댓값으로 설정
  ```javascript
  const onClickAvailable = () => {
    if (available === "Enable") {
      setAvailable("Disable");
      setIsTooltipDisabled(!isTooltipDisabled);
    } else if (available === "Disable") {
      setAvailable("Enable");
      setIsTooltipDisabled(!isTooltipDisabled);
    }
  };
  ```
  6. 랜더링 진행
  ```javascript
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
  ```
  7. App 컴포넌트에 랜더링 될 수 있게 TooltipAvailable 컴포넌트 추가
  ```javascript
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
            </div>
        </div>
      );
    };

    export default TooltipDelay;
  ```
  9. 결과 화면
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/513cdf31-3947-41fb-804c-5eadea1d78e2">
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/6cde738d-b89d-473c-8d26-571392c7919f">




## [사용한 기술 스택 및 라이브러리]

<div align=center> 

<img height="50" src="https://github.com/Dominico-Yoon/todoApp/assets/142984862/88ed08ac-887b-4dd3-ab85-072eece1b6bc">
<img height="50" src="https://github.com/Dominico-Yoon/todoApp/assets/142984862/2f6fd621-3fb6-4cd3-b893-9e39b78d5db6">
<img height="50" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/cde5dde5-634d-4f75-ad62-a31f535acd62">
<img height="50" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/34ed60db-5b22-4103-832f-c13d1a36231c">

</div>

- 사용한 기술 스택 : HTML, CSS, TypeScript, React 
