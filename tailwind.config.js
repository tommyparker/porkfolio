/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      'blue': '#3e7ec5',
      'yellow': '#f8c03b',
      'red': '#e75f3a',
      'pink': '#f482a7',
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
      screens: {
        'xs': '420px',
      },
      transitionProperty: {
        'height': 'height',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.75,0,.25,1)',
      },
      keyframes: {
        colourCycle: {
          '0%': { fill: '#3e7ec5' },        // blue
          '24.9999%': { fill: '#3e7ec5' },        // blue
          '25%': { fill: '#e75f3a' },       // red
          '49.9999%': { fill: '#e75f3a' },       // red
          '50%': { fill: '#f482a7' },       // pink
          '74.9999%': { fill: '#f482a7' },       // pink
          '75%': { fill: '#f8c03b' },       // yellow
          '100%': { fill: '#f8c03b' },       // yellow
        }
      },
      animation: {
        'colour-cycle': 'colourCycle .3s linear',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

