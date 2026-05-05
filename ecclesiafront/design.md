---
name: Ecclesia Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#444653'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#323537'
  on-tertiary: '#ffffff'
  tertiary-container: '#484c4e'
  on-tertiary-container: '#b9bcbe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max: 1200px
---

## Brand & Style
The design system is rooted in the concepts of **Solemnity, Clarity, and Sacred Heritage**. It serves the faithful of Londrina-PR by providing a digital space that feels as reverent and organized as the parishes it represents. The visual style follows a **Modern Corporate** approach with a refined, traditional editorial layer, balancing the weight of history with the efficiency of modern technology.

The interface should evoke a sense of peace and institutional trust. Whitespace is used generously to provide "breathing room," mirroring the quietude of a cathedral. Every element is aligned to a rigorous grid to demonstrate the order and reliability required for liturgical schedules.

## Colors
The palette is derived from traditional ecclesiastical heraldry. 
- **Deep Navy Blue (#1e40af):** Represents the primary brand authority and is used for headers, primary actions, and structural elements.
- **Elegant Gold (#d4af37):** Used as a sacred accent to highlight key information, secondary buttons, and decorative borders, symbolizing the divine and the precious nature of time.
- **Clean White (#ffffff):** The primary background color to ensure maximum readability and a "clean" liturgical feel.
- **Supportive Neutrals:** A range of slates and soft grays are used for secondary text and subtle borders to keep the focus on the primary navy and gold.

## Typography
This design system utilizes a sophisticated typographic pairing to bridge the gap between tradition and utility.

**Headlines:** "Newsreader" provides a high-contrast, authoritative serif look that echoes liturgical texts and historic documents. It should be used for page titles and parish names.

**Body & Interface:** "Inter" is utilized for all functional data, schedule lists, and navigational elements. Its high x-height ensures clarity even at small sizes in dense schedule tables. All-caps styling with increased letter-spacing is reserved for small labels (e.g., "NEXT MASS") to provide a classic, monumental feel.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop to maintain a formal, structured appearance. A 12-column system is used with generous 24px gutters.

Spacing is based on a 4px baseline shift, but primarily utilizes 8px increments (8, 16, 24, 32, 48, 64) to create a rhythm that is rhythmic and predictable. Content should be centered within a 1200px container to ensure high-end readability on wide displays. For schedule tables, vertical padding is increased to allow the user’s eye to track time slots easily without feeling cramped.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. Surfaces are kept primarily flat to maintain a "clean" aesthetic, with elevation used only to denote interactivity or importance.

- **Level 0 (Base):** Clean White (#ffffff).
- **Level 1 (Cards):** Subtle, extra-diffused shadows with a very low opacity (4-6%) using a Navy-tinted shadow color.
- **Level 2 (Modals/Popovers):** Deeper shadows to create a clear separation from the background.
- **Interactive:** Hover states on cards should involve a slight vertical lift and a subtle increase in shadow spread to indicate clickability.

## Shapes
The shape language is **Soft (0.25rem)**. While modern, the design avoids overly circular or "bubbly" corners to maintain its solemnity. 

Edges are slightly softened to appear approachable and trustworthy, but remain disciplined. Rectilinear forms are preferred for schedule tables and structural containers, while buttons and small tags use the standard `rounded-md` (4px) or `rounded-lg` (8px) for a polished, modern touch.

## Components
- **Buttons:** Primary buttons are Navy Blue with white text. Secondary buttons utilize a Gold (#d4af37) border and text for an "elegant" accent. All buttons should have a high-contrast, clear presence.
- **Cards:** Cards feature a 1px soft gray border and a subtle shadow. They are used to group parish information (Address, Phone, Map link).
- **Schedule Tables:** These are the core of the platform. They use alternating row tints in very light gray/blue and bold serif typography for the time slot. Status indicators (e.g., "Confessions Now") use small, gold-accented chips.
- **Inputs:** Clean, outlined fields with focus states using a 2px Gold border. Labels are always placed above the field in all-caps Inter.
- **Parish Header:** A specific component that integrates a high-quality photo of the church with a Navy Blue overlay and the parish name in large Newsreader serif.
- **Liturgical Calendar Widget:** A specialized component using a minimalist grid to highlight feast days and solemnities with gold-colored indicators.
