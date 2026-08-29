/**
 * ConsultLive — Spacing Scale
 *
 * Use these tokens for all margin, padding, and gap values.
 * Do NOT use raw pixel numbers inside components.
 */

export const Spacing = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  lg: 16,
  /** 20px */
  xl: 20,
  /** 24px */
  xxl: 24,
  /** 32px */
  '3xl': 32,
  /** 40px */
  '4xl': 40,
  /** 48px */
  '5xl': 48,
  /** 64px */
  '6xl': 64,
} as const;

/** Horizontal screen padding — applied consistently across all screens */
export const SCREEN_PADDING_H = Spacing.lg;

/** Bottom navigation bar height — used for scroll content inset */
export const BOTTOM_NAV_HEIGHT = 72;

export type SpacingToken = keyof typeof Spacing;
