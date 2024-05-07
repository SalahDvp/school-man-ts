'use client';
 
import {NextIntlClientProvider, useMessages} from 'next-intl';
 
export default function MyCustomNextIntlClientProvider({
children,locale
}) {
  const messages=useMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      </NextIntlClientProvider>
  );
}