import { UnionFind } from './unionFind';

describe('union find', () => {
  test('add and merge', () => {
    const unionFind = new UnionFind((a: number) => a.toString());

    unionFind.add(0, 1);
    expect(unionFind.isInSameSet(0, 1)).toBe(true);

    unionFind.add(3, 2);
    expect(unionFind.isInSameSet(2, 3)).toBe(true);
    expect(unionFind.isInSameSet(1, 2)).toBe(false);

    expect(unionFind.isInSameSet(11, 22)).toBe(false);
    expect(unionFind.isInSameSet(0, 11)).toBe(false);

    unionFind.add(1, 2);
    // merges set
    expect(unionFind.isInSameSet(0, 3)).toBe(true);

    unionFind.add(9, 10);
    unionFind.add(4, 5);
    unionFind.add(5, 6);
    unionFind.add(7, 8);
    unionFind.add(8, 9);
    expect(unionFind.isInSameSet(9, 10)).toBe(true);
    // merges set
    expect(unionFind.isInSameSet(7, 10)).toBe(true);

    unionFind.add(6, 7);
    expect(unionFind.isInSameSet(0, 5)).toBe(false);
    unionFind.add(4, 3);
    expect(unionFind.isInSameSet(0, 5)).toBe(true);
    expect(unionFind.isInSameSet(0, 10)).toBe(true);

    expect(unionFind.getSet().length).toBe(1);
    expect(unionFind.getSet()[0]!.size).toBe(11);
  });

  test('big merge', () => {
    const unionFind = new UnionFind((a: number) => a.toString());
    const unionAdd = (arr: [number, number][]) =>
      arr.forEach((item) => unionFind.add(item[0], item[1]));

    const add0 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [i, i + 1]);
    unionAdd(add0);
    const add1 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [20 + i, 21 + i]);
    unionAdd(add1);

    expect(unionFind.getSet().length).toBe(2);
    expect(unionFind.isInSameSet(0, 20)).toBe(false);

    unionFind.add(10, 20);
    expect(unionFind.getSet().length).toBe(1);
    expect(unionFind.isInSameSet(0, 20)).toBe(true);

    const add2 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [40 + i, 41 + i]);
    unionAdd(add2);
    const add3 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [i, 61 + i]);
    unionAdd(add3);

    expect(unionFind.getSet().length).toBe(2);
    expect(unionFind.isInSameSet(5, 67)).toBe(true);

    unionFind.add(0, 40);
    expect(unionFind.getSet().length).toBe(1);
    expect(unionFind.isInSameSet(0, 20)).toBe(true);
    expect(unionFind.isInSameSet(10, 50)).toBe(true);
  });

  //   const unionFind = new UnionFind((a: number) => a.toString());
  //   unionFind.add(0, 1);
  //   test('adds (1)', () => {
  //     expect(unionFind.isInSameSet(0, 1)).toBe(true);
  //   });

  //   unionFind.add(3, 2);
  //   test('adds (2)', () => {
  //     expect(unionFind.isInSameSet(2, 3)).toBe(true);
  //     expect(unionFind.isInSameSet(1, 2)).toBe(false);
  //   });
  //   test('handles item which does not exist', () => {
  //     expect(unionFind.isInSameSet(11, 22)).toBe(false);
  //     expect(unionFind.isInSameSet(0, 11)).toBe(false);
  //   });

  //   unionFind.add(1, 2);
  //   test('merges (1)', () => {
  //     expect(unionFind.isInSameSet(0, 3)).toBe(true);
  //   });

  //   unionFind.add(9, 10);
  //   unionFind.add(4, 5);
  //   unionFind.add(5, 6);
  //   unionFind.add(7, 8);
  //   unionFind.add(8, 9);
  //   test('merges (2)', () => {
  //     expect(unionFind.isInSameSet(9, 10)).toBe(true);
  //     expect(unionFind.isInSameSet(7, 10)).toBe(true);
  //   });

  //   unionFind.add(4, 3);
  //   test('merges (3)', () => {
  //     expect(unionFind.isInSameSet(0, 5)).toBe(true);
  //     expect(unionFind.isInSameSet(0, 10)).toBe(true);
  //   });
});
