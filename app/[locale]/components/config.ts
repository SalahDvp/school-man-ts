import {Pathnames} from 'next-intl/navigation';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = 'en' as const;
export const locales = ['en', 'ar'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    ar: '/pathnames'
  },
  "/dashboard": {
    "en": "/dashboard",
    "ar": "/dashboard"
  },
  "/students": {
    "en": "/students",
    "ar": "/students"
  },
  "/teachers": {
    "en":"/teachers",
    "ar": "/teachers"
  },
  "/parents": {
    "en": "/parents",
    "ar":  "/parents"
  },
  "/classes": {
    "en":   "/classes",
    "ar":  "/classes"
  },
  "/billing": {
    "en":   "/billing",
    "ar":   "/billing"
  },
  "/settings": {
    "en":  "/settings",
    "ar":   "/settings"
  },
  "/profile": {
    "en":   "/settings",
    "ar":   "/settings"
  },
  "/settings/level": {
    "en": "/settings/level",
    "ar": "/settings/level"
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;