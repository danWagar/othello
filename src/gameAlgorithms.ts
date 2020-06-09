export function getMoves(gameboard: string[][]) {}

/* if we find a blank followed by opponent piece, search until we find hero piece and mark original blank as possible play, 
       unless we find a blank then continue search.
   
   if we find opponent piece followed by blank, mark blank as possible play when last square visited that did not
       contain an opponent piece contained a hero piece.
*/

interface iLastNonHeroPiece {
  type: string;
  index: number;
}

function mapRowColumnOrDiagonalMoves(row: string[], playerColor: string) {
  let lastNonHeroPiece: iLastNonHeroPiece | null = null;
  for (let i = 0; i < row.length; i++) {
    console.log('in for loop i is ' + i);

    //blank followed by opponent piece
    if (!row[i] && isOpponent(playerColor, row[i + 1])) {
      console.log('found blank followed by opponent piece');
      console.log('current square is index ' + i + ' containing ' + row[i]);
      const blank = i;
      let foundMove = false;
      i += 2;
      while (i < row.length && !foundMove) {
        console.log('current square is index ' + i + ' containing ' + row[i]);
        if (!row[i]) {
          console.log('this square is blank');
          lastNonHeroPiece = { type: row[i], index: i };
          i--; //so we don't skip test case for blank followed by opposite in for loop;
          break;
        } else if (row[i] === playerColor) {
          row[blank] = 'p';
          foundMove = true;
          i++;
        } else i++;
      }
    }
    //opponent piece followed by blank
    else if (isOpponent(playerColor, row[i]) && !row[i + 1]) {
      const found = i + 1;

      if (lastNonHeroPiece && lastNonHeroPiece.type === playerColor) row[found] = 'p';

      lastNonHeroPiece = { type: row[found], index: found };
    } else if (!isOpponent(playerColor, row[i])) {
      lastNonHeroPiece = { type: row[i], index: i };
    }
  }

  return row;
}

function isOpponent(playerColor: string, square: string) {
  if (!square) return false;
  if (square === playerColor) return false;
  return true;
}

export function testMapRowColumnOrDiagonalMoves() {
  let testArrs = [
    ['', 'b', 'b', '', 'b', 'b', 'b', 'w'],
    ['w', '', 'w', 'b', 'b', 'b', 'b', ''],
  ];

  let expected = [
    ['', 'b', 'b', 'p', 'b', 'b', 'b', 'w'],

    ['w', '', 'w', 'b', 'b', 'b', 'b', 'p'],
  ];

  let passing = true;
  for (let i = 0; i < testArrs.length; i++) {
    const result = mapRowColumnOrDiagonalMoves(testArrs[i], 'w');
    if (!isSame(result, expected[i])) {
      console.log('test failed compairing result: ', result, ' to expected', expected[i]);
      passing = false;
    }
  }

  return passing;
}

function isSame(array1: string[], array2: string[]) {
  return array1.length === array2.length && array1.every((element, index) => element === array2[index]);
}
