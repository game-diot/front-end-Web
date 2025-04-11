import { useState } from "react";
export default function Board() {
  // React 组件必须返回单个 JSX 元素，不能像两个按钮那样返回多个相邻的 JSX 元素。
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
// 构建可以重用的组件，React 的组件架构可以创建可重用的组件，以避免混乱、重复的代码
function Square() {
  const [value, setValue] = useState(null);
  // 点击按钮时，设置value为X
  function handleClick() {
    setValue("X");
  }
  //传递value组件给Square组件
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
