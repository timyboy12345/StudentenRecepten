import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */

    output: 'export',

    // TODO: REMOVE THIS
    typescript: {
        // ignoreBuildErrors: true
    },

    // TODO: REMOVE THIS
    eslint: {
        ignoreDuringBuilds: true
    },

    images: {
        unoptimized: true
    }
};

export default nextConfig;
