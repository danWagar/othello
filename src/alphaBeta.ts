import { getBoardCount, checkGameOver, getPossibleBoardStates, iPosition, iCounts } from './gameAlgorithms';

export function getMinMaxMove(gameBoard: string[][], currentPlayer: string, maxDepth: number) {
  let result: { i: number; j: number } | null = null;
  let max = Number.NEGATIVE_INFINITY;
  let startTime = Date.now();

  const opponent = currentPlayer === 'w' ? 'b' : 'w';

  const boardStates = getPossibleBoardStates(gameBoard, currentPlayer);

  const miniMax = (
    gameBoard: string[][],
    move: { i: number; j: number },
    isMaximizingPlayer: boolean,
    alpha: number,
    beta: number,
    depth: number
  ) => {
    let childBoardStates = getPossibleBoardStates(gameBoard, isMaximizingPlayer ? currentPlayer : opponent);

    const counts = getBoardCount(gameBoard);

    if (
      checkGameOver(counts, currentPlayer, gameBoard) ||
      depth === maxDepth ||
      Date.now() - startTime > 5000
    ) {
      return getUtility(gameBoard, move, isMaximizingPlayer ? currentPlayer : opponent, counts, true);
    }

    if (isMaximizingPlayer) {
      let bestVal = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < childBoardStates.length; i++) {
        let value = miniMax(
          childBoardStates[i].board,
          childBoardStates[i].move,
          true,
          alpha,
          beta,
          depth + 1
        );
        bestVal = Math.max(bestVal, value);
        alpha = Math.max(alpha, bestVal);
        if (beta <= alpha) break;
      }
      return bestVal;
    } else {
      let bestVal = Number.POSITIVE_INFINITY;
      for (let i = 0; i < childBoardStates.length; i++) {
        let value = miniMax(
          childBoardStates[i].board,
          childBoardStates[i].move,
          true,
          alpha,
          beta,
          depth + 1
        );
        bestVal = Math.min(bestVal, value);
        beta = Math.min(beta, bestVal);
        if (beta <= alpha) break;
      }
      return bestVal;
    }
  };

  for (let i = 0; i < boardStates.length; i++) {
    let move = boardStates[i].move;
    let board = boardStates[i].board;

    if (checkCorners(move.i, move.j, gameBoard.length - 1)) {
      result = move;
      break;
    }

    let value = miniMax(board, move, true, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
    //
    if (value >= max) {
      max = value;
      result = move;
    }
  }

  return result;
}

export function getUtility(
  gameBoard: string[][],
  move: iPosition,
  playerColor: string,
  counts: iCounts,
  isMax: boolean
) {
  let value = 0;
  const opponent = playerColor === 'w' ? 'b' : 'w';
  const length = gameBoard.length - 1;
  const { i, j } = move;
  if (counts.b + counts.w <= (gameBoard.length * gameBoard.length) / 2) value = -counts.p;
  else value = counts[playerColor as 'w' | 'b'];

  if (
    (i === 0 && j === 0) ||
    (i === 0 && j === length) ||
    (i === length && j === 0) ||
    (i === length && j === length)
  ) {
    value *= 1000;
  } else if (i === 0 || j === 0 || i === length || j === length) {
    value *= 10;
  }

  if (isMax && counts.p === 0) value = Number.NEGATIVE_INFINITY;
  else value = Number.POSITIVE_INFINITY;

  if (checkGameOver(counts, playerColor, gameBoard)) return 0;
  else {
    if (isMax) {
      return value;
    } else {
      return -value;
    }
  }
}

function checkCorners(i: number, j: number, lastIndex: number) {
  if (
    (i === 0 && j === 0) ||
    (i === 0 && j === lastIndex) ||
    (i === lastIndex && j === 0) ||
    (i === lastIndex && j === lastIndex)
  )
    return true;
}
