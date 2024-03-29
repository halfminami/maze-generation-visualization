import './Maze.scss';
import { badWall, goodWall, wall } from '../settings';

type Arg = { wallRight: string[]; wallBottom: string[]; w: number; h: number };

function Maze({ wallRight, wallBottom, w, h }: Arg) {
  w = w < 2 ? 2 : w;
  h = h < 2 ? 2 : h;
  const arr: number[][] = Array(h)
    .fill(0)
    .map((_) => Array(w).fill(0));
  while (wallBottom.length < h - 1) {
    wallBottom.push('');
  }
  while (wallRight.length < h) {
    wallRight.push('');
  }

  return (
    <div
      className="maze-frame"
      style={{ gridTemplateColumns: `repeat(${w},1fr)` }}
    >
      {arr.map((_, i) =>
        _.map((_, j) => {
          const constClassName = `${(function () {
            // checks for surrounding walls
            let s = '';
            if (i === 0) {
              s += 'top ';
            }
            if (i === h - 1) {
              s += 'bottom ';
            }
            if (j === 0) {
              s += 'left ';
            }
            if (j === w - 1) {
              s += 'right ';
            }
            return s;
          })()} ${(function () {
            // checks for input walls
            let s = '';
            if (wallRight[i][j] === wall) {
              s += 'right ';
            }
            if (wallRight[i][j - 1] === wall) {
              s += 'left ';
            }
            if (i < h - 1 && wallBottom[i][j] === wall) {
              s += 'bottom ';
            }
            if (i - 1 >= 0 && wallBottom[i - 1][j] === wall) {
              s += 'top ';
            }

            if (wallRight[i][j] === goodWall) {
              s += 'right-good ';
            }
            if (wallRight[i][j - 1] === goodWall) {
              s += 'left-good ';
            }
            if (i < h - 1 && wallBottom[i][j] === goodWall) {
              s += 'bottom-good ';
            }
            if (i - 1 >= 0 && wallBottom[i - 1][j] === goodWall) {
              s += 'top-good ';
            }

            if (wallRight[i][j] === badWall) {
              s += 'right-bad ';
            }
            if (wallRight[i][j - 1] === badWall) {
              s += 'left-bad ';
            }
            if (i < h - 1 && wallBottom[i][j] === badWall) {
              s += 'bottom-bad ';
            }
            if (i - 1 >= 0 && wallBottom[i - 1][j] === badWall) {
              s += 'top-bad ';
            }

            return s;
          })()}`;

          return (
            <div
              className={['cell', constClassName].join(' ')}
              key={JSON.stringify({ i, j })}
            ></div>
          );
        })
      )}
    </div>
  );
}

export default Maze;
