// 引入计时器组件
import { useState } from "react";
// 建立Square方块组件，Square组件接收value和onSquareClick两个props，value表示当前方格的值，onSquareClick表示点击该方格的回调函数。
// 使用Square组件，会返回一个类名为square，点击事件调用onSquareClick函数的button元素。button元素的内容为变量value
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// 建立calculateWinner函数，用于判断是否存在三点一线为同一值的情况。
// 该函数接收squares参数，squares参数是一个长度为9的数组，数组的每个元素代表棋盘的某个位置的状态。
// 该函数会遍历棋盘的8条线，每条线都有3个位置，如果这3个位置的状态都相同，则返回这3个位置的状态。如果遍历完所有线都没有找到赢家，则返回null。
function calculateWinner(squares) {
  // 定义井字棋中可能获胜的8条线
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // 将当前线的3个位置的状态提取出来
    const [a, b, c] = lines[i];
    // 判断这3个位置的状态是否相同，既判断这三个位置是否为同一个值X或者O
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 若三个位置都一样，返回这个相同的值X或O
      return squares[a];
    }
  }
  // 遍历完所有线都没有找到符合三个相同值在一条线上，返回null
  return null;
}

// 建立Board棋盘组件，Board组件接受xIsNext、squares、onPlay三个porps，xIsNext表示当前轮到X还是O，squares表示棋盘的状态，onPlay表示点击棋盘的回调函数。
function Board({ xIsNext, squares, onPlay }) {
  // 建立一个处理点击的函数，该函数接收一个参数i，表示点击的位置，该函数会判断当前方格是否为空，如果为空，则更新squares数组，并调用onPlay函数，onPlay函数会更新历史记录和当前轮到谁。
  function handleClick(i) {
    // 仅判断是否存在三点一线同一值的情况或者该点的状态已经有值为true，
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 使用数组中的slice方法，创建一个新的数组，并将原数组的元素复制到新数组中，这样可以避免修改原数组导致其他组件的状态变化。
    const nextSquares = squares.slice();
    // 始终为true的去判断，切换下一个值为X或O
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // 更新squares数组和轮到谁
    onPlay(nextSquares);
  }
  // 定义HTML可以看到的部分，包括棋盘的状态、轮到谁、点击棋盘的事件处理函数。
  const winner = calculateWinner(squares); // 调用calculateWinner函数，判断是否存在三点一线同一值的情况
  let status;
  // 判断如果calculateWinner函数返回了值，则说明存在三点一线同一值的情况，status为Winner: X或O；否则，status为Next player: X或O
  if (winner) {
    status = "Winner: " + winner; // 存在三点一线同一值的情况，状态展示为Winner: X或O
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); //不存在胜利情况，状态展示为提示下一步Next player: X或O
  }
  //返回整个棋盘的布局
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//默认导出供使用的组件,供index.js调用，于index.html中渲染
export default function Game() {
  // 定义useState，一个history历史记录变量，一个setHistory更新历史记录变量的函数，初始历史变量时一个数组，数组内9个元素均为null。
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 定义useState，一个currentMove当前轮到谁的变量，一个setCurrentMove更新currentMove变量的函数，初始值为0。
  const [currentMove, setCurrentMove] = useState(0);
  // 定义变量xIsNext，为布尔值，即如果currentMove为偶数，则xIsNext为true，否则为false。
  const xIsNext = currentMove % 2 === 0;
  // 定义变量currentSquares，历史记录数组，九个空格中的当前点击的格子的状态。
  const currentSquares = history[currentMove];
  // 定义handlePlay函数，该函数接收一个参数nextSquares，nextSquares是一个长度为9的数组，数组的每个元素代表棋盘的某个位置的状态。
  function handlePlay(nextSquares) {
    // 从 history 中提取从开始到当前回合（包括当前回合）的所有状态，并将 nextSquares 追加到数组的末尾，得到新的历史记录
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // 更新history数组和currentMove变量，新的历史数组整体替换旧的数组，currentMove变量更新为新的数组长度减一。
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // 定义jumpTo函数，该函数接收一个参数nextMove，nextMove是一个整数，表示跳转到哪一步历史记录。
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // 更新currentMove变量，上面的state更新会触发重新渲染
  }
  // 对history数组内每一个元素进行map操作，详细操作为箭头函数，箭头函数接收squares和move两个参数，squares表示棋盘的状态，move表示历史记录的索引。
  const moves = history.map((squares, move) => {
    let description;
    // 如果move大于0，说明不是游戏开始，description为Go to move # + move；否则，description为Go to game start。用于记录操作的步骤，点击某个空格
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    // 返回一个li元素，li元素的key值为move，点击该li元素会调用jumpTo函数，jumpTo函数会更新currentMove变量，触发重新渲染。
    //返回一个jsx语句，li的key为该元素设定的属性，作为标识符记录
    //按钮点击后，会触发函数跳转到move的历史记录，内容为对应的描述
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  // 返回一个jsx语句，div的className为game，包含棋盘“Board组件以及其对应的参数-对应的棋盘状态、轮到谁、点击棋盘的事件处理函数”
  // 操作记录“moves”数组，包含每一步操作的描述、点击某个操作记录会触发jumpTo函数，jumpTo函数会更新currentMove变量，触发重新渲染。
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
