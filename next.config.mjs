// @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
// @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
// @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ktrct.github.io", // Change this to match your exact repository name
  assetPrefix: "/ktrct.github.io", // Add this line
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

