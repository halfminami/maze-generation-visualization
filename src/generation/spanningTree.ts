import { Edge, Vertex } from '../settings';
import { quickSortEdges } from './gen';
import { insertionSort } from './sort';

// Prim's algorithm
export function* primGen(es: Edge[]) {
  if (es.length === 0) {
    return [];
  }

  const d: Map<Vertex, Edge[]> = new Map();
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
        yield edge;

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
      }
    }
    if (!isAdded) {
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

  return selectedEdges;
}
