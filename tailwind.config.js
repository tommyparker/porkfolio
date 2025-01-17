/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      'blue': '#3e7ec5',
      'yellow': '#f8c03b',
      'red': '#e75f3a',
      'pink': '#ef6e98',
      'white': '#ffffff',
      'paper': '#f7f4ea',
      'black': '#0e0e0e',
      'ink': {
        50: '#ebe8df',
        100: '#d4d1c9',
        200: '#d4d1c9',
        300: '#b1afa8',
        400: '#83817c',
        500: '#6b6a66',
        600: '#545350',
        700: '#3d3c3a',
        800: '#32312f',
        900: '#262625',
        950: '#1a1a19',
      },
    },
    fontFamily: {
      sans: ['Athletics', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

