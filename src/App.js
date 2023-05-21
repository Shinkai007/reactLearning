import React from 'react';
import {useState} from 'react';


//游戏组件
export default function Game() {
    //记录历史
    const [history, setHistory] = useState([{squares:Array(9).fill(null),stepPosition: null, player: null}]);
    // 记录棋盘
    const [currentMove, setCurrentMove] = useState(0);
    // 记录该谁下 X/O
    const xIsNext = currentMove % 2 === 0;
    // 记录一下排序ascending or descending
    const [isAscendingOrder, setOrder] = useState(true)
    // 根据点击的历史来展示棋盘
    const currentSquares = history[currentMove].squares;

    // 处理棋盘状态+记录位置
    function handlePlay(nextSquares,stepPosition) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, stepPosition, player: xIsNext ? 'X' : 'O' }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }


    //历史记录跳转
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // 历史步骤生成
    const moves = history.map((step, move) => {
        const { squares, stepPosition,player } = step;
        let description;
        if (move > 0) {
            description = `${player} move #${move}` + (stepPosition ? ` (row: ${stepPosition.row}, col: ${stepPosition.col})` : '')
        } else {
            description = 'Go to game start';
        }
        if (move === history.length - 1 && move > 0) {
            description = 'You are at move#' + move;
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    // 管理历史步骤排序
    function handleSort() {
        setOrder(!isAscendingOrder)
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} status={status}/>
            </div>
            <div className="game-info">
                <button onClick={handleSort}>{isAscendingOrder?'Ascending':'Descending'}</button>
                {/*<ol>{isAscendingOrder?moves : moves.reverse()}</ol>*/}
                {/*这里这么写会比较好~不改变原数据*/}
                <ol>{isAscendingOrder ? [...moves] : [...moves].reverse()}</ol>
            </div>
        </div>
    );
}

// 整个棋盘
function Board({xIsNext, squares, onPlay}) {
    const draw = isDraw(squares);

    // 定义胜者
    const {winner, line} = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (draw) {
        status = "Draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // 管理棋盘的点击
    function handleClick(i) {
        const { winner, line } = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        onPlay(nextSquares, {row, col});
    }


    // 棋盘的生成
    const size = 3; // 设置棋盘大小 这里是3*3

    const boardSquares = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const winningSquare = line.includes(i*size+j);
            row.push(
                <Square
                    key={i * size + j}
                    value={squares[i * size + j]}
                    onSquareClick={() => handleClick(i * size + j)}
                    highlight={winningSquare}
                />
            );
        }
        //接受行
        boardSquares.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardSquares}
        </>
    );

}

// 每个小方块
function Square({value, onSquareClick, highlight}) {
    const className = 'square' + (highlight ? ' highlight' : '');
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

//获胜判定
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner: squares[a], line: lines[i]};
        }
    }
    return {winner:null, line:[]};
}
//判定平局
function isDraw(squares) {
    return squares.every(square => square !== null);
}
