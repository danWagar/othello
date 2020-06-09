/* 
Algorithm:

we recursively iterate through all potential combos of rows, columns and diagonals.

if we find a blank followed by opponent piece, search until we find a hero piece and mark original blank as playable, 
    unless we firse encounter a blank.

if we find hero piece followed by an opponent piece, search until we encounter a blank and mark the blank as playable,
    unless we first encounter a hero piece.

we iterate through the 2d array in 4 directions so O(4*n^2) -> O(n^2)
*/

interface iLastHeroPosition {
  i: number;
  j: number;
}

interface iLastPotentialMove {
  i: number;
  j: number;
}

export default function searchForMoves(gameboard: string[][], playerColor: string) {
  //we use a nested function to avoid having to pass gameboard and playerColor in our recursive function
  const mapMoves = (
    i: number,
    j: number,
    incrementI: number,
    incrementJ: number,
    lastPotentialMove: iLastPotentialMove | null = null,
    lastHeroPosition: iLastHeroPosition | null = null
  ) => {
    if (i >= gameboard.length - 1 || j >= gameboard.length - 1 || i < 0 || j < 0) return;

    const current = gameboard[i][j];
    const next = gameboard[i + incrementI][j + incrementJ];

    //check for case of blank square followed by opponent owned square
    //we remember the blank square in case a move is possible further down the line
    if (!current && isOpponent(playerColor, next)) {
      lastPotentialMove = { i: i, j: j };
      i += incrementI;
      j += incrementJ;
    }
    //check for case where there is a hero piece followed by opponent piece
    //remember position of hero piece in case a move will be possible
    else if (current === playerColor && isOpponent(playerColor, next)) {
      lastHeroPosition = { i: i, j: j };
    }
    //check for opponent square followed by blank square
    //and mark playable if lastHeroPosition not null
    else if (isOpponent(playerColor, current) && !next) {
      if (lastHeroPosition) {
        gameboard[i + incrementI][j + incrementJ] = 'p';
        lastHeroPosition = null;
      }
    }
    //if there was a previous potential move, this is the case where that move
    //is shown to be playable
    else if (current === playerColor) {
      if (lastPotentialMove) gameboard[lastPotentialMove.i][lastPotentialMove.j] = 'p';
      lastPotentialMove = null;
      lastHeroPosition = { i: i, j: j };
    }
    //when we encounter a blank that does not represent a potential move,
    //it means no potential previous moves, so we reset
    else if (!current) {
      if (lastPotentialMove) lastPotentialMove = null;
      if (lastHeroPosition) lastHeroPosition = null;
    }

    mapMoves(i + incrementI, j + incrementJ, incrementI, incrementJ, lastPotentialMove, lastHeroPosition);
  };

  //map rows, columns, and top half diagonals
  //we could make optimization by avoiding to search the diagonals in the corners where length less than two,
  //but it is quite negligible
  for (let i = 0; i < gameboard.length; i++) {
    //map rows
    mapMoves(i, 0, 0, 1);
    //map columns
    mapMoves(0, i, 1, 0);
    //map right to left 'downward' sloping diagonals
    mapMoves(0, i, 1, 1);
    //map left to right 'downward' sloping diagonals
    mapMoves(0, i, 1, -1);
    //map left to right 'upward' sloping diagonals
    mapMoves(gameboard.length, i, -1, 1);
    //map right to left 'upward' sloping diagonals
    mapMoves(gameboard.length, i, -1, -1);
  }

  return gameboard;
}

function isOpponent(playerColor: string, square: string) {
  if (!square) return false;
  if (square === playerColor) return false;
  return true;
}

// export function testMapRowColumnOrDiagonalMoves() {
//   let testArrs = [
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', 'w', 'b', '', '', ''],
//     ['', '', '', 'b', 'w', '', '', ''],
//     ['', '', '', '', 'w', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//   ];

//   let expected = [
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', 'p', '', '', '', ''],
//     ['', '', 'p', 'w', 'b', '', '', ''],
//     ['', '', '', 'b', 'w', 'p', '', ''],
//     ['', '', '', '', 'p', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//   ];

// let passing = true;
// for (let i = 0; i < testArrs.length; i++) {
//   const result = mapRowColumnOrDiagonalMoves(testArrs[i], 'w');
//   if (!isSame(result, expected[i])) {
//     console.log('test failed compairing result: ', result, ' to expected', expected[i]);
//     passing = false;
//   }
// }

//   const result = getMoves(testArrs, 'b');

//   console.log('test failed compairing result: ', result, ' to expected', expected);
// }

// function isSame(array1: string[], array2: string[]) {
//   return array1.length === array2.length && array1.every((element, index) => element === array2[index]);
// }
