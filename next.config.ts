import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.resolve.alias.canvas = false; // prevent canvas from being required server-side
		}
		return config;
	}
}

export default nextConfig;
