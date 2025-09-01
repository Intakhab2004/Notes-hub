import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	api: {
		bodyParser: {
			sizeLimit: "30mb"
		}
	},
	
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.resolve.alias.canvas = false; // prevent canvas from being required server-side
		}
		return config;
	}
}

export default nextConfig;
