module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}', 
		'./components/**/*.{js,ts,jsx,tsx}'
	],
  darkMode: false, // or 'media' or 'class'
	content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
			fontFamily: {
        'DIN': ['DIN']
      }
		},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}