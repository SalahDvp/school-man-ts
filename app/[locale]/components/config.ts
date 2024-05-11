import {Pathnames} from 'next-intl/navigation';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = 'fr' as const;
export const locales = ['en', 'ar','fr'] as const;

export const pathnames = {
  '/': '/',
  "/dashboard": {
    "en": "/dashboard",
    "ar": "/dashboard",
    "fr":"/dashboard"
  },
  "/students": {
    "en": "/students",
    "ar": "/students",
    "fr":"/students"
  },
  "/teachers": {
    "en":"/teachers",
    "ar": "/teachers",
    "fr":"/teachers"
  },
  "/parents": {
    "en": "/parents",
    "ar":  "/parents",
    "fr":"/parents"
  },
  "/classes": {
    "en":   "/classes",
    "ar":  "/classes",
    "fr":"/classes"
  },
  "/billing": {
    "en":   "/billing",
    "ar":   "/billing",
    "fr":"/billing"
  },
  "/settings": {
    "en":  "/settings",
    "ar":   "/settings",
    "fr":"/settings"
  },
  "/students2": {
    "en":  "/students2",
    "ar":   "/students2",
    "fr":"/students2"
  },
  "/profile": {
    "en":   "/settings",
    "ar":   "/settings",
    "fr":"/settings"
  },
  "/settings/level": {
    "en": "/settings/level",
    "ar": "/settings/level",
    "fr":"/settings/level"
  },
  "/Auth": {
    "en":  "/Auth",
    "ar":   "/Auth",
    "fr":"/Auth"
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;