---
title: Parameter Formats
hide_table_of_contents: false
sidebar_position: 3
---

# Parameter Formats

Each LDF contract receives `bytes32 ldfParams` when called and has different formats for decoding the actual parameters. Below are how each LDF contract encodes its parameters.

## `GeometricDistribution`

### Parameter Encoding

The `ldfParams` are encoded as follows:

```
| shiftMode (1 byte) | offset (3 bytes) | length (2 bytes) | alpha (4 bytes) | unused (22 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (0 for BOTH, 1 for LEFT, 2 for RIGHT, 3 for STATIC).
- **offset** (3 bytes): An `int24` value representing the offset applied to the TWAP tick to get the minTick. In ticks, not ricks.
- **length** (2 bytes): An `int16` value representing the length of the distribution in number of rounded ticks.
- **alpha** (4 bytes): A `uint32` value representing the alpha parameter of the geometric distribution.
- **unused** (22 bytes): Unused bytes, should be set to zero.

### Important Notes

1. The actual `minTick` is calculated as `roundTickSingle(twapTick + offset, tickSpacing)` when `shiftMode` is not STATIC.
2. For STATIC mode, `offset` represents the absolute `minTick` and must be aligned to tickSpacing.
3. The `alpha` value is scaled by `Q96 / ALPHA_BASE` internally. `ALPHA_BASE` is `1e8`.
4. The distribution is bounded to be within the range of usable ticks. If `minTick` is outside this range, it will be adjusted accordingly.

### Example Usage

Here's an example of how to encode the parameters:

```solidity
function encodeParams(
    ShiftMode shiftMode,
    int24 offset,
    int16 length,
    uint32 alpha
) pure returns (bytes32) {
    return abi.encodePacked(uint8(shiftMode), offset, length, alpha);
}
```

Remember to ensure that all values are within their appropriate ranges and that `minTick` is aligned with `tickSpacing` for STATIC mode.

## `UniformDistribution`

### Parameter Encoding

The `ldfParams` for the UniformDistribution are encoded as follows:

```
| shiftMode (1 byte) | tickLower (3 bytes) | tickUpper (3 bytes) | unused (25 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (3 for STATIC, as Uniform distribution is always static).
- **tickLower** (3 bytes): An `int24` value representing the lower tick of the distribution.
- **tickUpper** (3 bytes): An `int24` value representing the upper tick of the distribution.
- **unused** (25 bytes): Unused bytes, should be set to zero.

### Important Notes

1. Both `tickLower` and `tickUpper` must be within the range of valid ticks for the pool.
2. `tickLower` must be less than `tickUpper`.
3. The ticks need to be aligned to the tick spacing.

### Example Usage

Here's an example of how to encode the parameters for a uniform distribution:

```solidity
function encodeParams(
    int24 tickLower,
    int24 tickUpper
) pure returns (bytes32) {
    return abi.encodePacked(uint8(3), tickLower, tickUpper);
}
```

Remember to ensure that `tickLower` and `tickUpper` are within the valid range of ticks for the pool, `tickLower` is less than `tickUpper` and they're both aligned to the tick spacing.

## `DoubleGeometricDistribution`

### Parameter Encoding

The `ldfParams` are encoded as follows:

```
| shiftMode (1 byte) | offset (3 bytes) | length0 (2 bytes) | alpha0 (4 bytes) | weight0 (4 bytes) | length1 (2 bytes) | alpha1 (4 bytes) | weight1 (4 bytes) | unused (8 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (0 for BOTH, 1 for LEFT, 2 for RIGHT, 3 for STATIC).
- **offset** (3 bytes): An `int24` value representing the offset applied to the TWAP tick to get the minTick. In ticks, not ricks.
- **length0** (2 bytes): An `int16` value representing the length of the right distribution in number of rounded ticks.
- **alpha0** (4 bytes): A `uint32` value representing the alpha parameter of the right distribution.
- **weight0** (4 bytes): A `uint32` value representing the weight of the right distribution.
- **length1** (2 bytes): An `int16` value representing the length of the left distribution in number of rounded ticks.
- **alpha1** (4 bytes): A `uint32` value representing the alpha parameter of the left distribution.
- **weight1** (4 bytes): A `uint32` value representing the weight of the left distribution.
- **unused** (8 bytes): Unused bytes, should be set to zero.

### Important Notes

1. The actual `minTick` is calculated as `roundTickSingle(twapTick + offset, tickSpacing)` when `shiftMode` is not STATIC.
2. For STATIC mode, `offset` represents the absolute `minTick` and must be aligned to tickSpacing.
3. The `alpha0` and `alpha1` values are scaled by `Q96 / ALPHA_BASE` internally. `ALPHA_BASE` is `1e8`.
4. The distribution is bounded to be within the range of usable ticks. If `minTick` is outside this range, it will be adjusted accordingly.
5. The total length of the distribution is `length0 + length1`.
6. `weight0` and `weight1` don't use any particular number of decimals, they're relative weights. For example, `weight0` can be `8` and `weight1` can be `2`, and the respective weights would be `8 / 10 = 80%` and `2 / 10 = 20%`.
7. The minimum liquidity density of each geometric part must be greater than `MIN_LIQUIDITY_DENSITY` (Q96 / 1e3).

### Example Usage

Here's an example of how to encode the parameters:

```solidity
function encodeParams(
    ShiftMode shiftMode,
    int24 offset,
    int16 length0,
    uint32 alpha0,
    uint32 weight0,
    int16 length1,
    uint32 alpha1,
    uint32 weight1
) pure returns (bytes32) {
    return abi.encodePacked(uint8(shiftMode), offset, length0, alpha0, weight0, length1, alpha1, weight1);
}
```

Remember to ensure that all values are within their appropriate ranges and that `minTick` is aligned with `tickSpacing` for STATIC mode.

## `CarpetedGeometricDistribution`

### Parameter Encoding

The `ldfParams` are encoded as follows:

```
| shiftMode (1 byte) | offset (3 bytes) | length (2 bytes) | alpha (4 bytes) | weightCarpet (4 bytes) | unused (18 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (0 for BOTH, 1 for LEFT, 2 for RIGHT, 3 for STATIC).
- **offset** (3 bytes): An `int24` value representing the offset applied to the TWAP tick to get the minTick. In ticks, not ricks.
- **length** (2 bytes): An `int16` value representing the length of the geometric distribution in number of rounded ticks.
- **alpha** (4 bytes): A `uint32` value representing the alpha parameter of the geometric distribution.
- **weightCarpet** (4 bytes): A `uint32` value representing the weight of the carpet distribution.
- **unused** (18 bytes): Unused bytes, should be set to zero.

### Important Notes

1. The actual `minTick` is calculated as `roundTickSingle(twapTick + offset, tickSpacing)` when `shiftMode` is not STATIC.
2. For STATIC mode, `offset` represents the absolute `minTick` and must be aligned to tickSpacing.
3. The `alpha` value is scaled by `Q96 / ALPHA_BASE` internally. `ALPHA_BASE` is `1e8`.
4. The `weightCarpet` value uses 18 decimals (i.e., a `weightCarpet` of 500000000000000000 represents 0.5 or 50%).
5. The distribution is bounded to be within the range of usable ticks. If `minTick` is outside this range, it will be adjusted accordingly.
6. The `weightCarpet` must be non-zero. It is intentionally bounded to a small max value (`type(uint32).max / 1e18`) because larger values allocates too many tokens at extreme tick values.
7. The minimum liquidity density of the geometric part must be greater than `MIN_LIQUIDITY_DENSITY` (Q96 / 1e3).

### Example Usage

Here's an example of how to encode the parameters:

```solidity
function encodeParams(
    ShiftMode shiftMode,
    int24 offset,
    int16 length,
    uint32 alpha,
    uint32 weightCarpet
) pure returns (bytes32) {
    return abi.encodePacked(uint8(shiftMode), offset, length, alpha, weightCarpet);
}
```

Remember to ensure that all values are within their appropriate ranges and that `minTick` is aligned with `tickSpacing` for STATIC mode.

## `CarpetedDoubleGeometricDistribution`

### Parameter Encoding

The `ldfParams` are encoded as follows:

```
| shiftMode (1 byte) | offset (3 bytes) | length0 (2 bytes) | alpha0 (4 bytes) | weight0 (4 bytes) | length1 (2 bytes) | alpha1 (4 bytes) | weight1 (4 bytes) | weightCarpet (4 bytes) | unused (4 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (0 for BOTH, 1 for LEFT, 2 for RIGHT, 3 for STATIC).
- **offset** (3 bytes): An `int24` value representing the offset applied to the TWAP tick to get the minTick. In ticks, not ricks.
- **length0** (2 bytes): An `int16` value representing the length of the right distribution in number of rounded ticks.
- **alpha0** (4 bytes): A `uint32` value representing the alpha parameter of the right distribution.
- **weight0** (4 bytes): A `uint32` value representing the weight of the right distribution.
- **length1** (2 bytes): An `int16` value representing the length of the left distribution in number of rounded ticks.
- **alpha1** (4 bytes): A `uint32` value representing the alpha parameter of the left distribution.
- **weight1** (4 bytes): A `uint32` value representing the weight of the left distribution.
- **weightCarpet** (4 bytes): A `uint32` value representing the weight of the carpet distribution.
- **unused** (4 bytes): Unused bytes, should be set to zero.

### Important Notes

1. The actual `minTick` is calculated as `roundTickSingle(twapTick + offset, tickSpacing)` when `shiftMode` is not STATIC.
2. For STATIC mode, `offset` represents the absolute `minTick` and must be aligned to tickSpacing.
3. The `alpha0` and `alpha1` values are scaled by `Q96 / ALPHA_BASE` internally. `ALPHA_BASE` is `1e8`.
4. The `weightCarpet` value uses 18 decimals (i.e., a value of 500000000000000000 represents 0.5 or 50%).
5. The distribution is bounded to be within the range of usable ticks. If `minTick` is outside this range, it will be adjusted accordingly.
6. The `weightCarpet` must be non-zero. It is intentionally bounded to a small max value (`type(uint32).max / 1e18`) because larger values allocates too many tokens at extreme tick values.
7. The minimum liquidity density of each geometric part must be greater than `MIN_LIQUIDITY_DENSITY` (Q96 / 1e3).
8. The total length of the distribution is `length0 + length1`.
9. `weight0` and `weight1` don't use any particular number of decimals, they're relative weights. For example, `weight0` can be `8` and `weight1` can be `2`, and the respective weights would be `8 / 10 = 80%` and `2 / 10 = 20%`.

### Example Usage

Here's an example of how to encode the parameters:

```solidity
function encodeParams(
    ShiftMode shiftMode,
    int24 offset,
    int16 length0,
    uint32 alpha0,
    uint32 weight0,
    int16 length1,
    uint32 alpha1,
    uint32 weight1,
    uint32 weightCarpet
) pure returns (bytes32) {
    return abi.encodePacked(uint8(shiftMode), offset, length0, alpha0, weight0, length1, alpha1, weight1, weightCarpet);
}
```

Remember to ensure that all values are within their appropriate ranges and that `minTick` is aligned with `tickSpacing` for STATIC mode.

## `BuyTheDipGeometricDistribution`

### Parameter Encoding

The `ldfParams` are encoded as follows:

```
| shiftMode (1 byte) | minTick (3 bytes) | length (2 bytes) | alpha (4 bytes) | altAlpha (4 bytes) | altThreshold (3 bytes) | altThresholdDirection (1 byte) | unused (14 bytes) |
```

- **shiftMode** (1 byte): A `uint8` value representing the shift mode (3 for STATIC, as this distribution is always static).
- **minTick** (3 bytes): An `int24` value representing the minimum tick of the distribution. Must be aligned to tickSpacing.
- **length** (2 bytes): An `int16` value representing the length of the distribution in number of rounded ticks.
- **alpha** (4 bytes): A `uint32` value representing the alpha parameter of the geometric distribution.
- **altAlpha** (4 bytes): A `uint32` value representing the alternative alpha parameter.
- **altThreshold** (3 bytes): An `int24` value representing the threshold for switching between alpha and altAlpha.
- **altThresholdDirection** (1 byte): A `uint8` value (0 for false, 1 for true) indicating the direction of the threshold comparison.
- **unused** (14 bytes): Unused bytes, should be set to zero.

### Important Notes

1. This distribution requires TWAP to be enabled (`twapSecondsAgo != 0`) to trigger the alpha switching mechanism.
2. The `shiftMode` must be STATIC (3).
3. The `alpha` and `altAlpha` values are scaled by `Q96 / ALPHA_BASE` internally. `ALPHA_BASE` is `1e8`.
4. The distribution switches between `alpha` and `altAlpha` based on the TWAP tick and `altThreshold`.
5. If `altThresholdDirection` is true, `altAlpha` is used when `twapTick <= altThreshold`. If false, `altAlpha` is used when `twapTick >= altThreshold`.
6. The `alpha` and `altAlpha` must be on different sides of 1 (i.e., one < ALPHA_BASE and one > ALPHA_BASE).
7. The `altThreshold` must be within the range `(minTick, minTick + length * tickSpacing)`.
8. The `minTick` must be aligned to `tickSpacing`.
9. The `length` must be positive and the range `[minTick, minTick + length * tickSpacing]` must be within the usable tick range.
10. Both `alpha` and `altAlpha` must be within the range `[MIN_ALPHA, MAX_ALPHA]` (from `1e3` to `12e8`) and neither can be exactly `ALPHA_BASE` (1e8).
11. The distribution is bounded to be within the range of usable ticks.
12. This LDF is designed to have one end of the distribution with essentially zero liquidity, so that when the alt alpha is activated, liquidity can move to a specified price to "buy the dip".

### Example Usage

Here's an example of how to encode the parameters:

```solidity
function encodeParams(
    int24 minTick,
    int16 length,
    uint32 alpha,
    uint32 altAlpha,
    int24 altThreshold,
    bool altThresholdDirection
) pure returns (bytes32) {
    return abi.encodePacked(
        uint8(3), // STATIC
        minTick,
        length,
        alpha,
        altAlpha,
        altThreshold,
        altThresholdDirection ? uint8(1) : uint8(0)
    );
}
```

Remember to ensure that all values are within their appropriate ranges and that `minTick` is aligned with `tickSpacing`. The `alpha` and `altAlpha` values must be on different sides of `1e8` (one < 1e8 and one > 1e8), and the `altThreshold` must be within the range `(minTick, minTick + length * tickSpacing)`.
