/** @type {import('next').NextConfig} */
const API_URL = 'https://ast.prd.karvi.com.ar';
const nextConfig = { async rewrites() { return [ { source: '/api/:path*', destination: `${API_URL}/:path*`, }, ]; }, };

export default nextConfig;
