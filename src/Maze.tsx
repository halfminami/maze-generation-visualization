import React from 'react';
import './Maze.scss';
import ToggleButton from './ToggleButton';
import { wall } from './settings';

type Arg = { wallRight: string[]; wallBottom: string[]; w: number; h: number };

function Maze({ wallRight, wallBottom, w, h }: Arg) {
  const arr: number[][] = Array(h).fill(Array(w).fill(0));
  while (wallBottom.length < h - 1) {
    wallBottom.push('');
  }
  while (wallRight.length < h) {
    wallRight.push('');
  }
  console.log(wallRight);

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

            return s;
          })()}`;

          return (
            <ToggleButton
              classNames={['', 'checked']}
              {...{ constClassName }}
              key={JSON.stringify({ i, j })}
            ></ToggleButton>
          );
        })
      )}
    </div>
  );
}

export default Maze;
