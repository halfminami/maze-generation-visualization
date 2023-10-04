import { insertionSort } from './sort';

const runTest = (sortFunc: (arr: number[]) => void) => {
  function wrapTest(arr: number[], desc: string) {
    test(desc, () => {
      const arr0 = arr.concat();
      const arr1 = arr0.concat();

      sortFunc(arr0);
      normalSort(arr1);

      expect(isEqualTo(arr0, arr1)).toBe(true);
    });
  }

  test('empty array', () => {
    function testSort() {
      sortFunc([]);
    }
    expect(testSort).not.toThrow();
  });

  wrapTest([0], 'array length 1');
  wrapTest([1, 0], 'array length 2');
  wrapTest([1, 2, 0], 'array length 3');
  wrapTest([0, 1, 2, 3, 4, 5], 'sorted array');
  wrapTest([3, 3, 3, 3], 'same values (1)');
  wrapTest([5, 5, 5, 9, 5], 'same values (2)');
  wrapTest([7, 0, 4, 7, 5, 8, 9, 9, 7, 9], 'same values (3)');
  wrapTest([0, 3, 2, 2, 4, 1, 2], 'same values (4)');
  wrapTest([0, 0, 0, 1, 1, 1, 2, 2, 2], 'same values (5)');
};

describe('hello', () => {
  const cmpOk = (a: number, b: number) => a < b;
  const cmpEq = (a: number, b: number) => a == b;

  runTest((arr) => {
    insertionSort(arr, cmpOk);
  });
});

function normalSort(arr: number[]) {
  arr.sort((a, b) => a - b);
}

function isEqualTo(a0: number[], a1: number[]) {
  if (a0.length != a1.length) {
    return false;
  }

  for (let i = 0; i < a0.length; ++i) {
    if (a0[i] != a1[i]) {
      return false;
    }
  }

  return true;
}
