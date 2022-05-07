/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	images: {
		domains: ["i.imgur.com", 'images2.imgbox.com', 'imgur.com', 'live.staticflickr.com', 'farm5.staticflickr.com']
	}
}

module.exports = nextConfig
