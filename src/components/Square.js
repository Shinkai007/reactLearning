import React from 'react';


// 每个小方块
function Square({value, onSquareClick, highlight}) {
    const className = 'square' + (highlight ? ' highlight' : '');
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}


export default Square;
