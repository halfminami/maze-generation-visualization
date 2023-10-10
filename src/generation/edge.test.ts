import { gridEdge, gridVertex } from './func';

describe('nodes and edges', () => {
  const w = 3,
    h = 4,
    f = () => 0;
  const ns = gridVertex(w, h);

  test('node index', () => {
    let f = true;
    for (let i = 0; i < ns.length; ++i) {
      for (let j = 0; j < ns[i].length; ++j) {
        if (ns[i][j][0] != i || ns[i][j][1] != j) {
          f = false;
        }
      }
    }
    expect(f).toBe(true);
  });

  const es = gridEdge(ns, f);

  test('length', () => {
    expect(es.length).toBe(h * (w - 1) + w * (h - 1));
  });
});
