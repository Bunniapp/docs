---
title: Pool Creation Guide
hide_table_of_contents: false
sidebar_position: 1
---

# Bunni Pool Creation Guide

## Overview

This guide provides a comprehensive walkthrough of creating liquidity pools using Bunni v2. Bunni v2 is a revolutionary Automated Market Maker that introduces shapeshifting liquidity, autonomous rebalancing, dynamic fees that respond to market volatility, rehypothecation of idle assets for additional yield, and constant gas costs for swaps regardless of ticks crossed. The pool creation interface offers granular control over these features through Liquidity Density Functions (LDFs) and other innovative mechanisms.

## Key Innovations in Bunni v2

Before diving into pool creation, it's important to understand what makes Bunni v2 unique:

- **Complex liquidity shapes** managed with a single position
- **Efficient liquidity reshaping** without removing and recreating positions
- **Constant swap gas costs** regardless of ticks crossed
- **Auto-compounding** of swap fees back into liquidity
- **MEV recapture** through am-AMM mechanism
- **Rehypothecation** of idle assets for additional yield

## Pool Creation Flow

The creation process follows a logical sequence where each step builds upon the previous configuration. After completing the initial token pair selection, all additional configuration options become available and can be adjusted in any order.

## Step 1: Pool Initialization

### Token Pair Selection

Begin by selecting the two tokens for your liquidity pair. Each pool will have its unique BunniToken (ERC-20) representing shares in the pool.

- **Token A**: First token in the pair
- **Token B**: Second token in the pair

### Core Pool Parameters

Once both tokens are selected, the pool initialization section expands to reveal essential configuration options:

#### Initial Price

Set the starting price for your pool. This determines the initial exchange rate and should match current market prices to avoid arbitrage.

**Key features:**
- Toggle between price denominators (Token A per Token B or vice versa)
- DefiLlama integration for automatic market price fetching via "Fetch" button
- Manual input with full decimal support
- Validation ensures price is greater than zero

**Best practices:**
- Always verify the fetched price matches your expectations
- Consider the price direction carefully - it affects how you'll interpret pool performance
- For new tokens without market price, research comparable assets
- Ensure price accuracy to prevent immediate arbitrage opportunities

#### Tick Spacing

Tick spacing determines the granularity of your liquidity distribution. Unlike traditional AMMs, Bunni v2's gas costs remain constant regardless of ticks crossed during swaps.

**Understanding tick spacing in Bunni v2:**
- Measured in ticks (price increments)
- Controls precision of liquidity positioning
- Does NOT affect swap gas costs (constant in Bunni v2)
- Affects the granularity of your LDF implementation
- Lower values = more precise positioning = higher deployment costs
- Higher values = less precise positioning = lower deployment costs

**Preset options with width percentages:**
- **1 tick (0.01% width)**: Maximum precision for stable pairs like USDT/USDC
- **10 ticks (0.10% width)**: Balanced option for correlated assets
- **60 ticks (0.60% width)**: Efficient choice for volatile pairs

**Configuration details:**
- Valid range: 1-32,767 ticks
- Warning appears above 16,000 ticks (may indicate suboptimal configuration)
- Increment buttons for fine-tuning
- Cannot be changed after pool creation

### Advanced Pool Settings

Expanding the "Advanced Settings" reveals optional configuration parameters:

#### Pool Metadata

**Pool Name:**
- Customize the display name for your pool
- Maximum 32 bytes
- Default: "Bunni [TOKEN A]/[TOKEN B] LP"
- **Important**: Immutable after creation

**Pool Symbol:**
- ERC-20 token symbol for your BunniToken
- Maximum 32 bytes
- Default: "BUNNI-[TOKEN A]-[TOKEN B]-LP"
- **Important**: Immutable after creation

**Pool Description:**
- Optional field for explaining your pool's strategy
- Can be updated after pool creation
- Useful for attracting liquidity providers
- No character limit in the interface

**Pool Owner:**
- Address with administrative privileges
- Defaults to connected wallet
- Can update certain parameters post-creation
- Must be a valid Ethereum address (42 characters)
- Ensure this address is secure and accessible

#### Oracle Configuration

**Oracle Minimum Interval:**
- Percentage-based minimum time between TWAP updates
- Prevents manipulation through frequent small trades
- Critical for autonomous rebalancing and dynamic fee calculations

**How it works:**
- Expressed as a percentage of the TWAP duration
- Example: 50% on a 10-minute TWAP means updates at most every 5 minutes
- Stored internally as basis points (1% = 100)

**Preset values:**
- **0%**: No restriction (most responsive, least secure)
- **10%**: Light protection against manipulation
- **50%**: Strong manipulation resistance

**Configuration features:**
- Manual input with percentage validation
- Increment/decrement buttons for precise control
- Valid range: 0-100%

## Step 2: Additional Configuration

After completing token selection, the interface reveals comprehensive configuration options that can be adjusted in any order.

### Rehypothecation Settings

Rehypothecation is a key innovation in Bunni v2, allowing idle assets to earn yield from external protocols. Configure independently for each token with side-by-side cards.

#### Vault Selection (For Token A and Token B)

**Options:**
- **No Rehypothecation**: All assets remain available for swaps
- **Vault Selection**: Deploy idle assets to yield-generating vaults

**Vault selection interface:**
- Dropdown shows current selection with APY
- Search functionality for finding vaults
- Verification status indicators (Verified/Not Verified)
- "Add new vault" option for custom vault addresses
- Each vault displays:
  - Vault name and symbol
  - Current APY
  - Protocol icon
  - Contract address

#### Advanced Rehypothecation Parameters

When a vault is selected, expand "Advanced Settings" to configure the balance between liquidity and yield:

**Raw Asset Ratios (φ parameters):**

**Target Raw Asset Ratio (φ_target):**
- Ideal percentage of assets to keep as raw tokens
- The system attempts to maintain this ratio during normal operations
- Presets: 5%, 10%, 15%
- Manual input with 0.01% precision
- Increment/decrement buttons for fine adjustment

**Minimum Raw Asset Ratio (φ_min):**
- Minimum percentage that must remain in pool for swaps
- Ensures sufficient liquidity for traders
- Presets: 2.5%, 5%, 7.5%
- Must be less than target ratio
- Critical for maintaining swap efficiency

**Maximum Raw Asset Ratio (φ_max):**
- Triggers deposits to vault when exceeded
- Prevents excessive idle assets
- Presets: 7.5%, 15%, 22.5%
- Must be greater than target ratio
- Balances yield generation with liquidity needs

**Surge Threshold:**
- Percentage of pool volume that triggers rebalancing
- Displayed as percentage but stored as divisor (100/n)
- Controls sensitivity to volume spikes

**How surge threshold works:**
- Input: Percentage value (e.g., 5%, 10%, 20%)
- Internal storage: As divisor (e.g., 5% = 20, 10% = 10)
- Non-exact inputs automatically adjusted to nearest valid value
- Example: 3% input becomes 3.03% (100/33)

**Preset values:**
- **Low (0.5%)**: Less frequent rebalancing
- **Medium (1%)**: Balanced approach
- **High (2%)**: More responsive to volume changes

**Visual feedback:**
- Floating bar chart shows ratio relationships
- Interactive sliders for visual adjustment
- Real-time validation messages
- Adjustment warnings for non-exact percentages

### Volatility Strategy Presets

Presets provide optimized configurations for common pool types. Selecting a preset automatically configures multiple parameters across all sections.

**Available presets (varies by token pair):**
- **Stable Pairs**: Optimized for minimal price movement
- **Correlated Assets**: For tokens that move together
- **Volatile Pairs**: Maximum fee capture during volatility
- **Custom configurations**: Strategy-specific presets

**Preset features:**
- Visual icon/representation for each strategy
- Grayscale effect on unselected options
- Feature tags showing:
  - Fee mode (Static/Dynamic/am-AMM)
  - Liquidity mode (Static/Shifting)
  - Rebalancing status
- One-click application of tested configurations

**Using presets effectively:**
- Presets override current settings
- Can be fine-tuned after application
- Serve as starting points, not rigid requirements
- Some presets may show rebalancing warnings

### Fee Mode Configuration

Fee configuration determines how traders pay for swaps and how LPs earn revenue. The interface uses an integrated design where fee inputs appear alongside the mode selection.

#### Fee Mode Selection

**Dropdown interface:**
- Current selection shows mode name and description
- Integrated fee input fields appear based on selection
- Validation messages appear below inputs

#### Static Fee Mode

**Configuration:**
- Single input field for swap fee percentage
- Appears to the right of mode dropdown
- Maximum value: 99.99%
- Automatic adjustment for values exceeding maximum

**When to use:**
- Stable pairs with consistent volume
- When predictability is prioritized
- Pools targeting specific fee tiers

#### Dynamic Fee Mode

**Configuration inputs:**
- **Minimum fee**: Lowest fee when price equals TWAP
- **Maximum fee**: Highest fee at maximum deviation
- Both inputs appear side-by-side with mode selection

**Validation:**
- Minimum fee must be less than maximum fee
- Maximum values capped at 99.99%
- Automatic adjustment notifications
- Error messages for invalid configurations

#### Auction Managed Modes

**Options:**
- **Auction Managed (Static)**: Fixed base fee with auction control
- **Auction Managed (Dynamic)**: Dynamic base fee with auction overlay

**For Auction Managed Dynamic:**
- Fallback mode selector (Static/Dynamic toggle)
- Determines behavior when no auction is active

#### Advanced Fee Settings

Expand "Advanced Settings" for additional parameters:

**For Dynamic Modes:**

**Dynamic Swap Fee Sensitivity (Quadratic Multiplier):**
- Controls how quickly fees increase with price deviation
- Presets: x1 (gradual), x5 (moderate), x15 (aggressive)
- Manual input with 0.01 precision
- Maximum value: 16.777215 (uint24 maximum)
- Automatic adjustment for values exceeding maximum

**TWAP Duration (seconds):**
- Time window for calculating price deviation
- Used for dynamic fee calculation
- Presets: 1 hour, 1 day, 7 days
- Manual input in seconds
- Affects fee responsiveness to price changes

**Dynamic Fee Chart:**
- Visual representation of fee curve
- Shows relationship between price deviation and fees
- Updates in real-time with parameter changes

**For Auction Managed Modes:**

**Maximum am-AMM Fee:**
- Upper limit for auction-controlled fees
- Presets: 1%, 5%, 10%
- Maximum: 10% (100,000 in basis points)
- Protects LPs from excessive fees

**Minimum Rent APR:**
- Required annual payment rate from auction winners
- Presets vary by network block time
- Displayed as APR percentage
- Ensures meaningful compensation to LPs

### Liquidity Mode Selection

Liquidity mode determines how your liquidity responds to price movements, enabling Bunni v2's shapeshifting capability.

#### Available Modes

Four mode options are available: 

**Mode Static:**
- Liquidity remains fixed regardless of price
- No autonomous rebalancing needed
- Traditional AMM behavior
- Lowest operational complexity

**Mode Both:**
- Liquidity follows TWAP in both directions
- Maintains optimal capital efficiency
- Requires active rebalancing
- Best for ranging markets

**Mode Left:**
- Liquidity shifts only when Token A price decreases
- Accumulates Token A on downward moves
- Maintains position on upward moves
- Suitable for accumulation strategies

**Mode Right:**
- Liquidity shifts only when Token A price increases
- Distributes Token A on upward moves
- Maintains position on downward moves
- Suitable for distribution strategies

#### Advanced Liquidity Settings

Expand "Advanced Settings" for mode-specific parameters:

**TWAP Duration Configuration:**

**For Dynamic Modes Only:**

**Surge Fee Half-life (seconds):**
- Time for surge fee to decrease by 50%
- Protects LPs during liquidity transitions
- Presets: 30 seconds, 1 minute, 5 minutes
- Manual input with increment controls
- Must be greater than 0

**Surge Fee Auto-start Threshold (seconds):**
- Delay before surge fee begins decreasing
- Prevents immediate fee reduction after shifts
- Presets: 1 minute, 2 minutes, 10 minutes
- Can be set to 0 for immediate decay

**Rebalancing Settings:**
- Toggle switch for enabling/disabling
- Currently shows as enabled with configuration options
- Affects how actively the pool maintains target distribution
- Critical for dynamic liquidity modes

### Rebalancing Configuration

Rebalancing is a critical feature for dynamic liquidity modes, enabling autonomous adjustment of asset compositions to maintain optimal liquidity distribution as prices change.

#### Rebalancing Toggle

**Enable/Disable Control:**
- Toggle switch to activate rebalancing functionality
- When enabled, pool automatically adjusts based on configured parameters
- Essential for Mode Both, Mode Left, and Mode Right
- Not needed for Mode Static

#### Advanced Rebalancing Parameters

When rebalancing is enabled, expand "Advanced Settings" to configure detailed parameters:

**Rebalance Threshold:**
- Triggers rebalancing when excess liquidity ratio exceeds this percentage
- Controls how frequently rebalancing occurs
- Displayed as percentage but stored as divisor (100/n)

**How threshold works:**
- Measures ratio: excessLiquidity / activeLiquidity
- Lower percentages (5%) = more frequent rebalancing
- Higher percentages (20%) = less frequent rebalancing
- Non-exact inputs adjusted to nearest valid value

**Preset values:**
- **5%**: Aggressive rebalancing (100/20)
- **10%**: Balanced approach (100/10)
- **20%**: Conservative rebalancing (100/5)

**Configuration details:**
- Manual input with 0.01% precision
- Valid range: ~0.0015%% to 100%
- Increment/decrement controls
- Automatic adjustment notifications for non-exact values

**Slippage Tolerance:**
- Maximum allowed price deviation during rebalance swaps
- Protects against unfavorable execution
- Critical for volatile markets

**Configuration:**
- Manual input with 0.001% precision
- Presets: 0.5%, 1%, 3%
- Valid range: >0% to 25%
- Warning for high slippage (>5%)

**Best practices:**
- Stable pairs: 0.1-0.5%
- Correlated assets: 0.5-1%
- Volatile pairs: 1-3%
- Avoid >5% unless necessary

**TWAP Duration for Rebalancing (seconds):**
- Time window for price averaging when computing target balances
- Different from liquidity mode TWAP
- Balances accuracy vs manipulation resistance

**Configuration:**
- Manual input in seconds
- Presets: 1 minute, 5 minutes, 10 minutes
- Valid range: >0 to 10,799 seconds (~3 hours)
- Warning when approaching maximum

**Strategic considerations:**
- Short duration (1 min): Responsive to current price
- Medium duration (5 min): Balanced approach
- Long duration (10 min): Resistant to manipulation

**Order Time to Live (TTL):**
- Expiration time for rebalance swap orders
- Orders retry after expiration if not executed
- Prevents stale orders from executing

**Configuration:**
- Manual input in seconds
- Presets: 30 seconds, 2 minutes, 5 minutes
- Valid range: >0 to 3,599 seconds (~1 hour)
- Warning when approaching maximum

**Use cases:**
- Fast markets: 30-60 seconds
- Normal conditions: 2-5 minutes
- Slow/illiquid markets: 5-10 minutes

#### Rebalancing Validation and Warnings

**Common validation messages:**
- Threshold must be valid percentage
- Slippage must be greater than 0
- TWAP duration cannot exceed maximum
- TTL must be within valid range

**Automatic adjustments:**
- Non-exact threshold percentages rounded to nearest valid value
- Values exceeding maximums capped with notification
- Visual feedback for all adjustments

#### Rebalancing Strategy Guidelines

**For Stable Pairs:**
- Higher threshold (10-20%) - less frequent rebalancing
- Lower slippage (0.1-0.5%) - tight execution
- Longer TWAP (5-10 min) - stability
- Moderate TTL (2-5 min) - standard execution

**For Volatile Pairs:**
- Lower threshold (5-10%) - more responsive
- Higher slippage (1-3%) - execution flexibility
- Shorter TWAP (1-3 min) - current price tracking
- Shorter TTL (30s-2 min) - quick retry

**For Correlated Assets:**
- Moderate threshold (10%) - balanced approach
- Moderate slippage (0.5-1%) - reasonable tolerance
- Medium TWAP (3-5 min) - price smoothing
- Standard TTL (2-3 min) - normal execution

### Liquidity Density Function (LDF)

The LDF determines the shape of your liquidity distribution across the price range. This is a core innovation enabling Bunni v2's advanced features.

#### Available Functions

**Uniform Distribution:**
- Even liquidity across defined range
- Most similar to traditional range orders

**Geometric Distribution:**
- Concentrated liquidity with mathematical decay
- Single-peaked distribution
- Shown as "Geometric" (actually Carpeted Geometric)

**Double Geometric Distribution:**
- Two geometric curves combined
- Allows asymmetric liquidity
- Shown as "Double Geometric" (actually Carpeted Double Geometric)

#### Advanced LDF Settings

Expand "Advanced Settings" for function-specific parameters:

**For Uniform Distribution:**

**Price Range Configuration:**
- **Low Price**: Lower boundary of liquidity
- **High Price**: Upper boundary of liquidity
- "Full Range" button for maximum coverage
- Price inversion toggle
- "Reset" button to restore defaults

**For Geometric Distribution:**

**Parameters:**
- **Concentration (Alpha)**: 0-1 value controlling tightness
  - Lower values = tighter concentration
  - Higher values = wider distribution
  - Manual input with 0.00001 precision
  - Increment/decrement controls

- **Length**: Total range in ticks
  - Determines overall coverage
  - Must be positive integer
  - Validation against tick spacing

- **Minimum Price** (Static mode) or **Offset** (Dynamic modes):
  - Starting point for distribution
  - Price input for static mode
  - Tick offset for dynamic modes

**For Double Geometric Distribution:**

**Parameters:**
- **Concentration Left (Alpha1)**: Left side concentration
- **Concentration Right (Alpha0)**: Right side concentration
- **Length Left**: Left side range in ticks
- **Length Right**: Right side range in ticks
- **Weight Left**: Percentage weight for left side
- **Weight Right**: Percentage weight for right side
  - Weights must sum to 100%
  - Automatic adjustment if sum exceeds 100%

**Common Advanced Features:**
- **Interactive Chart**: Real-time visualization of distribution
- **Validation Messages**: Immediate feedback on invalid parameters
- **Reset Button**: Return to default values
- **Invert Toggle**: Switch price denomination
- **Error Messages**: Clear guidance for parameter limits

## Step 3: Review and Create

### Final Validation

Before creating your pool, ensure:
- All required fields are valid
- Parameters align with your strategy
- Initial price matches current market
- Gas costs are acceptable

### Transaction Execution

**The creation process:**
1. Click "Create Pool" button when all validations pass
2. Review transaction details in wallet
3. Confirm gas costs and execute
4. Monitor transaction progress
5. Receive pool address and BunniToken details

### Deployment Details

Creating a pool deploys:
- **BunniToken**: Your pool's ERC-20 share token
- **Pool in BunniHub**: The immutable main contract
- **BunniHook Configuration**: Swap handling and features
- **LDF Assignment**: Your selected distribution strategy

### Post-Creation Actions

- Add initial liquidity to bootstrap the pool
- Share pool details to attract other LPs
- Monitor autonomous features performance
- Track rehypothecation yields
- Observe am-AMM auction activity

## Strategic Considerations by Parameter

### Tick Spacing Selection
- **Stable pairs**: Use minimum (1 tick) for precision
- **Correlated assets**: Balance precision and efficiency (10 ticks)
- **Volatile pairs**: Prioritize efficiency (60+ ticks)

### Rehypothecation Strategy
- **Stable pairs**: Aggressive ratios (2.5/5/7.5%)
- **Volatile pairs**: Conservative ratios (7.5/15/22.5%)
- **New protocols**: Start conservative, adjust based on performance

### Fee Mode Selection
- **High volume pairs**: Static fees for predictability
- **Volatile pairs**: Dynamic fees for protection
- **MEV-prone pairs**: Enable am-AMM for value recapture

### Liquidity Mode Choice
- **Ranging markets**: Mode Both for efficiency
- **Trending markets**: Mode Left/Right for directional exposure
- **Passive strategies**: Mode Static for simplicity

### LDF Selection
- **Narrow ranges**: Geometric for concentration
- **Wide ranges**: Uniform for coverage
- **Directional views**: Double Geometric for asymmetry

## Conclusion

Bunni v2 represents a paradigm shift in AMM design, combining concentrated liquidity with programmable automation. The Advanced Mode provides access to all these innovations through an intuitive interface. Success requires understanding how each parameter interacts within Bunni v2's architecture and aligning configurations with your strategic goals.

The protocol's flexibility allows for continuous refinement as market conditions evolve, making it a powerful tool for professional liquidity providers and protocols seeking optimal market making solutions. Each pool created becomes a unique strategy expression, leveraging Bunni v2's innovations to maximize returns while managing risks.

For technical support or strategy discussions, engage with the Bunni community through official channels: [Discord](https://discord.gg/bunnixyz) | [X](https://x.com/bunni_xyz)