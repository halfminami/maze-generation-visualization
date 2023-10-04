import { Edge, Vertex } from '../settings';
import { edges, nodes } from './gen';
import { primGen } from './spanningTree';

describe("prim's algorithm", () => {
  const h = 3,
    w = 4;

  const weightsRight = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const weightsBottom = [
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  const spanningShouldbe: [[number, number], [number, number]][] = [
    [
      [0, 0],
      [0, 1],
    ],
    [
      [0, 1],
      [0, 2],
    ],
    [
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
    ],
    [
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 2],
    ],
    [
      [1, 2],
      [1, 3],
    ],
    [
      [1, 0],
      [2, 0],
    ],
    [
      [2, 0],
      [2, 1],
    ],
    [
      [2, 1],
      [2, 2],
    ],
    [
      [2, 2],
      [2, 3],
    ],
  ];

  test('finds minimum spanning tree', () => {
    const prim = primGen(
      edges(nodes(h, w), (fi, fj, ti, tj) => {
        if (fi == ti) {
          return weightsRight[fi][Math.min(fj, tj)];
        } else {
          return weightsBottom[Math.min(fi, ti)][fj];
        }
      })
    );

    let cur;
    while (true) {
      cur = prim.next();
      if (cur.done) {
        break;
      }
    }
    expect(hasSameEdges(cur.value, spanningShouldbe)).toBe(true);
  });
});

function hasSameEdges(
  edgesOri: Edge[],
  bareEdgesOri: [[number, number], [number, number]][]
): boolean {
  const edges = edgesOri.concat([]);
  const bareEdges = bareEdgesOri.concat([]);

  if (edges.length != bareEdges.length) {
    return false;
  }

  const sameDest = (bare: [number, number], v: Vertex) =>
    bare[0] == v[0] && bare[1] == v[1];

  for (const item of edges) {
    for (let i = 0; i < bareEdges.length; ++i) {
      if (
        (sameDest(bareEdges[i][0], item.v0) &&
          sameDest(bareEdges[i][1], item.v1)) ||
        (sameDest(bareEdges[i][1], item.v0) &&
          sameDest(bareEdges[i][0], item.v1))
      ) {
        bareEdges.splice(i, 1);
        break;
      }
    }
  }
  return bareEdges.length == 0;
}
