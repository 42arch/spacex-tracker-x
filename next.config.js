/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const farm = Array.from({length: 10}, (v, k) => k).map(i => (`farm${i}.staticflickr.com`))
const domains = [
	"i.imgur.com", 'images2.imgbox.com', 'imgur.com', 'live.staticflickr.com',
	...farm
]

const nextConfig = {
	i18n,
  reactStrictMode: true,
	images: {
		domains: domains
	}
}

module.exports = nextConfig
