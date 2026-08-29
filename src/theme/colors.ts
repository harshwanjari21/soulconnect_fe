/**
 * ConsultLive — Centralized Color Tokens
 *
 * Exact palette as per product design specification.
 * Do NOT hardcode hex values inside components.
 */

export const Colors = {
  // ── Core Backgrounds ─────────────────────────────────────────────────
  /** Primary warm ivory background */
  backgroundPrimary: '#FCF8F1',
  /** Soft cream — alternative warm surface */
  backgroundCream: '#F5EEDF',
  /** Pure white — cards, surfaces, inputs */
  backgroundWhite: '#FFFFFF',

  // ── Typography ───────────────────────────────────────────────────────
  /** Deep Plum — primary text, headings */
  textPrimary: '#4A234D',
  /** Soft Plum — secondary emphasis text */
  textSoftPlum: '#76527A',
  /** Muted slate — secondary UI text */
  textSecondary: '#6F7480',
  /** Tertiary / caption */
  textTertiary: '#9CA3AE',

  // ── Brand — Primary Action ────────────────────────────────────────────
  /** ConsultLive primary teal */
  teal: '#168C83',
  /** Teal lighter tint — pressed states */
  tealLight: '#1BA99E',
  /** Soft teal — backgrounds and highlights */
  tealSoft: '#DCEFEA',

  // ── Brand — Celestial / Astrology ─────────────────────────────────────
  /** Warm gold — celestial emphasis */
  gold: '#D7A64A',
  /** Soft gold background */
  goldSoft: '#F8EBCF',

  // ── Supporting Pastels — tile backgrounds ─────────────────────────────
  /** Soft peach — Relationships, Promo */
  peach: '#F8DDD2',
  /** Soft lavender — Personal Growth */
  lavender: '#EEE7F5',
  /** Soft sage — Home & Family, Vastu */
  sage: '#E4EFE8',
  /** Very soft sky — Life Decisions */
  sky: '#DFF0FA',

  // ── Semantic Icon Accent Colors ───────────────────────────────────────
  /** Coral — Relationships icon */
  accentCoral: '#C85D45',
  /** Forest — Home, Vastu icons */
  accentForest: '#2E7A50',
  /** Violet — Personal Growth, Astrology icons */
  accentViolet: '#6B50A0',
  /** Amber — Money/Finance icon */
  accentAmber: '#A07020',
  /** Ocean — Life Decisions icon */
  accentOcean: '#2570A0',

  // ── Structure ─────────────────────────────────────────────────────────
  /** Standard border */
  border: '#EDE8E0',
  /** Very subtle border */
  borderSubtle: '#F3EEE8',

  // ── Status ───────────────────────────────────────────────────────────
  online: '#28B062',
  offline: '#C2CCD8',

  // ── Navigation ───────────────────────────────────────────────────────
  navActive: '#168C83',
  navInactive: '#A0A8B2',
  navBackground: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof Colors;
