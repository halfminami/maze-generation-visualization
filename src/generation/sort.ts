function qSort<T>(
  arr: T[],
  left: number,
  right: number,
  cmpEq: (_0: T, _1: T) => boolean,
  cmpOk: (_0: T, _1: T) => boolean
) {
  let piv = arr[left],
    i = left,
    j = i,
    r = right,
    same = true;
  for (let k = left; k <= right; ++k) {
    if (piv !== arr[k]) {
      same = false;
      if (cmpOk(piv, arr[k])) {
        piv = arr[k];
        i = k;
        j = k;
      } else {
        // 1,1,1,0 => 0,1,1,1: i=1,j=3
        arrswap(arr, left, k);
        i = left + 1;
        j = k;
      }
      break;
    }
  }
  if (same) {
    return;
  }

  // smaller than piv |(i) equal to piv (j)| bigger than piv
  // elements left side of i are always smaller than piv
  for (; r > j; --r) {
    if (!cmpOk(piv, arr[r])) {
      if (cmpEq(piv, arr[r])) {
        arrswap(arr, j + 1, r);
        j++;
      } else {
        arrswap(arr, i, r);
        arrswap(arr, j + 1, r);
        i++;
        j++;
      }
      r++;
    }
  }
  qSort(arr, left, i - 1, cmpEq, cmpOk);
  qSort(arr, j + 1, right, cmpEq, cmpOk);
}

export function quickSort<T>(
  arr: T[],
  cmpEq: (_0: T, _1: T) => boolean,
  cmpOk: (_0: T, _1: T) => boolean
) {
  return qSort(arr, 0, arr.length - 1, cmpEq, cmpOk);
}

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
  if (idx1 === idx2) {
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
