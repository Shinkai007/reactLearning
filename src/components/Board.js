import React from 'react';
import Square from "./Square";
import {isDraw} from "../App";
import {calculateWinner} from "../App";
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

export default Board;
