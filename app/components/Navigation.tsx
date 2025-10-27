'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
    { code: 'en', name: 'English', letter: 'En' },
    { code: 'fr', name: 'Français', letter: 'Fr' },
    { code: 'ar', name: 'العربية', letter: 'ع' }
];

export default function Navigation() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLanguageChange = (newLocale: string) => {
        // Remove the current locale from the pathname
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        // Navigate to the new locale
        router.push(`/${newLocale}${pathWithoutLocale}`);
        setIsDropdownOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            MyApp
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a
                                href={`/${locale}`}
                                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {t('home')}
                            </a>
                            <a
                                href={`/${locale}/about`}
                                className="text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {t('about')}
                            </a>
                            <a
                                href={`/${locale}/contact`}
                                className="text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {t('contact')}
                            </a>
                        </div>
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <span className="text-lg font-bold">{currentLanguage.letter}</span>
                            <span>{currentLanguage.name}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => handleLanguageChange(language.code)}
                                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language.code === locale
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <span className="text-lg font-bold">{language.letter}</span>
                                        <span>{language.name}</span>
                                        {language.code === locale && (
                                            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-800">
                    <a
                        href={`/${locale}`}
                        className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        {t('home')}
                    </a>
                    <a
                        href={`/${locale}/about`}
                        className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        {t('about')}
                    </a>
                    <a
                        href={`/${locale}/contact`}
                        className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        {t('contact')}
                    </a>
                </div>
            </div>
        </nav>
    );
}
