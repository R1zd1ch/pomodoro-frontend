/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ['./app/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto-Regular', 'sans-serif'],
				'roboto-bold': ['Roboto-Bold', 'sans-serif'],
				'roboto-extrabold': ['Roboto-ExtraBold', 'sans-serif'],
				'roboto-medium': ['Roboto-Medium', 'sans-serif'],
				'roboto-semibold': ['Roboto-Semibold', 'sans-serif'],
				'roboto-light': ['Roboto-Light', 'sans-serif'],
			},
			colors: {
				primary: {
					100: '#6c35de',
					200: '#a364ff',
					300: '#ffc7ff',
				},
				accent: {
					100: '#cb80ff',
					200: '#373737',
				},
				text: {
					100: '#ffffff',
					200: '#e0e0e0',
				},
				bg: {
					100: '#241b35',
					200: '#342a45',
					300: '#4d425f',
				},
			},
		},
	},
	plugins: [],
}
