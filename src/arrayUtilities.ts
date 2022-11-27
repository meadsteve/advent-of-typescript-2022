export const zip = <A, B>(a: A[], b: B[]) => a.map((k, i) => [k, b[i]]);
