export default function SubArray(A) {
  const n = A.length;
  A.sort((a, b) => a - b);
  let a = [];
  let b = [];
  let c = 0;
  let d = 0;
  let e = 2;
  let f = 0;
  if (n === 2) {
    a = [A[0]];
    b = [A[1]];
  } else {
    c += A[0];
    c += A[n - 1];
    a.push(A[0]);
    a.push(A[n - 1]);
    for (let i = 1; i < Math.floor(n / 2); i++) {
      if (e - f === (Math.floor(n / 2) - i) * 2) {
        b.push(A[i]);
        b.push(A[n - 1 - i]);
        f += 2;
        d += A[i];
        d += A[n - 1 - i];
      } else if (f - e === (Math.floor(n / 2) - i) * 2) {
        a.push(A[i]);
        a.push(A[n - 1 - i]);
        e += 2;
        c += A[i];
        c += A[n - 1 - i];
      } else {
        const c1 =
          d < c + A[i] + A[n - 1 - i]
            ? c + A[i] + A[n - 1 - i] - d
            : d - (c + A[i] + A[n - 1 - i]);
        const c2 =
          d + A[n - 1 - i] < c + A[i]
            ? c + A[i] - (d + A[n - 1 - i])
            : d + A[n - 1 - i] - (c + A[i]);
        const c3 =
          d + A[i] < c + A[n - 1 - i]
            ? c + A[n - 1 - i] - (d + A[i])
            : d + A[i] - (c + A[n - 1 - i]);
        const c4 =
          d + A[i] + A[n - 1 - i] < c
            ? c - (d + A[i] + A[n - 1 - i])
            : d + A[i] + A[n - 1 - i] - c;

        const minC = Math.min(c1, c2, c3, c4);
        const minD = Math.min(c2, c3);
        if (minC === c1 && c1 === c4) {
          if (e > f) {
            b.push(A[i]);
            b.push(A[n - 1 - i]);
            f += 2;
            d += A[i];
            d += A[n - 1 - i];
          } else {
            a.push(A[i]);
            a.push(A[n - 1 - i]);
            e += 2;
            c += A[i];
            c += A[n - 1 - i];
          }
        } else if (
          minC === c2 ||
          (minD === c2 && e === f && (Math.floor(n / 2) - i) * 2 === 2)
        ) {
          a.push(A[i]);
          e += 1;
          c += A[i];
          b.push(A[n - 1 - i]);
          f += 1;
          d += A[n - 1 - i];
        } else if (
          minC === c3 ||
          (minD === c3 && e === f && (Math.floor(n / 2) - i) * 2 === 2)
        ) {
          b.push(A[i]);
          f += 1;
          d += A[i];
          a.push(A[n - 1 - i]);
          e += 1;
          c += A[n - 1 - i];
        } else if (minC === c4) {
          b.push(A[i]);
          b.push(A[n - 1 - i]);
          f += 2;
          d += A[i];
          d += A[n - 1 - i];
        } else {
          a.push(A[i]);
          a.push(A[n - 1 - i]);
          e += 2;
          c += A[i];
          c += A[n - 1 - i];
        }
      }
    }
  }
  return {
    SubArray1: a,
    SubArray2: b,
    MinAbsDiff: c > d ? c - d : d - c
  };
}
