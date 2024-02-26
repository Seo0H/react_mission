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
} as const;

export type GlobalColor = typeof globalColor;

export const display = {
  tablet: '768px',
} as const;

export const zIndex = {
  nav: 10,
} as const;
