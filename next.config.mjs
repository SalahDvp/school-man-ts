/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default withPWA(withNextIntl(nextConfig));
