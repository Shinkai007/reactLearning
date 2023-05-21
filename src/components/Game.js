import React, {useState} from 'react';

import Board from "./Board";

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
