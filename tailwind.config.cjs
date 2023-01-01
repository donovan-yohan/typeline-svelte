/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.9, 0, 0, 0.9) infinite 1s',
        'springWiggle': 'springWiggle 0.2s cubic-bezier(0, 0.95, 0.25, 1)',
        'wordBounce': 'wordBounce 0.25s cubic-bezier(0, 0.5, 0.5, 1) alternate 2'
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 },
        },
        springWiggle: {
          '0%': {
            transform: 'translateX(-0.1em);'
          },
          '25%': {
            transform: 'translateX(0.08em);'
          },
          '50%': {
            transform: 'translateX(-0.06em);'
          },
          '75%': {
            transform: 'translateX(0.03em);'
          },
          '100%': {
            transform: 'translateX(0);'
          }
        },
        wordBounce: {
          '0%': {
            transform: 'translateY(0)'
          },
          '100%': {
            transform: 'translateY(-0.2em)'
          }
        }
      }
    },
  },
  plugins: [require('daisyui')],
}
