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
			height: {
				main: 'calc(100% - 5rem)'
			},
			minHeight: {
				main: 'calc(100% - 5rem)'
			},
			fontFamily: {
        'DIN': ['DIN'],
				'DIN-bold': ['DIN Bold'],
      },
			backgroundImage: {
				'bg1': "url('/images/bg1.png')",
				'bg2': "url('/images/bg2.png')",
				'bg3': "url('/images/bg3.png')",
				// 'rocket': "url('/images/bg-rocket.jpg')",
				// 'launchpad': "url('/images/bg-launchpad.png')",
				// 'landpad': "url('/images/bg-landpad.jpg')",
				// 'crew': "url('/images/bg-crew.jpg')"
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