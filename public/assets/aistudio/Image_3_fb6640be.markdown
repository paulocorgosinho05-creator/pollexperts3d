---
name: Obsidian Market
colors:
  surface: '#111410'
  surface-dim: '#111410'
  surface-bright: '#373a35'
  surface-container-lowest: '#0c0f0b'
  surface-container-low: '#191c18'
  surface-container: '#1d201c'
  surface-container-high: '#282b26'
  surface-container-highest: '#323631'
  on-surface: '#e1e3dc'
  on-surface-variant: '#c3c8bd'
  inverse-surface: '#e1e3dc'
  inverse-on-surface: '#2e312c'
  outline: '#8d9288'
  outline-variant: '#434840'
  surface-tint: '#afd0a5'
  primary: '#afd0a5'
  on-primary: '#1c3618'
  primary-container: '#7a9972'
  on-primary-container: '#153012'
  inverse-primary: '#496643'
  secondary: '#baccb2'
  on-secondary: '#253422'
  secondary-container: '#3d4d3a'
  on-secondary-container: '#acbea5'
  tertiary: '#caca8a'
  on-tertiary: '#313202'
  tertiary-container: '#797a42'
  on-tertiary-container: '#050500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#caecc0'
  primary-fixed-dim: '#afd0a5'
  on-primary-fixed: '#062106'
  on-primary-fixed-variant: '#324d2d'
  secondary-fixed: '#d5e8ce'
  secondary-fixed-dim: '#baccb2'
  on-secondary-fixed: '#111f0f'
  on-secondary-fixed-variant: '#3b4b38'
  tertiary-fixed: '#e6e6a4'
  tertiary-fixed-dim: '#caca8a'
  on-tertiary-fixed: '#1c1d00'
  on-tertiary-fixed-variant: '#484916'
  background: '#111410'
  on-background: '#e1e3dc'
  surface-variant: '#323631'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets competitive esports enthusiasts, high-volume CS2 skin traders, and digital collectors who demand instantaneous market execution, absolute transaction transparency, and a visually razor-sharp interface. The emotional tone combines the high-octane precision of top-tier esports equipment with the sophisticated luxury of an elite trading terminal. 

The aesthetic is built upon **Dark Glassmorphism** layered over deep void backgrounds. It leverages sleek, semi-translucent green-gray containers, luminous weapon rarity accents, hairline border glows, and crisp numerical telemetry. The experience must feel frictionless, secure, and visually electric—allowing valuable assets like knives, gloves, and pristine float skins to take center stage against immersive, obsidian surfaces.

## Colors

The palette is engineered around pure dark canvas ergonomics, balancing low visual fatigue with electric tactical signals.

### Canvas & Surfaces
- **Canvas Base:** `#757872` (Abyssal slate-black foundation).
- **Surface Level 1 (Panels & Shelves):** `#14140c` with subtle olive undertones.
- **Surface Level 2 (Glass Containers & Cards):** `#212018` at 70% opacity with backdrop blur.
- **Surface Active / Border Subdued:** `#36352c`.

### Core Brand Accents
- **Primary Olive Sage:** `#617f5a` (Used for primary trading CTAs, active tab indicators, and progress states).
- **Secondary Muted Olive:** `#6b7c66` (Steam sync status, special promotion highlights, secondary controls).
- **Success / Positive Delta:** `#10b981` (Profitable trades, completed verifications, balanced trades).
- **Destructive / Negative Delta:** `#ef4444` (Deficit alerts, cancels, error feedback).

### Rarity System (Item Grading Tiers)
- **Extraordinary / Gold (Knives, Gloves, Special):** `#f59e0b` / Glow `#fbbf24`
- **Covert (Red):** `#eb4b4b` / Glow `#f87171`
- **Classified (Pink):** `#d32ce6` / Glow `#e879f9`
- **Restricted (Purple):** `#8847ff` / Glow `#a78bfa`
- **Mil-Spec (Blue):** `#4b69ff` / Glow `#60a5fa`
- **Industrial / Consumer (Slate/Grey):** `#5e6578`

## Typography

The pairing blends the mathematical, technical edge of **Space Grotesk** with the clean legibility of **Inter**.

- **Space Grotesk** is deployed across brand banners, section headers, trade totals, currency values, skin float values, and button labels to inject an authentic gaming/terminal character.
- **Inter** handles high-density data tables, item descriptions, dropdown menus, filter lists, and legal tooltips where clarity and rapid scanning are essential.
- Price tags, float decimals (`0.0324`), and wear values (`FN`, `MW`, `FT`) strictly utilize the tabular figures of `Space Grotesk` (`mono-numeric`) to prevent horizontal jitter during live cart balance calculations.

## Layout & Spacing

This design system uses a fluid, dense trading grid designed for rapid browsing and dual-pane inventory comparison:

### Layout Structure
- **Mobile (< 768px):** Single-column workflow with persistent bottom trade-dock. Tabbed split between "My Inventory" and "Bot/Market Inventory". Margin is `1rem`, grid columns display 2 skin cards side by side (`gutter: 0.75rem`).
- **Tablet (768px - 1199px):** Adaptive 2-column or 3-column skin grid with collapsible trade summary rail.
- **Desktop (1200px+):** Dual-split workstation layout. The viewport divides into the User Inventory pane (left 50%) and Market Inventory pane (right 50%), unified by a central or top live exchange calculation bridge. Responsive grid provides 4 to 6 skin cards per row on each side (`gutter: 1.25rem`, `margin: 2rem`).

### Sizing and Spacing Logic
- `space-xs` (4px) & `space-sm` (8px): Used inside skin cards between wear tags, price tags, and sticker indicator badges.
- `space-md` (12px): Standard inner padding for card content containers, search input bars, and filter pills.
- `space-lg` (20px): Structural gap separating category navigation, search controls, and item grids.
- `space-xl` (32px): Primary section divisions and trade modal content spacing.

## Elevation & Depth

Visual hierarchy uses frosted glass layers and colored ambient lighting, mimicking the reflection off hardened synthetic glass:

- **Level 0 (Backdrop Canvas):** Deep matte `#757872` with faint, localized radial gradients beneath active rarity groups.
- **Level 1 (Shelf / Section Backgrounds):** Solid `#14140c` with hairline border `rgba(255, 255, 255, 0.05)`.
- **Level 2 (Default Skin Cards & Search Controls):** Semi-transparent `#1c1c14` with 12px blur backdrop (`backdrop-filter: blur(12px)`) and a 1px border `rgba(255, 255, 255, 0.08)`.
- **Level 3 (Selected / Hovered Skin Cards):** Elevated surface with dynamic glow matching the item's rarity tint (e.g., Covert Red: `box-shadow: 0 0 16px -2px rgba(235, 75, 75, 0.45)`, border: `rgba(235, 75, 75, 0.6)`).
- **Level 4 (Sticky Trading Bar & Floating Modals):** Translucent obsidian glass `#14140c` at 85% opacity, `backdrop-filter: blur(20px)`, top border `1px solid rgba(97, 127, 90, 0.3)`, anchored with soft ambient drop-shadow: `0 -8px 24px rgba(0, 0, 0, 0.6)`.

## Shapes

The design system adopts a **Rounded (Level 2)** geometry to balance modern ergonomic software aesthetics with crisp tactical hardware profiles:

- **Cards & Panes:** Standard radius `0.5rem` (8px) for skin tiles and data panels, keeping inventory grids tightly fitted without clumsy gaps.
- **Modals, Floating Panels & Trading Dock:** `rounded-lg` `1rem` (16px) for major dialogue windows, popovers, and sticky interaction bars.
- **Buttons & Action Controls:** Interactive buttons, quick-filter chips, and search bars use uniform `0.5rem` (8px) radii, while status pips and wear pills (`FN`, `MW`) utilize full pill-capsules (`rounded-full`) for instant identification.

## Components

### Skin Display Cards
- **Base Style:** Dual-layer glass card. Background `#1c1c14` (70% opacity) with subtle bottom-to-top gradient. 
- **Top Metadata:** Small wear indicator chip (e.g., `FN / 0.0324`) aligned left; inspect 3D icon and sticker count dots positioned top right.
- **Center Visual:** High-resolution transparent skin PNG, hovering above an ambient radial glow matched to the item's rarity classification color.
- **Footer:** Bold price tag (`Space Grotesk` mono-numeric) in white/emerald, positioned adjacent to a swift multi-select toggle or direct olive cart button (`#617f5a`).
- **State Changes:** Hover activates a 1px border glow of the rarity color and an upward 2px translate. Selected states trigger an inset electric olive outline and checkmark badge.

### Trading Balance Bar & Dock
- **Layout:** Sticky bottom (mobile) or centered exchange bridge (desktop).
- **Content:** Two-sided ledger displaying: "Your Offer ($)" vs. "Receiving ($)" separated by an interactive trade directional icon.
- **Real-Time Delta Display:** Automatically displays differential with color tokens: green (`+$12.50`) when receiving excess value, crimson when running a deficit, or neutral gray when balanced.
- **Primary CTA:** Full-width or prominent "Trade Now" button with animated gradient (`#617f5a` to `#6b7c66`).

### Steam Integration Bar & Status Badges
- **Authentication State:** Displays user Steam avatar with subtle status indicator ring (green for API online / trade URL verified; orange for escrow hold warning).
- **One-Click Sign-in Button:** High-contrast olive button featuring standard Steam white vector glyph, uppercase label font, and secure lock tag.

### Inventory Switcher & Tabs
- **Segmented Control:** Dark recessed base `#0f0e07` with sliding active pill `#2b2a22`.
- **Tab Indicators:** Active tab has a crisp `#617f5a` underline bar or fully filled background with glowing font weight. Counter pill displays item count (e.g., `CS.MONEY (1,420)`).

### Search & Filter Controls
- **Search Inputs:** Dark inset background `#14140c` with subtle icon prefix and clear button. Border lights up to `#617f5a` on focus.
- **Filter Chips:** Categorized by exterior (Factory New, Minimal Wear, Field-Tested), StatTrak toggle, Souvenir toggle, and price sliders with dual thumb inputs.