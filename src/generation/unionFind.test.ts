import { UnionFind } from './unionFind';

describe('union find', () => {
  describe('add and merge', () => {
    const unionFind = new UnionFind((a: number) => a.toString());

    beforeAll(() => {
      unionFind.add(0, 1);
    });

    test('adds', () => {
      expect(unionFind.isInSameSet(0, 1)).toBe(true);
    });

    describe('', () => {
      beforeAll(() => {
        unionFind.add(3, 2);
      });

      test('adds', () => {
        expect(unionFind.isInSameSet(2, 3)).toBe(true);
        expect(unionFind.isInSameSet(1, 2)).toBe(false);
      });
      test('handles absent item', () => {
        expect(unionFind.isInSameSet(11, 22)).toBe(false);
        expect(unionFind.isInSameSet(0, 11)).toBe(false);
      });

      describe('', () => {
        beforeAll(() => {
          unionFind.add(1, 2);
        });

        test('merges', () => {
          expect(unionFind.isInSameSet(0, 3)).toBe(true);
        });

        describe('', () => {
          beforeAll(() => {
            unionFind.add(9, 10);
            unionFind.add(4, 5);
            unionFind.add(5, 6);
            unionFind.add(7, 8);
            unionFind.add(8, 9);
          });

          test('merges', () => {
            expect(unionFind.isInSameSet(9, 10)).toBe(true);
            expect(unionFind.isInSameSet(7, 10)).toBe(true);
          });

          describe('', () => {
            beforeAll(() => {
              unionFind.add(6, 7);
            });

            test('merges', () => {
              expect(unionFind.isInSameSet(0, 5)).toBe(false);
              expect(unionFind.isInSameSet(5, 8)).toBe(true);
            });

            describe('', () => {
              beforeAll(() => {
                unionFind.add(4, 3);
              });

              test('merges', () => {
                expect(unionFind.isInSameSet(0, 5)).toBe(true);
                expect(unionFind.isInSameSet(0, 10)).toBe(true);
              });

              test('set in total', () => {
                expect(unionFind.getSet().length).toBe(1);
                expect(unionFind.getSet()[0]!.size).toBe(11);
              });
            });
          });
        });
      });
    });
  });

  describe('big merge', () => {
    const unionFind = new UnionFind((a: number) => a.toString());
    const unionAdd = (arr: [number, number][]) =>
      arr.forEach((item) => unionFind.add(item[0], item[1]));

    const add0 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [i, i + 1]);
    const add1 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [20 + i, 21 + i]);
    const add2 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [40 + i, 41 + i]);
    const add3 = Array(10)
      .fill(0)
      .map((_, i): [number, number] => [i, 61 + i]);

    beforeAll(() => {
      unionAdd(add0);
      unionAdd(add1);
    });

    test('adds', () => {
      expect(unionFind.getSet().length).toBe(2);
      expect(unionFind.isInSameSet(0, 20)).toBe(false);
    });

    describe('', () => {
      beforeAll(() => {
        unionFind.add(10, 20);
      });

      test('merges', () => {
        expect(unionFind.getSet().length).toBe(1);
        expect(unionFind.isInSameSet(0, 20)).toBe(true);
      });

      describe('', () => {
        beforeAll(() => {
          unionAdd(add2);
          unionAdd(add3);
        });

        test('adds and merges', () => {
          expect(unionFind.getSet().length).toBe(2);
          expect(unionFind.isInSameSet(5, 67)).toBe(true);
        });

        describe('', () => {
          beforeAll(() => {
            unionFind.add(0, 40);
          });

          test('merges', () => {
            expect(unionFind.getSet().length).toBe(1);
            expect(unionFind.isInSameSet(0, 20)).toBe(true);
            expect(unionFind.isInSameSet(10, 50)).toBe(true);
          });
        });
      });
    });
  });
});
