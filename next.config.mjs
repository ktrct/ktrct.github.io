// @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
// @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // No basePath needed for username.github.io repos
  // No assetPrefix needed for username.github.io repos
  images: {
    unoptimized: true,
  },
};

export default nextConfig;