import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * The live WordPress site publishes every URL with a trailing slash
   * (/about-us/, /retail-security-guard-service/). Next.js strips them by
   * default, which would have meant a redirect hop on every existing URL and
   * a mismatch with the canonical tags this site declares.
   */
  trailingSlash: true,

  /**
   * Every image is a local file under /public/media, so no remote patterns
   * are needed. Quality is left at the default of 75.
   */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;