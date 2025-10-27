import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * Detects the best matching locale from the Accept-Language header
 * @param acceptLanguageHeader - The Accept-Language header value
 * @returns The best matching locale or null if none found
 */
export function detectLocaleFromHeader(acceptLanguageHeader: string | null): string | null {
    if (!acceptLanguageHeader) return null;

    // Parse the Accept-Language header
    const languages = acceptLanguageHeader
        .split(',')
        .map(lang => {
            const [locale, qValue] = lang.trim().split(';q=');
            return {
                locale: locale.trim(),
                quality: qValue ? parseFloat(qValue) : 1.0
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // First, try to find exact matches
    for (const { locale } of languages) {
        if (hasLocale(routing.locales, locale)) {
            return locale;
        }
    }

    // Then, try to find matches by language code (e.g., 'en-US' -> 'en')
    for (const { locale } of languages) {
        const languageCode = locale.split('-')[0];
        const matchingLocale = routing.locales.find(loc => loc.startsWith(languageCode));
        if (matchingLocale && hasLocale(routing.locales, matchingLocale)) {
            return matchingLocale;
        }
    }

    return null;
}

/**
 * Detects locale from browser's navigator.language (client-side)
 * @returns The best matching locale or null if none found
 */
export function detectLocaleFromNavigator(): string | null {
    if (typeof window === 'undefined') return null;

    const browserLanguage = navigator.language || (navigator as { userLanguage?: string }).userLanguage;
    if (!browserLanguage) return null;

    // Try exact match first
    if (hasLocale(routing.locales, browserLanguage)) {
        return browserLanguage;
    }

    // Try language code match
    const languageCode = browserLanguage.split('-')[0];
    const matchingLocale = routing.locales.find(loc => loc.startsWith(languageCode));

    return matchingLocale || null;
}
