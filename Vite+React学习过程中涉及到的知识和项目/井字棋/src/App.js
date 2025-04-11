export default function Board() {
  // React 组件必须返回单个 JSX 元素，不能像两个按钮那样返回多个相邻的 JSX 元素。
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
// 构建可以重用的组件，React 的组件架构可以创建可重用的组件，以避免混乱、重复的代码
function Square({ value }) {
  //传递value组件给Square组件
  return <button className="square">{value}</button>;
}
