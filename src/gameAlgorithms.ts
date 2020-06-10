/* 
Algorithm:

we recursively iterate through all potential combos of rows, columns and diagonals.

if we find a blank followed by opponent piece, search until we find a hero piece and mark original blank as playable, 
    unless we first encounter a blank.

if we find hero piece followed by an opponent piece, search until we encounter a blank and mark the blank as playable,
    unless we first encounter a hero piece.

we iterate through the 2d array in 4 directions so O(4*n^2) -> O(n^2)
*/

interface iPosition {
  i: number;
  j: number;
}

interface iCounts {
  b: number;
  w: number;
  p: number;
}

export function searchForMoves(gameBoard: string[][], playerColor: string) {
  const markedBoard = gameBoard.map((row, i) => row.map((square, j) => (square === 'p' ? '' : square)));
  //we use a nested function to avoid having to pass gameBoard and playerColor in our recursive function
  const mapMoves = (
    i: number,
    j: number,
    incrementI: number,
    incrementJ: number,
    lastPotentialMove: iPosition | null = null,
    lastHeroPosition: iPosition | null = null
  ) => {
    if (i >= gameBoard.length || j >= gameBoard.length || i < 0 || j < 0) return;

    const current = gameBoard[i][j];
    let next: string | null = null;
    try {
      next = gameBoard[i + incrementI][j + incrementJ];
    } catch (e) {}

    //check for case of blank square followed by opponent owned square
    //we remember the blank square in case a move is possible further down the line
    if (!current && isOpponent(playerColor, next)) {
      lastPotentialMove = { i: i, j: j };
    }
    //check for case where there is a hero piece followed by opponent piece
    //remember position of hero piece in case a move will be possible
    else if (current === playerColor && isOpponent(playerColor, next)) {
      lastHeroPosition = { i: i, j: j };
      if (lastPotentialMove) {
        markedBoard[lastPotentialMove.i][lastPotentialMove.j] = 'p';
        lastPotentialMove = null;
      }
    }
    //check for opponent square followed by blank square
    //and mark playable if lastHeroPosition not null
    else if (isOpponent(playerColor, current) && !next) {
      if (lastHeroPosition) {
        const row = i + incrementI;
        const column = j + incrementJ;
        if (row < gameBoard.length && column < gameBoard.length) markedBoard[row][column] = 'p';
        lastHeroPosition = null;
      }
    }
    //if there was a previous potential move, this is the case where that move
    //is shown to be playable
    else if (current === playerColor) {
      if (lastPotentialMove) {
        markedBoard[lastPotentialMove.i][lastPotentialMove.j] = 'p';
        lastPotentialMove = null;
      }
      //lastHeroPosition = { i: i, j: j };
    }
    //when we encounter a blank that does not represent a potential move,
    //it means no potential previous moves, so we reset
    else if (!current) {
      if (lastPotentialMove) lastPotentialMove = null;
      if (lastHeroPosition) lastHeroPosition = null;
    }

    mapMoves(i + incrementI, j + incrementJ, incrementI, incrementJ, lastPotentialMove, lastHeroPosition);
  };

  for (let i = 0; i < gameBoard.length; i++) {
    //map rows
    mapMoves(i, 0, 0, 1);
    //map columns
    mapMoves(0, i, 1, 0);
    //map right to left 'downward' sloping diagonals
    mapMoves(0, i, 1, 1);
    //map left to right 'downward' sloping diagonals
    mapMoves(0, i, 1, -1);
    //map left to right 'upward' sloping diagonals
    mapMoves(gameBoard.length, i, -1, 1);
    //map right to left 'upward' sloping diagonals
    mapMoves(gameBoard.length, i, -1, -1);
  }

  return markedBoard;
}

function isOpponent(playerColor: string, square: string | null) {
  if (!square) return false;
  if (square === playerColor) return false;
  return true;
}

export function updateBoard(gameBoard: string[][], row: number, column: number, playerColor: string) {
  const originalPosition = { i: row, j: column };

  const changedBoard = gameBoard.map((_row, i) =>
    _row.map((square, j) => {
      if (i === row && j === column) {
        return playerColor;
      } else if (square === 'p') return '';
      return square;
    })
  );

  const makeUpdates = (i: number, j: number, incrementI: number, incrementJ: number): boolean => {
    const atStart = i === originalPosition.i && j === originalPosition.j;

    if (i >= gameBoard.length || j >= gameBoard.length || i < 0 || j < 0 || !changedBoard[i][j]) return false;
    if (changedBoard[i][j] === playerColor && !atStart) return true;

    let changed = makeUpdates(i + incrementI, j + incrementJ, incrementI, incrementJ);
    if (changed && !atStart) changedBoard[i][j] = playerColor;

    return changed;
  };

  //change to right
  makeUpdates(row, column, 0, 1);
  //change to left
  makeUpdates(row, column, 0, -1);
  //change to down
  makeUpdates(row, column, 1, 0);
  //change to up
  makeUpdates(row, column, -1, 0);
  //change to bottom right
  makeUpdates(row, column, 1, 1);
  //change to bottom left
  makeUpdates(row, column, 1, -1);
  //change to top right
  makeUpdates(row, column, -1, 1);
  //change to top left
  makeUpdates(row, column, -1, -1);

  return changedBoard;
}

export function getBoardCount(gameBoard: string[][]) {
  let blackCount = 0;
  let whiteCount = 0;
  let pCount = 0;

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard.length; j++) {
      const current = gameBoard[i][j];
      if (current === 'b') blackCount++;
      else if (current === 'w') whiteCount++;
      else if (current === 'p') pCount++;
    }
  }

  return { b: blackCount, w: whiteCount, p: pCount };
}

export function getRandomMove(gameBoard: string[][]) {
  const possibleMoves: iPosition[] = [];
  gameBoard.map((row, i) => row.forEach((square, j) => square === 'p' && possibleMoves.push({ i: i, j: j })));

  const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  if (move) return move;
  return null;
}

/*
  Win conditiions:
  1) board is full
  2) neither player can move
  3) only pieces of one color are on the baord
*/
export function checkGameOver(counts: iCounts, playerTurn: string, gameBoard: string[][]) {
  if (counts.b + counts.w === gameBoard.length * gameBoard.length) return true;

  if (counts.p === 0) {
    const nextTurnMoves = searchForMoves(gameBoard, playerTurn === 'w' ? 'b' : 'w');
    const nextTurnCounts = getBoardCount(nextTurnMoves);

    if (nextTurnCounts.p === 0) return true;
  }

  if (counts.b === 0 || counts.w === 0) return true;

  return false;
}
