/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");

const nextConfig = withPlugins([[nextTranslate, {}]], {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["images.unsplash.com", "packagingtemplet.online"],
  },
});

module.exports = nextConfig;
