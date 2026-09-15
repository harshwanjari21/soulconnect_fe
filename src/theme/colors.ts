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

  // ── Deep Cosmos Backgrounds — Practice tiles ──────────────────────────
  /** Deep Plum — Astrology */
  cosmosPlum: '#2A1635',
  /** Dark Crimson — Tarot */
  cosmosCrimson: '#3A1616',
  /** Deep Amber — Palmistry */
  cosmosAmber: '#3A2A12',
  /** Midnight Forest — Vastu */
  cosmosForest: '#122D22',
  /** Deep Navy — Numerology */
  cosmosNavy: '#14203A',
  /** Dark Ocean — Healing */
  cosmosOcean: '#122F3D',

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

  // ── Extended Semantic Tokens (Proctor cleanup) ──────────────────────
  /** Soft coral background — cancelled badges, destructive-lite chips */
  coralSoft: '#FDECEA',
  /** Border for coralSoft surfaces */
  coralBorder: '#F5C6C2',
  /** Destructive / recording-live red */
  danger: '#E53E3E',
  /** Soft danger background — badges */
  dangerSoft: '#FFE8E8',
  /** Soft danger background — cards */
  dangerSoftAlt: '#FFF0F0',
  /** Border for dangerSoftAlt cards */
  dangerBorder: '#FFD4D4',
  /** Info / notice banner background */
  infoBg: '#E8F7F5',
  /** Info / notice banner border */
  infoBorder: '#C6EBE4',
  /** Verified / success checkmark */
  success: '#22C55E',
  /** Neutral switch-off track (cool gray, distinct from warm border) */
  neutralGray: '#E2E8F0',
  /** Warm cream border variant */
  borderCream: '#EFE6D6',
  /** Soft teal border accent */
  tealBorder: '#BFE4DC',
  /** Soft pink chip background */
  pinkSoft: '#F7EDEC',
  /** Muted label text, distinct shade from textTertiary */
  textMuted: '#8A92A0',
  /** Soft blue border accent */
  borderBlueSoft: '#D4E2F0',
  /** Soft sky background variant — icon wraps */
  skySoft: '#EAF5FF',
  /** Kundli chart cell background */
  chartBackground: '#FFFDF8',
} as const;

export type ColorToken = keyof typeof Colors;
