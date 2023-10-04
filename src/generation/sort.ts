export function insertionSort<T>(arr: T[], cmpOk: (_0: T, _1: T) => boolean) {
  for (let i = 0; i < arr.length - 1; ++i) {
    if (!cmpOk(arr[i], arr[i + 1])) {
      for (let j = i + 1; j > 0 && !cmpOk(arr[j - 1], arr[j]); --j) {
        arrswap(arr, j - 1, j);
      }
    }
  }

  return;
}

function arrswap<T>(arr: T[], idx1: number, idx2: number): void {
  if (idx1 == idx2) {
    return;
  }
  if (idx1 < 0 || idx2 < 0 || idx1 > arr.length || idx2 > arr.length) {
    return;
  }
  const tmp = arr[idx2];
  arr[idx2] = arr[idx1];
  arr[idx1] = tmp;
  return;
}
