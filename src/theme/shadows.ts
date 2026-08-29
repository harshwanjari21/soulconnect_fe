/**
 * ConsultLive — Shadow Presets
 *
 * Cross-platform shadow styles for React Native.
 * iOS uses shadow* props; Android uses elevation.
 */
import { Platform } from 'react-native';

const ios = (
  color: string,
  offsetY: number,
  radius: number,
  opacity: number,
) =>
  Platform.OS === 'ios'
    ? { shadowColor: color, shadowOffset: { width: 0, height: offsetY }, shadowRadius: radius, shadowOpacity: opacity }
    : {};

const android = (elevation: number) =>
  Platform.OS === 'android' ? { elevation } : {};

export const Shadows = {
  /** Very subtle — search bars, input fields */
  xs: {
    ...ios('#3F2940', 1, 4, 0.06),
    ...android(1),
  },
  /** Subtle — tiles, small cards */
  sm: {
    ...ios('#3F2940', 2, 8, 0.08),
    ...android(2),
  },
  /** Medium — expert cards, prominent surfaces */
  md: {
    ...ios('#3F2940', 4, 12, 0.1),
    ...android(4),
  },
  /** Large — modals, bottom sheets */
  lg: {
    ...ios('#3F2940', 8, 20, 0.12),
    ...android(8),
  },
} as const;

export type ShadowToken = keyof typeof Shadows;
