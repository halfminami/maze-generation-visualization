import { Edge, Vertex } from '../settings';
import { quickSort } from './sort';

export function nodes(w: number, h: number): Vertex[][] {
  return Array(h)
    .fill(Array(w).fill(0))
    .map((_, i) => _.map((_: number[], j: number) => [i, j]));
}

export function edges(ns: Vertex[][], f: () => number): Edge[] {
  const ret: Edge[] = [];

  for (let i = 0; i < ns.length; ++i) {
    for (let j = 0; j < ns[i].length; ++j) {
      if (j + 1 < ns[i].length) {
        ret.push({ v0: ns[i][j], v1: ns[i][j + 1], weight: f() });
      }
      if (i + 1 < ns.length) {
        ret.push({ v0: ns[i][j], v1: ns[i + 1][j], weight: f() });
      }
    }
  }
  return ret;
}

/** sort edges weight increasing order */
export function sortEdges(arr: Edge[]) {
  quickSort(
    arr,
    (a, b) => a.weight == b.weight,
    (a, b) => a.weight < b.weight
  );
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
