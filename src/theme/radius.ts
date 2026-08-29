/**
 * ConsultLive — Border Radius Tokens
 *
 * Define reusable corner-radius values for all surfaces.
 */

export const Radius = {
  /** 4px — small controls, chips */
  xs: 4,
  /** 8px — input fields, small tiles */
  sm: 8,
  /** 12px — cards, tiles */
  md: 12,
  /** 16px — large cards */
  lg: 16,
  /** 20px — prominent cards, panels */
  xl: 20,
  /** 24px — large surfaces, modals */
  '2xl': 24,
  /** 999px — pills, badges, circular buttons */
  pill: 999,
  /** Circular — avatar images */
  full: 999,
} as const;

export type RadiusToken = keyof typeof Radius;
