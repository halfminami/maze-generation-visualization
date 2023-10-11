import { Edge, Vertex } from '../settings';
import { insertionSort, quickSort } from './sort';

export function gridVertex(h: number, w: number): Vertex[][] {
  return Array(h)
    .fill(Array(w).fill(0))
    .map((_, i) => _.map((_: number[], j: number) => [i, j]));
}

export function gridEdge(
  ns: Vertex[][],
  f: (fi: number, fj: number, ti: number, tj: number) => number
): Edge[] {
  const ret: Edge[] = [];

  for (let i = 0; i < ns.length; ++i) {
    for (let j = 0; j < ns[i].length; ++j) {
      if (j + 1 < ns[i].length) {
        ret.push({ v0: ns[i][j], v1: ns[i][j + 1], weight: f(i, j, i, j + 1) });
      }
      if (i + 1 < ns.length) {
        ret.push({ v0: ns[i][j], v1: ns[i + 1][j], weight: f(i, j, i + 1, j) });
      }
    }
  }
  return ret;
}

export function mapVertexToEdge(d: Map<Vertex, Edge[]>, es: Edge[]) {
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
}

/** sort edges weight increasing order */
export function quickSortEdges(arr: Edge[]) {
  quickSort(
    arr,
    (a, b) => a.weight === b.weight,
    (a, b) => a.weight < b.weight
  );
}

export function insertionSortEdges(arr: Edge[]) {
  insertionSort(arr, (a, b) => a.weight < b.weight);
}

// includes begin and end
export function mathrandint(begin: number, end: number): number {
  end++;
  if (0 < end - begin && end - begin < 1) return Math.floor(end);
  begin = Math.ceil(begin);
  end = Math.floor(end);
  if (end - begin < 0) return 0;
  return Math.min(Math.floor(Math.random() * (end - begin)) + begin, end - 1);
}

export function selectrandom<T>(li: T[]) {
  return li[mathrandint(0, li.length - 1)];
}
