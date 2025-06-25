// @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
// @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;