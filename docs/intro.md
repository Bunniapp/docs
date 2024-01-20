---
sidebar_position: 1
---

# What is Bunni?

Bunni is a liquidity engine for incentivizing Uniswap v3 liquidity.

Bunni has two parts: a protocol that wraps Uniswap liquidity positions into fungible ERC-20 tokens, and a vetokenomics system for incentivizing Bunni liquidity.

The combination of a robust incentivization system and concentrated liquidity makes Bunni on track to be the most efficient method for incentivizing DEX liquidity. 

## Uniswap wrapper

Officially Uniswap uses NFTs to represent liquidity positions, but it's a little-known fact that it doesn't have to be the case: anyone can build a contract that represents Uniswap positions in any form, be it an ERC-721 NFT, an ERC-1155 NFT, or ERC-20 tokens. This is thanks to the permissionlessness of the Uniswap core protocol.

Bunni has built the first such wrapper contract that represents Uniswap positions as ERC-20 tokens. This has numerous benefits over using NFTs:

- **Gas efficiency**: LPs using the same price range & same pool share the same ERC-20 token, spreading the gas cost of providing liquidity over all LPs and thus making it much cheaper.
- **Easy composability**: While it's possible to build financial applications on top of Uniswap NFTs, it is far easier to do so using ERC-20 LP tokens, since most existing financial applications are designed for tokens rather than NFTs. This is what enabled Bunni to adopt Curve's gauge system for Uniswap positions.

## Vetokenomics system

Bunni's native token, the **Liquidity Incentive Token (LIT)**, is used to incentivize liquidity on Bunni. Bunni has improved upon the vetokenomics used by Curve to reduce farming-and-dumping and increase longevity.

- **Balancer LP token as vote-locked token**: Bunni uses the Balancer 80LIT-20WETH LP token as the lock token for obtaining veLIT.
- **Increased max boost**: Bunni gives a max of 5x boost to LPs who have veLIT, instead of the 2.5x used by Curve & Balancer. This increases the advantage of holding veLIT.
- **Call option as reward token**: Instead of using LIT as the reward token, Bunni uses call option tokens for LIT as the reward token. This has the benefit of enabling the protocol to accumulate a large cash reserve regardless of market conditions, as well as letting loyal holders buy LIT at a discount.
