function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export interface WeightedValue {
  value: number;
  weight: number;
}
export function weightedQuantile(input: readonly WeightedValue[], p: number): number {
  finite(p, 0, 1);
  if (!Array.isArray(input) || !input.length || input.length > 100000)
    throw new RangeError('Sample size1..100000');
  let max = 0;
  const values: WeightedValue[] = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') throw new TypeError('Expected weighted value');
    finite(item.value);
    finite(item.weight, Number.MIN_VALUE);
    max = Math.max(max, item.weight);
    values.push({ value: item.value, weight: item.weight });
  }
  values.sort((a, b) => a.value - b.value);
  const cumulative: number[] = [];
  let total = 0;
  for (const item of values) {
    const weight = item.weight / max,
      next = total + weight;
    if (weight === 0 || next === total) throw new RangeError('Weight resolution lost');
    total = next;
    cumulative.push(total);
  }
  if (p === 0) return values[0]!.value;
  if (p === 1) return values[values.length - 1]!.value;
  const target = p * total;
  let lo = 0,
    hi = values.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (cumulative[mid]! >= target) hi = mid;
    else lo = mid + 1;
  }
  return values[lo]!.value;
}
