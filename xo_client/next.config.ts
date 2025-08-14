import type { NextConfig } from "next";

module.exports = {
    // ... rest of the configuration.
    output: "standalone",
};

const nextConfig: NextConfig = {
    devIndicators: false,
};

export default nextConfig;
