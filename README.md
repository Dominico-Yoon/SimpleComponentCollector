# 💡 Tooltip Components

![image](https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/4471dac2-1b64-4eab-b95b-ef371f732b63)



> Button에 Mouse Hover, Out시 Tooltip이 나오는 TypeScript를 이용해 만든 React App 입니다.
> 
> 

### 목차

1. [주요 기능](#주요-기능)
    - [Tooltip 구현](#Tooltip-구현)
      * [Tooltip 구현](#Tooltip-구현)
      * [Tooltip 최상위 요소 이동](#Tootip-최상위-요소-이동)
    - [Tooltip Direction](#Tooltip-Direction)
    - [Tooltip Delay](#Tooltip-Delay)
    - [Tooltip Style](#Tooltip-Style)
    - [Tooltip Available](#Tooltip-Available)
2. [사용한 기술 스택 및 라이브러리](#사용한-기술-스택-및-라이브러리)
3. [프로젝트를 하며 느낀 점](#프로젝트를-하며-느낀-점)

## [주요 기능]

### 1-1-1. Tooltip 구현

- [x] Button Hover시, Tooltip 생성
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/9b02cccb-1b3c-4559-b1dc-9fc51b48b309">


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
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/177d41f9-7e2b-43b5-8007-50c60095e5d7">

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



### 1-3. Tooltip Delay

- [x] 툴팁이 나타나거나 사라질 때 딜레이를 추가하려면 setTimeout을 사용하여 딜레이 구현
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/60bd4ad8-88da-4e53-a0cd-c5e8d1b817db">





### 1-4. Tooltip Style

- [x] State에 초기값 input 객체에 createdDate는 Date객체로 초기화, emotionId는 1~5 중간값인 3, content는 비어있음으로 초기화를 시켜줍니다.
- [x] 각 태그에서 onChangeInput() 함수를 사용하여 값이 변경이 될 때, setInput으로 State값을 바꿔줍니다.
- [x] 값을 전부 채우고 작성완료 버튼 클릭시 New Page에서 받아온 onSubmit() 함수를 이용해 State값 들을 새로 추가해 줍니다.
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/dailyEmotionDiary/assets/142984862/185770fc-cdeb-46c1-8e2e-10273cc644eb">
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/dailyEmotionDiary/assets/142984862/9ef4b67b-48b1-4219-823e-9448dea19ce9">



### 1-5. Tooltip Available

- [x] useParams()를 이용해 URL에서 받은 값을 통해 새로 만든 커스텀 훅인 useDiary로 Data를 갖고와서 보여줍니다.
<img width="500" alt="image" src="https://github.com/Dominico-Yoon/dailyEmotionDiary/assets/142984862/de23baf8-fac1-492d-852a-d3858ca528a3">





## [사용한 기술 스택 및 라이브러리]

<div align=center> 

<img height="50" src="https://github.com/Dominico-Yoon/todoApp/assets/142984862/88ed08ac-887b-4dd3-ab85-072eece1b6bc">
<img height="50" src="https://github.com/Dominico-Yoon/todoApp/assets/142984862/2f6fd621-3fb6-4cd3-b893-9e39b78d5db6">
<img height="50" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/cde5dde5-634d-4f75-ad62-a31f535acd62">
<img height="50" src="https://github.com/Dominico-Yoon/SimpleComponentCollector/assets/142984862/34ed60db-5b22-4103-832f-c13d1a36231c">

</div>

- 사용한 기술 스택 : HTML, CSS, TypeScript, React

## [프로젝트를 하며 느낀 점]
예전에 진행했던 프로젝트 보다는 시간은 얼마 걸리지 않았습니다.
하지만 여러 Page들이 생기다 보니 기획 하는거에 대해 생각할게 많아졌습니다.
데이터들도 많은 페이지, 컴포넌트에서 다뤄야 하다 보니 Context의 활용방식에 대해 좀더 알게되었습니다.
그리고 MPA보다 SPA방식이 좀 더 최적화가 좋다는 것에도 대해 알게되었습니다.
