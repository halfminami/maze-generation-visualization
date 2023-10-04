import { useState } from 'react';
import './App.css';
import Maze from './Maze';
import { edges, mathrandint, nodes, sortEdges } from './generation/gen';
import { Edge, Node, noWall, wait, wall } from './settings';
import { insertionSort } from './generation/sort';

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

  const [wallRight, setWallRight] = useState(
    newWallRight().map((item) => item.join(''))
  );
  const [wallBottom, setWallBottom] = useState(
    newWallBottom().map((item) => item.join(''))
  );

  const [disabled, setDisabled] = useState(false);

  return (
    <section>
      <h1>maze</h1>
      hello
      <main>
        <p>The maze is surrounded by walls</p>
        <button
          {...{ disabled }}
          onClick={async () => {
            setDisabled(true);
            // Prim's algorithm

            const nwr = newWallRight();
            const nwb = newWallBottom();
            const es = edges(nodes(w, h), () => mathrandint(0, 10));

            const d: Map<Node, Edge[]> = new Map();
            // map Node => Edge
            for (const item of es) {
              if (!d.has(item.v0)) {
                d.set(item.v0, []);
              }
              if (!d.has(item.v1)) {
                d.set(item.v1, []);
              }
              d.set(item.v0, d.get(item.v0)!.concat([item]));
              d.set(item.v1, d.get(item.v1)!.concat([item]));
            }

            const addedEdges: Set<Node> = new Set();
            const currentEdgeSet: Set<Edge> = new Set();
            const currentEdges: Edge[] = [];

            addedEdges.add(es[0].v0);
            currentEdges.push(...d.get(es[0].v0)!);
            d.get(es[0].v0)!.forEach((item) => currentEdgeSet.add(item));

            while (addedEdges.size < h * w) {
              sortEdges(currentEdges);

              let f = false;
              const tosplice = []; // already added edges
              for (let i = 0; i < currentEdges.length; ++i) {
                const edge = currentEdges[i];
                // show progress
                setWallRight(nwr.map((item) => item.join('')));
                setWallBottom(nwb.map((item) => item.join('')));
                await sleep(wait);

                if (!addedEdges.has(edge.v0) || !addedEdges.has(edge.v1)) {
                  addedEdges.add(edge.v0);
                  addedEdges.add(edge.v1);
                  if (edge.v0[0] == edge.v1[0]) {
                    nwr[edge.v0[0]][Math.min(edge.v0[1], edge.v1[1])] = noWall;
                  } else {
                    nwb[Math.min(edge.v0[0], edge.v1[0])][edge.v0[1]] = noWall;
                  }

                  d.get(edge.v0)!.forEach((item) => {
                    if (!currentEdgeSet.has(item)) {
                      currentEdges.push(item);
                      currentEdgeSet.add(item);
                    }
                  });
                  d.get(edge.v1)!.forEach((item) => {
                    if (!currentEdgeSet.has(item)) {
                      currentEdges.push(item);
                      currentEdgeSet.add(item);
                    }
                  });
                  currentEdges.splice(i, 1);
                  currentEdgeSet.delete(edge);

                  f = true;
                  break;
                } else {
                  tosplice.push(i);
                }
              }
              if (!f) {
                break;
              } else {
                insertionSort(tosplice, (a, b) => a < b);
                for (let i = tosplice.length - 1; i >= 0; --i) {
                  const item = tosplice[i];
                  currentEdgeSet.delete(currentEdges[item]);
                  currentEdges.splice(item, 1);
                }
              }
            }

            setWallRight(nwr.map((item) => item.join('')));
            setWallBottom(nwb.map((item) => item.join('')));
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
