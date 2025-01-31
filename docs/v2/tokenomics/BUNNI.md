---
title: BUNNI
hide_table_of_contents: false
sidebar_position: 1
---

`BUNNI` is the native token of the Bunni protocol.

The total supply of `BUNNI` is `1,000,000,000` and the distribution is defined below. Previously, `LIT` was used as the native token of the Bunni protocol. Following the approval of TIP-009, `LIT` will be depreciated in favor of `BUNNI`. For more information on how `LIT` was originally distributed, please refer to the [documentation](../../v1/tokenomics/lit) of Bunni v1.


### LIT Migration

Following the approval of TIP-009, [`LIT`](https://etherscan.io/token/0xfd0205066521550D7d7AB19DA8F72bb004b4C341) will be convertable to [`BUNNI`](https://etherscan.io/token/0x000000c396558ffbab5ea628f39658bdf61345b3) at a 1:1 ratio indefinitely. Token migration is available exclusively on Ethereum Mainnet and is facilitated through the swap interface on the Bunni app ([https://bunni.xyz/swap](https://bunni.xyz/swap?chain=mainnet)). More advanced users can interact with the [TokenMigrator](https://etherscan.io/address/0x000000c2552ac621A551170d95B5ae6CB97Ad811) contract directly.

Roughly `650,962,454 BUNNI` has been sent to the TokenMigrator contract to match the total circulating supply of `LIT` at the time of writing. This amount does not account for any [`oLIT`](https://etherscan.io/token/0x627fee87d0d9d2c55098a06ac805db8f98b158aa#code) that has not yet been claimed or exercised. Additional `BUNNI` will be sent from the Governance Treasury to the TokenMigrator contract as needed to account for this discrepancy.

### veBUNNI Airdrop

Following the approval of TIP-009, a [veBUNNI](https://etherscan.io/token/0x00000042877f4a1cC0693383ebdAc7c0e0A1bf77) airdrop was approved for various stakeholders within the Bunni ecosystem. Users can claim their airdrop on Ethereum Mainnet via the claim interface on the Bunni app ([https://bunni.xyz/airdrop](https://bunni.xyz/airdrop?chain=mainnet)). Additional details about the airdrop can be found [here](./Airdrop).

Roughly `159,374,055 BUNNI` has been sent to the [veAirdrop](https://etherscan.io/address/0x0000005f3a0733345412b510b63Fc2D3CA5375F0) contract. Once the airdrop claim period has ended, any unclaimed BUNNI will be withdrawn from the veAidrop contract to the Governance Treasury.

### Treasury Allocation

Any remaining `BUNNI` not allocated to the LIT Migration or veBUNNI Airdrop will be held in the Governance Treasury. The approval of TIP-009 granted the use of `25,000,000 BUNNI` to be used as liquidity incentives in the first 3 months after the launch of Bunni v2. Any additional use of `BUNNI` tokens held in the treasury will be at the discretion of veBUNNI governance.