export const zip = <X, Y>(xs: X[], ys: Y[]) => xs.map((x, i) => [x, ys[i]] as const);
