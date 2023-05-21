import React from 'react';
import Game from './components/Game';
import Board from './components/Board';
import Square from './components/Square';

//获胜判定
 export function calculateWinner(squares) {
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
export function isDraw(squares) {
    return squares.every(square => square !== null);
}

// 创建你的 App 组件
export default function App() {
    // 在这里编写你的组件代码
    return (
        <div className="app">
            <Game/>
        </div>
    );
}

