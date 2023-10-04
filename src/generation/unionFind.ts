type SetName = number;
type UnionV<T> = { item: T; next: UnionV<T> | null; setName: SetName };
type SetInfo<T> = { size: number; head: UnionV<T> };

export class UnionFind<T> {
  stringify: (_: T) => string;
  unionVs: { [key: string]: UnionV<T> } = {};
  setInfo: (SetInfo<T> | undefined)[] = [];

  constructor(stringify: (_: T) => string, copy?: UnionFind<T>) {
    if (copy) {
      this.stringify = copy.stringify;
      this.unionVs = copy.unionVs;
      this.setInfo = copy.setInfo;
    } else {
      this.stringify = stringify;
    }
  }

  isInSameSet(a: T, b: T) {
    return !!(
      this.unionVs[this.stringify(a)] &&
      this.unionVs[this.stringify(b)] &&
      this.unionVs[this.stringify(a)].setName ==
        this.unionVs[this.stringify(b)].setName
    );
  }

  add(a: T, b: T) {
    if (this.unionVs[this.stringify(a)] && this.unionVs[this.stringify(b)]) {
      const aV = this.unionVs[this.stringify(a)],
        bV = this.unionVs[this.stringify(b)];
      const aSet = this.setInfo[aV.setName]!,
        bSet = this.setInfo[bV.setName]!;

      if (aV.setName == bV.setName) {
        return;
      }

      let smaller, bigger;

      if (aSet.size < bSet.size) {
        smaller = a;
        bigger = b;
      } else {
        smaller = b;
        bigger = a;
      }

      this.#merge(smaller, bigger);
    } else if (this.unionVs[this.stringify(a)]) {
      const exists = a,
        nonex = b;

      this.#addOne(exists, nonex);
    } else if (this.unionVs[this.stringify(b)]) {
      const exists = b,
        nonex = a;

      this.#addOne(exists, nonex);
    } else {
      const vb = { item: b, next: null, setName: this.setInfo.length };
      const va = { item: a, next: vb, setName: this.setInfo.length };
      this.setInfo.push({ size: 2, head: va });
      this.unionVs[this.stringify(a)] = va;
      this.unionVs[this.stringify(b)] = vb;
    }
  }
  #addOne(exists: T, nonex: T) {
    const vex = this.unionVs[this.stringify(exists)];
    const vnonex = {
      item: nonex,
      next: this.setInfo[vex.setName]!.head,
      setName: vex.setName,
    };
    this.unionVs[this.stringify(nonex)] = vnonex;

    this.setInfo[vex.setName]!.size++;
    this.setInfo[vex.setName]!.head = vnonex;
  }
  #merge(smaller: T, bigger: T) {
    const smallerV = this.unionVs[this.stringify(smaller)],
      biggerV = this.unionVs[this.stringify(bigger)];
    const smallerSet = this.setInfo[smallerV.setName]!,
      biggerSet = this.setInfo[biggerV.setName]!;
    const smallerHead = smallerSet.head;

    this.setInfo[smallerV.setName] = undefined;

    biggerSet.size += smallerSet.size;

    let cur = smallerHead;
    while (cur.next != null) {
      cur.setName = biggerV.setName;
      cur = cur.next;
    }
    cur.setName = biggerV.setName;
    cur.next = biggerSet.head;

    biggerSet.head = smallerHead;
  }

  getVertex() {
    return Object.keys(this.unionVs).map((item) => ({ ...this.unionVs[item] }));
  }
  getSet() {
    // const ret= Object.keys(this.setInfo).map((item) :{setName:string}=> ({
    //   setName: item,
    //   // @ts-ignore
    //   ...this.setInfo[item],
    // }));
    return this.setInfo.filter((item) => item);
    // return this.setInfo;
  }
}
