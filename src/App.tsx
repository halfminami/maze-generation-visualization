import { useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import { gridEdge, mathrandint, gridVertex } from './generation/func';
import {
  Edge,
  WallLetters,
  badWall,
  goodWall,
  noWall,
  wait,
  wall,
} from './settings';
import { kruskalGen, primGen } from './generation/spanningTree';

function App() {
  const w = 10,
    h = 10;

  // fill Array(n) first! otherwise, the array would have same array
  // (changing the nwr[0][1] will result in changing nwr[i][1] for all i)
  // const newWallRight = (): string[][] => Array(h).fill(Array(w - 1).fill(wall));

  // array length h, string length w-1
  const newWallRight = (): WallLetters[][] =>
    Array(h)
      .fill(0)
      .map((_) => Array(w - 1).fill(wall));

  const newWallBottom = (): WallLetters[][] =>
    Array(h - 1)
      .fill(0)
      .map((_) => Array(w).fill(wall));

  const [wallRight, setWallRight] = useState(['.']);
  const [wallBottom, setWallBottom] = useState(['.']);

  const [disabled, setDisabled] = useState(false);

  const [toggle, setToggle] = useState<'prim' | 'kruskal'>('prim');

  return (
    <section>
      <h1>maze</h1>
      <main>
        <p>The maze is surrounded by walls</p>
        <button
          onClick={(f) => setToggle(toggle === 'prim' ? 'kruskal' : 'prim')}
        >
          {toggle}
        </button>
        <button
          {...{ disabled }}
          onClick={async () => {
            setDisabled(true);

            const gen = toggle === 'prim' ? primGen : kruskalGen;

            const generator = gen(
              gridEdge(gridVertex(h, w), () => mathrandint(0, 10))
            );
            const nwr = newWallRight();
            const nwb = newWallBottom();

            const setWall = (edge: Edge, wall: WallLetters) => {
              if (edge.v0[0] === edge.v1[0]) {
                nwr[edge.v0[0]][Math.min(edge.v0[1], edge.v1[1])] = wall;
              } else {
                nwb[Math.min(edge.v0[0], edge.v1[0])][edge.v0[1]] = wall;
              }
            };

            while (true) {
              const cur = generator.next();
              if (!cur.done) {
                const edge = cur.value[0];

                if (cur.value[1]) {
                  setWall(edge, goodWall);
                } else {
                  setWall(edge, badWall);
                }

                setWallRight(nwr.map((item) => item.join('')));
                setWallBottom(nwb.map((item) => item.join('')));
                await sleep(wait);

                if (cur.value[1]) {
                  setWall(edge, noWall);
                } else {
                  setWall(edge, wall);
                }
              } else {
                break;
              }
            }

            const mapGoodBadWall = (li: WallLetters[]) =>
              li.map((letter) => {
                if (letter == goodWall) {
                  return noWall;
                } else if (letter == badWall) {
                  return wall;
                } else {
                  return letter;
                }
              });

            setWallRight(nwr.map((li) => mapGoodBadWall(li).join('')));
            setWallBottom(nwb.map((li) => mapGoodBadWall(li).join('')));

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
