import { getBoardCount, checkGameOver, getPossibleBoardStates, getUtility } from './gameAlgorithms';

export function getMinMaxMove(gameBoard: string[][], currentPlayer: string, maxDepth: number) {
  let result: { i: number; j: number } | null = null;
  let max = Number.NEGATIVE_INFINITY;

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

    if (depth === maxDepth || checkGameOver(counts, currentPlayer, gameBoard)) {
      return getUtility(gameBoard, move, currentPlayer, counts, true);
    }

    if (isMaximizingPlayer) {
      let bestVal = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < childBoardStates.length; i++) {
        let value = miniMax(
          childBoardStates[i].board,
          childBoardStates[i].move,
          false,
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
    let value = miniMax(
      boardStates[i].board,
      boardStates[i].move,
      true,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      0
    );
    if (value > max) {
      max = value;
      result = boardStates[i].move;
    }
  }

  return result;
}
