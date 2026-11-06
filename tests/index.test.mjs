import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('weighted jumps', () => {
  assert.equal(
    api.weightedQuantile(
      [
        { value: 1, weight: 1 },
        { value: 9, weight: 3 },
      ],
      0.5,
    ),
    9,
  );
});
test('boundary convention', () => {
  assert.equal(
    api.weightedQuantile(
      [
        { value: 1, weight: 1 },
        { value: 9, weight: 1 },
      ],
      0.5,
    ),
    1,
  );
});
test('endpoints', () => {
  const a = [
    { value: 9, weight: 1 },
    { value: 1, weight: 2 },
  ];
  assert.equal(api.weightedQuantile(a, 0), 1);
  assert.equal(api.weightedQuantile(a, 1), 9);
});
test('scale invariance and ownership', () => {
  const a = [
    { value: 2, weight: 2 },
    { value: 1, weight: 1 },
  ];
  assert.equal(
    api.weightedQuantile(a, 0.6),
    api.weightedQuantile(
      a.map((v) => ({ ...v, weight: v.weight * 1e200 })),
      0.6,
    ),
  );
  assert.equal(a[0].value, 2);
});
test('lost resolution explicit', () => {
  assert.throws(() =>
    api.weightedQuantile(
      [
        { value: 1, weight: 1 },
        { value: 2, weight: Number.MIN_VALUE },
      ],
      0.5,
    ),
  );
});
test('invalid data', () => {
  assert.throws(() => api.weightedQuantile([], 0.5));
  assert.throws(() => api.weightedQuantile([{ value: 1, weight: 0 }], 0.5));
  assert.throws(() => api.weightedQuantile([{ value: 1, weight: 1 }], 2));
});
