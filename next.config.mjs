/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "workshop.webopsagency.com",
            },
        ],
    },
};

export default nextConfig;
