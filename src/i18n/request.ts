import { hasLocale, IntlErrorCode } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

type Messages = Record<string, string>;

function reportToErrorTracking(error: unknown) {
  console.error('Report to tracking system:', error);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)) as { default: Messages };

  return {
    locale,
    messages: messages.default,

    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error('Missing translation:', error);
      } else {
        reportToErrorTracking(error);
      }
    },

    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter(Boolean).join('.');
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`;
      } else {
        return `Developer, please fix this message: ${path}`;
      }
    },
  };
});
