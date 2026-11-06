# @lp-labs/weighted-quantile

Explicit inverse weighted empirical distribution quantiles.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/weighted-quantile
```

## Working example

```js
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
```

CommonJS: `const api = require('@lp-labs/weighted-quantile')`.

## Behavior, customization and limits

weightedQuantile({value,weight}[],p) accepts1..100000 finite observations,strictly positive finite weights,p0..1. Sorts a copy by value; p=0 returns minimum,p=1 maximum,otherwise first cumulative normalized weight>=p*total (no interpolation). Weights are scaled by their maximum; scaling underflow or lost positive cumulative increments throw. O(n log n)time,O(n)storage. No negative/zero weights,missing filtering or population inference.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface WeightedValue {
  value: number;
  weight: number;
}
export declare function weightedQuantile(input: readonly WeightedValue[], p: number): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
