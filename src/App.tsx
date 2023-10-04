import { useState } from 'react';
import './App.css';
import Maze from './Maze';
import { edges, mathrandint, nodes } from './generation/gen';
import { Vertex, noWall, wait, wall } from './settings';
import { primGen } from './generation/spanningTree';

function App() {
  const w = 10,
    h = 10;
  // const w = 4,
  //   h = 3;

  // fill Array(n) first! otherwise, the array would have same array
  // (changing the nwr[0][1] will result in changing nwr[i][1] for all i)
  // const newWallRight = (): string[][] => Array(h).fill(Array(w - 1).fill(wall));

  // array length h, string length w-1
  const newWallRight = (): string[][] =>
    Array(h)
      .fill(0)
      .map((_) => Array(w - 1).fill(wall));

  const newWallBottom = (): string[][] =>
    Array(h - 1)
      .fill(0)
      .map((_) => Array(w).fill(wall));

  const [wallRight, setWallRight] = useState(['']);
  const [wallBottom, setWallBottom] = useState(['']);

  const [disabled, setDisabled] = useState(false);

  return (
    <section>
      <h1>maze</h1>
      <main>
        <p>The maze is surrounded by walls</p>
        <button
          {...{ disabled }}
          onClick={async () => {
            setDisabled(true);

            const prim = primGen(edges(nodes(h, w), () => mathrandint(0, 10)));
            const nwr = newWallRight();
            const nwb = newWallBottom();

            while (true) {
              const cur = prim.next();
              if (!cur.done) {
                const edge = cur.value;

                if (edge.v0[0] == edge.v1[0]) {
                  nwr[edge.v0[0]][Math.min(edge.v0[1], edge.v1[1])] = noWall;
                } else {
                  nwb[Math.min(edge.v0[0], edge.v1[0])][edge.v0[1]] = noWall;
                }

                setWallRight(nwr.map((item) => item.join('')));
                setWallBottom(nwb.map((item) => item.join('')));
                await sleep(wait);
              } else {
                break;
              }
            }

            setDisabled(false);
          }}
        >
          go
        </button>
        <Maze {...{ wallBottom, wallRight, w, h }} />
      </main>
    </section>
  );
}

function sleep(time: number) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}

export default App;
