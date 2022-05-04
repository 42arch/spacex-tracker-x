module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}', 
		'./components/**/*.{js,ts,jsx,tsx}'
	],
  darkMode: 'media', // or 'media' or 'class'
	content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
			fontFamily: {
        'DIN': ['DIN'],
				'DIN-bold': ['DIN Bold'],
      },
			backgroundImage: {
				'bg1': "url('/images/bg1.png')",
				'bg2': "url('/images/bg2.png')"
			},
			boxShadow: {
				slide: 'inset 10rem 0 0 0 #ffffff'
			}
		},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}