/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		fontFamily: {
			sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace'
			]
		},
		extend: {
			fontFamily: {
				numbers: ['Comfortaa', 'sans-serif']
			},
			animation: {
				blink: 'blink 1s cubic-bezier(0.9, 0, 0, 0.9) infinite 1s',
				springWiggle: 'springWiggle 0.2s cubic-bezier(0, 0.95, 0.25, 1)',
				wordBounce: 'wordBounce 0.25s cubic-bezier(0, 0.5, 0.5, 1) alternate 2'
			},
			keyframes: {
				blink: {
					'50%': { opacity: 0 }
				},
				springWiggle: {
					'0%': {
						transform: 'translateX(-0.14em);'
					},
					'25%': {
						transform: 'translateX(0.1em);'
					},
					'50%': {
						transform: 'translateX(-0.07em);'
					},
					'75%': {
						transform: 'translateX(0.035em);'
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
		}
	},
	plugins: [require('@skeletonlabs/skeleton/tailwind/theme.cjs'), require('@tailwindcss/forms')]
}
