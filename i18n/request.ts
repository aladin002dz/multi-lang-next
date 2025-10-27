import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Get the requested locale from the URL
    const requested = await requestLocale;

    // Check if the requested locale is valid
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../dictionnaries/${locale}.json`)).default
    };
});