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
      },
			backgroundImage: {
				'bg1': "url('/images/bg1.png')",
				'bg2': "url('/images/bg2.png')"
			}
		},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}