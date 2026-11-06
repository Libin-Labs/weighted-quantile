import { weightedQuantile } from '@lp-labs/weighted-quantile';
if (
  weightedQuantile(
    [
      { value: 1, weight: 1 },
      { value: 9, weight: 3 },
    ],
    0.5,
  ) !== 9
)
  throw new Error('Quantile');
// @ts-expect-error invalid argument must be rejected by declarations
weightedQuantile([{ value: 1, weight: '1' }], 0.5);
