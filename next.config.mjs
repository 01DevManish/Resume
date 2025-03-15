/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Exclude source maps of chrome-aws-lambda
      config.module.rules.push({
        test: /\.map$/,
        include: /node_modules\/chrome-aws-lambda/,
        use: 'ignore-loader',
      });
      return config;
    },
  };
  
  export default nextConfig;
  