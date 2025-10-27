'use client';

import { detectLocaleFromNavigator } from '@/i18n/locale-detection';
import { routing } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LocaleDetectorProps {
    currentLocale: string;
}

export default function LocaleDetector({ currentLocale }: LocaleDetectorProps) {
    const router = useRouter();

    useEffect(() => {
        // Only run on client side and if we're on the default locale
        if (currentLocale === routing.defaultLocale) {
            const detectedLocale = detectLocaleFromNavigator();

            if (detectedLocale && detectedLocale !== currentLocale) {
                // Redirect to the detected locale
                router.replace(`/${detectedLocale}`);
            }
        }
    }, [currentLocale, router]);

    return null; // This component doesn't render anything
}
