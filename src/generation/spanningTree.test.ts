import { Edge, Vertex } from '../settings';
import { edges, nodes } from './gen';
import { primGen } from './spanningTree';
import { SpanningTreeTestArg, spanningTreeTests } from './testdata';

describe('spanning trees', () => {
  describe("prim's algorithm", () => {
    runTest(primGen);
  });
});

function runTest(spanningGen: (es: Edge[]) => Generator<any, Edge[], unknown>) {
  function wrapTest({
    h,
    w,
    weightsRight,
    weightsBottom,
    minimumTree,
    desc,
  }: SpanningTreeTestArg) {
    test(desc, () => {
      const gen = spanningGen(
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
        cur = gen.next();
        if (cur.done) {
          break;
        }
      }

      expect(hasSameEdges(cur.value, minimumTree)).toBe(true);
    });
  }

  wrapTest(spanningTreeTests[0]);
  wrapTest(spanningTreeTests[1]);
  wrapTest(spanningTreeTests[2]);
}

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
