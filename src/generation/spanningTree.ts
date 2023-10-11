import { Edge, Vertex } from '../settings';
import { mapVertexToEdge, quickSortEdges, selectrandom } from './func';
import { insertionSort } from './sort';
import { UnionFind } from './unionFind';

export type Returns = Generator<[Edge, boolean], Edge[], unknown>;

// Prim's algorithm
export function* primGen(es: Edge[]): Returns {
  if (es.length === 0) {
    return [];
  }

  const d: Map<Vertex, Edge[]> = new Map();
  mapVertexToEdge(d, es);

  const addedVertex: Set<Vertex> = new Set();

  // not good idea to separate set from actual array, should search from array itself..
  const currentEdgeSet: Set<Edge> = new Set();
  const currentEdges: Edge[] = [];

  const selectedEdges: Edge[] = [];

  addedVertex.add(es[0].v0);

  currentEdges.push(...d.get(es[0].v0)!);
  d.get(es[0].v0)!.forEach((item) => currentEdgeSet.add(item));

  while (addedVertex.size < d.size) {
    quickSortEdges(currentEdges);

    let isAdded = false;
    const tosplice = []; // edges added or not selected are removed.

    for (let i = 0; i < currentEdges.length; ++i) {
      const edge = currentEdges[i];

      // do not modify edge array to splice from back
      tosplice.push(i);

      if (!addedVertex.has(edge.v0) || !addedVertex.has(edge.v1)) {
        addedVertex.add(edge.v0);
        addedVertex.add(edge.v1);

        selectedEdges.push(edge);
        yield [edge, true];

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

        isAdded = true;
        break;
      } else {
        yield [edge, false];
      }
    }
    if (!isAdded) {
      break;
    } else {
      insertionSort(tosplice, (a, b) => a < b);

      for (let i = tosplice.length - 1; i >= 0; --i) {
        const item = tosplice[i];

        currentEdges.splice(item, 1);
      }
    }
  }

  return selectedEdges;
}

// Kruskal's algorithm
export function* kruskalGen(es: Edge[]): Returns {
  if (es.length === 0) {
    return [];
  }

  const d: Map<Vertex, Edge[]> = new Map();
  mapVertexToEdge(d, es);

  const currentEdges = es.concat();
  quickSortEdges(currentEdges);

  const selectedEdges: Edge[] = [];
  const union = new UnionFind((a: Vertex) => JSON.stringify(a));

  for (const edge of currentEdges) {
    if (!union.isInSameSet(edge.v0, edge.v1)) {
      union.add(edge.v0, edge.v1);
      selectedEdges.push(edge);
      yield [edge, true];
    } else {
      yield [edge, false];
    }
    // no need to check set size. for animation only
    if (union.getSet().length > 0 && union.getSet()[0]!.size === d.size) {
      break;
    }
  }

  return selectedEdges;
}

// yields new Edge object, do not compare with reference
export function* DFSGen(es: Edge[]): Returns {
  if (es.length === 0) {
    return [];
  }

  const d: Map<Vertex, Edge[]> = new Map();
  mapVertexToEdge(d, es);

  const selectedEdges: Edge[] = [];
  const visitedSet = new Set<Vertex>();

  const stack: Vertex[] = [es[0].v0];
  const push = (a: Vertex) => stack.push(a);
  const peek = () => stack[stack.length - 1];
  const pop = () => {
    const ret = stack[stack.length - 1];
    stack.pop();
    return ret;
  };
  const empty = () => stack.length === 0;

  while (!empty()) {
    const cur = peek();
    visitedSet.add(cur);

    const notVisited: Edge[] = [];

    for (const edge of d.get(cur)!) {
      const other = cur === edge.v0 ? edge.v1 : edge.v0;

      if (!visitedSet.has(other)) {
        notVisited.push(edge);
      }
    }

    if (notVisited.length !== 0) {
      const selected = selectrandom(notVisited);

      const other = cur === selected.v0 ? selected.v1 : selected.v0;

      push(other);
      selectedEdges.push(selected);
      yield [selected, true];
    } else {
      pop();
      if (!empty()) {
        yield [{ v0: cur, v1: peek(), weight: 0 }, false];
      }
    }
  }

  return selectedEdges;
}
