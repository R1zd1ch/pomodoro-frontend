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
					300: '#c4c4c4',
					400: '#a8a8a8',
					500: '#8c8c8c',
					600: '#707070',
					700: '#545454',
					800: '#383838',
					900: '#1c1c1c',
				},
				bg: {
					50: '#faf9fc',
					100: '#241b35',
					200: '#342a45',
					300: '#4d425f',
					400: '#635776',
					500: '#7a6c8e',
					600: '#9488a8',
					700: '#afa3c2',
					800: '#cbc0db',
					900: '#e6dcf5',
				},
				success: {
					100: '#d1f7c4',
					200: '#a3eb8a',
					300: '#76de50',
					400: '#4bd122',
					500: '#34b512',
					600: '#26920e',
					700: '#19700a',
					800: '#0d4e06',
					900: '#032d02',
				},
				warning: {
					100: '#fff5cc',
					200: '#ffeb99',
					300: '#ffe066',
					400: '#ffd633',
					500: '#ffcc00',
					600: '#cca300',
					700: '#997a00',
					800: '#665200',
					900: '#332900',
				},
				error: {
					100: '#ffccd1',
					200: '#ff99a3',
					300: '#ff6675',
					400: '#ff3347',
					500: '#ff001a',
					600: '#cc0015',
					700: '#990010',
					800: '#66000b',
					900: '#330006',
				},
			},
		},
	},
	plugins: [],
	// safelist: [
	// 	{
	// 		pattern:
	// 			/(bg|text|border)-s2cond(Purple|Pink|Orange|Yellow|Lime|Mint|Test|Test2)/,
	// 	},
	// ],
}
