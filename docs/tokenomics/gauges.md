---
sidebar_position: 4
---

# Gauges

[oLIT](./olit) incentives are distributed among different gauges based on how [veLIT](./velit) holders vote on the gauge weights. Bunni LPs stake their LP tokens in gauges to receive oLIT incentives.

Bunni gauges are based on Curve gauges. Read the [Curve docs](https://curve.readthedocs.io/dao-gauges.html) to learn more.

## How to earn oLIT rewards from gauges

1. Provide liquidity to a Bunni pool that has a gauge.
2. Stake your LP tokens into the gauge.
3. You will now receive oLIT rewards over time. You must claim the rewards from the gauge contract.

## How to boost your oLIT rewards

Holding veLIT will boost the amount of rewards you receive. The more veLIT you hold, the more rewards you receive (up to a point). See [boosting](./boosting) to learn more.

## Direct to pool rewards

Bunni offers direct to pool incentives. To unlock this for your pool, please contact an admin via our official Discord.

## What happens when the LP position of a gauge goes out of range?

Bunni uses our [Uniswap Price-out-of-range oracle](https://github.com/timeless-fi/uniswap-poor-oracle) to determine if a gauge's position is out of range. If it is, then the gauge is killed and stops receiving oLIT rewards. The oLIT rewards directed to the killed gauge are burnt.

See [Killing an out-of-range gauge](../guides/kill-gauge) to learn more.
