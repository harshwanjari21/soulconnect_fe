/**
 * ConsultLive — Centralized Color Tokens
 *
 * All color values for the application must come from this file.
 * Do NOT hardcode hex values inside components.
 */

export const Colors = {
  // ── Core backgrounds ─────────────────────────────────────────────────
  /** Primary warm ivory background */
  backgroundPrimary: '#FCF8F1',
  /** Pure white — cards, surfaces */
  backgroundWhite: '#FFFFFF',

  // ── Text ─────────────────────────────────────────────────────────────
  /** Primary text — deep plum (editorial) */
  textPrimary: '#3F2940',
  /** Secondary text — muted slate */
  textSecondary: '#6F7480',
  /** Tertiary / caption text */
  textTertiary: '#9CA3AE',

  // ── Brand — Primary Action ────────────────────────────────────────────
  /** ConsultLive primary teal */
  teal: '#168C83',
  /** Teal lighter tint */
  tealLight: '#1BA99E',
  /** Soft teal — backgrounds, highlights */
  tealSoft: '#E8F5F3',

  // ── Brand — Celestial/Astrology ───────────────────────────────────────
  /** Astrology gold */
  gold: '#D7A64A',
  /** Soft gold — backgrounds */
  goldSoft: '#FBF3E2',

  // ── Pastel Tile Backgrounds — intentionally very soft ─────────────────
  /** Very soft blush — Relationships */
  peach: '#FCF0EB',
  /** Very soft lavender — Personal Growth */
  lavender: '#F5F1FB',
  /** Very soft sage — Home, Career */
  sage: '#EDF5EF',
  /** Very soft champagne — Money */
  cream: '#FBF5E6',
  /** Very soft sky — Life Decisions */
  sky: '#ECF6FC',
  /** Very soft rose — alternate */
  rose: '#FCF0F0',

  // ── Icon accent colors — richer than tile bgs, pairs with pastel ──────
  /** Warm coral — Relationships icon */
  accentCoral: '#C85D45',
  /** Forest teal — Career, Sage items */
  accentForest: '#2E7A50',
  /** Deep lavender — Personal Growth */
  accentViolet: '#6B50A0',
  /** Warm amber — Money/Finance */
  accentAmber: '#A07020',
  /** Ocean blue — Life Decisions */
  accentOcean: '#2570A0',

  // ── Structure ─────────────────────────────────────────────────────────
  /** Border / divider */
  border: '#EDE8E0',
  /** Very subtle border */
  borderSubtle: '#F3EEE8',

  // ── Status ───────────────────────────────────────────────────────────
  /** Online availability */
  online: '#28B062',
  /** Offline */
  offline: '#C2CCD8',

  // ── Navigation ───────────────────────────────────────────────────────
  navActive: '#168C83',
  navInactive: '#A0A8B2',
  navBackground: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof Colors;
