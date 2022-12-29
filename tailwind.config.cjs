/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.9, 0, 0, 0.9) infinite'
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [require("daisyui")],
}
