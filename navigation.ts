// navigation.ts

import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'de','ar'] as const; // this can be imported from elsewhere
export const localePrefix = 'always'; // Default

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
