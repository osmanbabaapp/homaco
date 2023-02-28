/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')
const nextTranslate = require('next-translate')

const nextConfig = withPlugins([[nextTranslate, {}]], {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'packagingtemplet.online',
      'osmanbabaworkspace.s3.eu-central-1.amazonaws.com',
    ],
  },
})

module.exports = nextConfig
