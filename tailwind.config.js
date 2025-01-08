/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'yellow': '#ffc82c',
      'paper': '#fdfcf7',
      'black': '#0f0f0f',
      'ink': {
        50: '#e5e4df',
        100: '#d9d8d4',
        200: '#cdccc8',
        300: '#b6b5b1',
        400: '#868583',
        500: '#6e6e6c',
        600: '#565655',
        700: '#3f3e3d',
        800: '#333332',
        900: '#272727',
        950: '#1b1b1b',
      },
    },
    fontFamily: {
      sans: ['Athletics', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

