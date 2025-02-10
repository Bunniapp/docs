---
title: BunniHub
hide_table_of_contents: false
sidebar_position: 1
---

# BunniHub

BunniHub is the main contract Liquidity Providers (LPs) interact with. Deploys pools and handles depositing and withdrawing from those pools.



## Functions

### deployBunniToken

```solidity
function deployBunniToken(
  DeployBunniTokenParams calldata params
) external returns (IBunniToken token, PoolKey memory key)
```

Deploys the BunniToken contract for a Bunni position. This token represents a user's share in the Uniswap V4 LP position.

#### Parameters:

| Name     | Type                          | Description                                                                                       |
| -------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `params` | struct DeployBunniTokenParams | The parameters necessary to deploy the BunniToken, encoded as DeployBunniTokenParams in calldata. |

#### Return Values:

| Name    | Type        | Description                         |
| ------- | ----------- | ----------------------------------- |
| `token` | IBunniToken | The deployed BunniToken.            |
| `key`   | PoolKey     | The PoolKey of the Uniswap V4 pool. |

### deposit

```solidity
function deposit(
  DepositParams calldata params
) external payable returns (uint256 shares, uint256 amount0, uint256 amount1)
```

Increases the amount of liquidity in a position, with tokens paid by the `msg.sender`, Must be called after the corresponding BunniToken has been deployed via `deployBunniToken()`.

#### Parameters:

| Name     | Type                 | Description                                                                     |
| -------- | -------------------- | ------------------------------------------------------------------------------- |
| `params` | struct DepositParams | The parameters necessary for the deposit, encoded as DepositParams in calldata. |

#### Return Values:

| Name      | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| `shares`  | uint256 | The new share tokens minted to the sender.           |
| `amount0` | uint256 | The amount of token0 to acheive resulting liquidity. |
| `amount1` | uint256 | The amount of token1 to acheive resulting liquidity. |

### withdraw

```solidity
function withdraw(
  WithdrawParams calldata params
) external returns (uint256 amount0, uint256 amount1)
```

Decreases the amount of liquidity in the position and sends the tokens to the sender. If withdrawing ETH, need to follow up with `unwrapWETH9()` and `sweepToken()`. Must be called after the corresponding BunniToken has been deployed via `deployBunniToken()`.

#### Parameters:

| Name     | Type                  | Description                                                                       |
| -------- | --------------------- | --------------------------------------------------------------------------------- |
| `params` | struct WithdrawParams | The parameters necessary for the withdraw, encoded as WithdrawParams in calldata. |

#### Return Values:

| Name      | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| `amount0` | uint256 | The amount of token0 withdrawn to the recipient. |
| `amount1` | uint256 | The amount of token1 withdrawn to the recipient. |

### queueWithdraw

```solidity
function queueWithdraw(
  QueueWithdrawParams calldata params
) external
```

Queues a withdrawal of liquidity. Need to use this before calling withdraw() if am-AMM is enabled and a manager exists for the pool. A queued withdrawal is unlocked after WITHDRAW_DELAY (1 minutes) has passed, and before WITHDRAW_GRACE_PERIOD (15 minutes) has passed after it's been unlocked. This ensures the am-AMM manager has an opportunity to execute any arbitrage trades before a withdrawal is processed.

#### Parameters:

| Name     | Type                       | Description                                                                                  |
| -------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| `params` | struct QueueWithdrawParams | The parameters necessary for the queue withdraw, encoded as QueueWithdrawParams in calldata. |

### hookHandleSwap

```solidity
hookHandleSwap(
  PoolKey calldata key,
  bool zeroForOne,
  uint256 inputAmount,
  uint256 outputAmount
) external
```

Called by the hook to execute a generalized swap from one token to the other. Also used during rebalancing. If the raw balance is insufficient, vault reserves will be automatically used. Will update vault reserves if the raw/reserve ratio is outside of the bounds.

#### Parameters:

| Name           | Type           | Description                                                      |
| -------------- | -------------- | ---------------------------------------------------------------- |
| `key`          | struct PoolKey | The PoolKey of the Uniswap V4 pool.                              |
| `zeroForOne`   | bool           | True if the swap is for token0->token1, false if token1->token0. |
| `inputAmount`  | uint256        | The amount of the input token to pull from the hook.             |
| `outputAmount` | uint256        | The amount of the output token to push to the hook.              |

### poolState

```solidity
poolState(
  PoolId poolId
) external view returns (PoolState memory)
```

The state of a Bunni pool.

### poolParams

```solidity
function poolParams(
  PoolId poolId
) external view returns (PoolState memory)
```

The PoolState struct of a given pool with only the immutable params filled out.

### bunniTokenOfPool

```solidity
function bunniTokenOfPool(
  PoolId poolId
) external view returns (IBunniToken)
```

The BunniToken of a given pool. address(0) if the pool is not a Bunni pool.

### hookParams

```solidity
function hookParams(
  PoolId poolId
) external view returns (bytes32)
```

The params of the given Bunni pool's hook. bytes32(0) if the pool is not a Bunni pool.

### nonce

```solidity
function nonce(
  bytes32 bunniSubspace
) external view returns (uint24)
```

The nonce of the given Bunni subspace.

### poolIdOfBunniToken

```solidity
function poolIdOfBunniToken(
  IBunniToken bunniToken
) external view returns (PoolId)
```

The PoolId of a given BunniToken.

### poolBalances

```solidity
function poolBalances(
  PoolId poolId
) external view returns (uint256 balance0, uint256 balance1)
```

The token balances of a Bunni pool. Reserves in vaults are converted to raw token balances via `ERC4626.previewRedeem()`.

## Structs

### DeployBunniTokenParams

```solidity
struct DeployBunniTokenParams {
  Currency currency0;
  Currency currency1;
  int24 tickSpacing;
  uint24 twapSecondsAgo;
  ILiquidityDensityFunction liquidityDensityFunction;
  IHooklet hooklet;
  LDFType: ldfType;
  bytes32 ldfParams;
  IBunniHook hooks;
  bytes hookParams;
  ERC4626 vault0;
  ERC4626 vault1;
  uint24 minRawTokenRatio0;
  uint24 targetRawTokenRatio0;
  uint24 maxRawTokenRatio0;
  uint24 minRawTokenRatio1;
  uint24 targetRawTokenRatio1;
  uint24 maxRawTokenRatio1;
  uint160 sqrtPriceX96;
  bytes32 name;
  bytes32 symbol;
  address owner;
  string metadataURI;
  bytes32 salt;
}
```

### DepositParams

```solidity
struct DepositParams {
  PoolKey poolKey;
  address recipient;
  address refundRecipient;
  uint256 amount0Desired;
  uint256 amount1Desired;
  uint256 amount0Min;
  uint256 amount1Min;
  uint256 vaultFee0;
  uint256 vaultFee1;
  uint256 deadline;
  address referrer;
}
```

### WithdrawParams

```solidity
struct WithdrawParams {
  PoolKey poolKey;
  address recipient;
  uint256 shares;
  uint256 amount0Min;
  uint256 amount1Min;
  uint256 deadline;
  bool useQueuedWithdrawal;
}
```

### QueueWithdrawParams

```solidity
struct QueueWithdrawParams {
  PoolKey poolKey;
  uint256 shares;
}
```

## Events

### NewBunni

```solidity
event NewBunni(
  IBunniToken indexed bunniToken,
  PoolId indexed poolId
)
```

Emitted when a new IBunniToken is created.

#### Parameters:

| Name         | Type        | Description                              |
| ------------ | ----------- | ---------------------------------------- |
| `bunniToken` | IBunniToken | The BunniToken associated with the call. |
| `poolId`     | PoolId      | The Uniswap V4 pool's ID.                |

### Deposit

```solidity
event Deposit(
  address indexed sender,
  address indexed recipient,
  PoolId indexed poolId,
  uint256 amount0,
  uint256 amount1,
  uint256 shares
)
```

Emitted when liquidity is increased via deposit.

#### Parameters:

| Name        | Type    | Description                                                       |
| ----------- | ------- | ----------------------------------------------------------------- |
| `sender`    | address | The `msg.sender` address.                                         |
| `recipient` | address | The address of the account that received the share tokens.        |
| `poolId`    | PoolId  | The Uniswap V4 pool's ID.                                         |
| `amount0`   | uint256 | The amount of token0 that was paid for the increase in liquidity. |
| `amount1`   | uint256 | The amount of token1 that was paid for the increase in liquidity. |
| `shares`    | uint256 | The amount of share tokens minted to the recipient.               |

### Withdraw

```solidity
event Withdraw(
  address indexed sender,
  address indexed recipient,
  PoolId indexed poolId,
  uint256 amount0,
  uint256 amount1,
  uint256 shares
)
```

Emitted when liquidity is decreased via withdrawal.

#### Parameters:

| Name        | Type    | Description                                                            |
| ----------- | ------- | ---------------------------------------------------------------------- |
| `sender`    | address | The `msg.sender` address.                                              |
| `recipient` | address | The address of the account that received the collected tokens.         |
| `poolId`    | PoolId  | The Uniswap V4 pool's ID.                                              |
| `amount0`   | uint256 | The amount of token0 that was accounted for the decrease in liquidity. |
| `amount1`   | uint256 | The amount of token1 that was accounted for the decrease in liquidity. |
| `shares`    | uint256 | The amount of share tokens burnt from the sender.                      |

### QueueWithdraw

```solidity
event QueueWithdraw(
  address indexed sender,
  PoolId indexed poolId,
  uint256 shares
)
```

Emitted when a withdrawal is queued.

#### Parameters:

| Name     | Type    | Description                                       |
| -------- | ------- | ------------------------------------------------- |
| `sender` | address | The `msg.sender` address.                         |
| `poolId` | PoolId  | The Uniswap V4 pool's ID.                         |
| `shares` | uint256 | The amount of share tokens queued for withdrawal. |
