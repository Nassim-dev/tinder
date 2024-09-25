import { createTamagui } from '@tamagui/core'

const config = createTamagui({
  themes: {
    light: {
      background: 'rgba(106,12,12,1)',
      primary: '#6200ee',
      secondary: '#03dac6',
      error: '#b00020',
      text: '#12D5B1FF',
    },
  },
  tokens: {
    size: {
      small: 12,
      medium: 16,
      large: 24,
    },
  },
  shorthands: {
    br: 'borderRadius',
    p: 'padding',
    m: 'margin',
  },
});

export default config;
