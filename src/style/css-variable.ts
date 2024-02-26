/**
 * 전역 색상 변수 (css var)
 */

export const globalColor = {
  mainColor: '#0445af',
  subColor: '#20399E',
  gray: {
    '50': '#F9FAFB',
    '100': '#F3F4F6',
    '200': '#E5E7EB',
    '300': '#D1D5DB',
    '400': '#9CA3AF',
    '500': '#6B7280',
    '600': '#4B5563',
    '700': '#374151',
    '800': '#1F2937',
    '900': '#111827',
  },
  red: {
    '50': '#fef2f2',
    '100': '#fee2e2',
    '200': '#fecaca',
    '300': '#fca5a5',
    '400': '#f87171',
    '500': '#ef4444',
    '600': '#dc2626',
    '700': '#b91c1c',
  },
} as const;

export type GlobalColor = typeof globalColor;

export const display = {
  tablet: '768px',
} as const;

export const zIndex = {
  nav: 10,
} as const;
