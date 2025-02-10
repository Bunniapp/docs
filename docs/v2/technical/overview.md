---
title: Overview
hide_table_of_contents: true
sidebar_position: 1
---

# Overview

Bunni v2 consists of the following core smart contracts:

- [`BunniHub`](./core/BunniHub): The main contract liquidity providers interact with to deposit/withdraw funds. Stores all user funds.
  - Is immutable, meaning it cannot be upgraded later on.
- [`BunniHook`](./core/hook): Uniswap v4 hook responsible for handling swaps. Implements auto-rebalancing executed via [flood.bid](https://flood.bid). Uses am-AMM to recapture LVR & MEV.
  - Is immutable for deployed pools, but if a new version of `BunniHook` is deployed then new pools can use the updated version.
- [`BunniToken`](./core/token): ERC-20 tokens representing shares in a pool. Each pool has its unique `BunniToken`.
- [`BunniZone`](./core/zone): [flood.bid](https://flood.bid) zone contract restricting the execution of auto-rebalancing swaps to a whitelisted set of solvers + the am-AMM manager.
  - Governance can choose to use a new version of `BunniZone` which would then be used by all pools, both existing and new ones.

There are also **Liquidity Density Functions (LDFs)**, smart contracts describing different liquidity distributions and strategies. The LDF used by each pool is chosen at deploy time.

Finally, there are periphery smart contracts like `BunniQuoter` and `BunniLens` that provide additional read-only functions returning useful info.