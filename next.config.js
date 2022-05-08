/** @type {import('next').NextConfig} */

const farm = Array.from({length: 10}, (v, k) => k).map(i => (`farm${i}.staticflickr.com`))
const domains = [
	"i.imgur.com", 'images2.imgbox.com', 'imgur.com', 'live.staticflickr.com',
	...farm
]

const nextConfig = {
  reactStrictMode: true,
	images: {
		domains: domains
	}
}

module.exports = nextConfig
