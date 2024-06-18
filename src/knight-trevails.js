const createBoard = () => {
    const board = []
    for (let i = 0 ; i < 8; i++) {
        for (let j = 0 ; j < 8; j++) {
            board.push(square(i,j))
        }
    }


    return board
}



const square = (row, column) => {
    const location = [row, column]
    return {
        location
    }
}

const addKnightMoves = (square) => {
    square.knightCanMoveTo = knightMove(square.location)
}

const knightMove = (location) => {
    
    const move1 = [location[0] + 1, location[1] + 2]
    const move2 = [location[0] + 1, location[1] - 2]
    const move3 = [location[0] - 1, location[1] + 2]
    const move4 = [location[0] - 1, location[1] - 2]
    const move5 = [location[0] + 2, location[1] + 1]
    const move6 = [location[0] + 2, location[1] - 1]
    const move7 = [location[0] - 2, location[1] + 1]
    const move8 = [location[0] - 2, location[1] - 1]
    const possibleMoves = [move1,move2,move3,move4,move5,move6,move7,move8]
    const vaildMoves = []

    for (let i = 0 ; i < possibleMoves.length; i++) {
        if (possibleMoves[i][0] >= 0 && possibleMoves[i][1] >= 0 && possibleMoves[i][0] < 8 && possibleMoves[i][1] < 8 ) {
            let squareToMove = board.filter((square)=>{
                return (square.location[0] === possibleMoves[i][0]) && (square.location[1] === possibleMoves[i][1])
            })
            vaildMoves.push(squareToMove[0])
        }
    }

    return vaildMoves

}

const searchKnightPath = (from, to) => {
 const initialSquare = board.filter((square)=> (square.location[0] === from[0]) && (square.location[1] === from[1]))[0]
 const visitedSquares = []
 const queue = [[initialSquare, [initialSquare.location]]]


 function checkIfIsTo(square, path) {
    path.push(toChessNotation(square.location))
    if ((square.location[0] === to[0]) && (square.location[1] === to[1])) {
        return path
    }
    for (let i = 0 ; i < square.knightCanMoveTo.length ; i++) {
        if (!visitedSquares.includes(square.knightCanMoveTo[i])) {
            queue.push([square.knightCanMoveTo[i], path.slice()])
        }
    }
    
    return checkIfIsTo(...queue.shift())

 }

 return checkIfIsTo(initialSquare, [])
/* return checkIfIsTo(...queue.shift()) */

}

function toChessNotation(coord) {
    let column;
    switch (coord[0]) {
        case 0: column = 'a'; break;
        case 1: column = 'b'; break;
        case 2: column = 'c'; break;
        case 3: column = 'd'; break;
        case 4: column = 'e'; break;
        case 5: column = 'f'; break;
        case 6: column = 'g'; break;
        case 7: column = 'h'; break;
        default: console.log('notation error'); return null;
    }
    let row = coord[1] + 1;
    return column+ row;
}

const board = createBoard()
board.forEach(addKnightMoves)
console.log(searchKnightPath([3,3],[4,3]))

