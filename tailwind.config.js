/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'brand-light': ['Hind_300Light'],
        'brand-regular': ['Hind_400Regular'],
        'brand-medium': ['Hind_500Medium'],
        'brand-semibold': ['Hind_600SemiBold'],
        'brand-bold': ['Hind_700Bold'],
      },
      colors: {
        brand: {
          blue: {
            primary: '#6AADEB',
            secondary: '#5A95CC',
          },
          green: {
            primary: '#8BC653',
            secondary: '#78A245',
          },
          red: '#DA6359',
          gray: '#E0E0E0',
        },
        streak: {
          achieved: '#F19537',
          missed: '#AFAFAF',
          waiting: '#E0E0E0',
        },
      },
    },
  },
  plugins: [],
};
