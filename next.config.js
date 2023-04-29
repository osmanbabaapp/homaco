/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");

const nextConfig = withPlugins([[nextTranslate, {}]], {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	env: {
		AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
		AWS_REGION: process.env.AWS_REGION,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	},
	images: {
		domains: [
			"images.unsplash.com",
			"packagingtemplet.online",
			"osmanbabaworkspace.s3.eu-central-1.amazonaws.com",
		],
	},
});

module.exports = nextConfig;
