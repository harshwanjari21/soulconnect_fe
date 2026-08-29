/**
 * ConsultLive — Typography Scale
 *
 * All text styles must come from this file.
 * Do NOT invent font sizes inside components.
 *
 * Font families:
 *   serif   → editorial titles, section headings
 *   sans    → UI text, descriptions, metadata, buttons
 */
import { Platform, TextStyle } from 'react-native';

// ── Font Families ────────────────────────────────────────────────────────────

export const FontFamilies = Platform.select({
  ios: {
    /** Serif — editorial titles (system "New York" on iOS) */
    serif: 'Georgia',
    /** Sans — all UI text (system -apple-system on iOS) */
    sans: 'System',
  },
  android: {
    serif: 'serif',
    sans: 'sans-serif',
  },
  default: {
    serif: 'Georgia',
    sans: 'System',
  },
});

// ── Type Scale ────────────────────────────────────────────────────────────────

export const Typography: Record<string, TextStyle> = {
  /**
   * Page title — "Discover"
   * Serif, large, editorial
   */
  pageTitle: {
    fontFamily: FontFamilies?.serif,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.3,
  },

  /**
   * Section heading — "Explore practices", "Online Experts"
   * Serif, bold, editorial
   */
  sectionHeading: {
    fontFamily: FontFamilies?.serif,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.3,
  },

  /**
   * Card title — practitioner name, insight title
   * Sans, medium
   */
  cardTitle: {
    fontFamily: FontFamilies?.sans,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },

  /**
   * Body — main readable text
   * Sans, regular
   */
  body: {
    fontFamily: FontFamilies?.sans,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },

  /**
   * Secondary body — descriptions, subtitles
   * Sans, regular, secondary color
   */
  secondaryBody: {
    fontFamily: FontFamilies?.sans,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },

  /**
   * Metadata — rating, count, price, experience
   * Sans, small
   */
  metadata: {
    fontFamily: FontFamilies?.sans,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  /**
   * Label — tile names, category names, badges
   * Sans, medium weight, small
   */
  label: {
    fontFamily: FontFamilies?.sans,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  },

  /**
   * Button — CTA labels
   * Sans, semi-bold
   */
  button: {
    fontFamily: FontFamilies?.sans,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  /**
   * Navigation label — bottom tab labels
   * Sans, medium
   */
  navLabel: {
    fontFamily: FontFamilies?.sans,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },

  /**
   * Caption — smallest readable size
   * Sans, regular
   */
  caption: {
    fontFamily: FontFamilies?.sans,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },

  /**
   * Hero subtitle — "Astrology, guidance & trusted experts."
   * Sans, regular
   */
  heroSubtitle: {
    fontFamily: FontFamilies?.sans,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  /**
   * Price — consultation rate
   * Sans, bold
   */
  price: {
    fontFamily: FontFamilies?.sans,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
} as const;
