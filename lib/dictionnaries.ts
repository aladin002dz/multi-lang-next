export interface Dictionary {
    home: {
        title: string;
        description: string;
    };
    about: {
        title: string;
        description: string;
    };
    contact: {
        title: string;
        description: string;
    };
    language: {
        title: string;
        en: string;
        fr: string;
        ar: string;
    };
}

const dictionaries = {
    en: () => import('@/dictionnaries/en.json').then((module) => module.default),
    fr: () => import('@/dictionnaries/fr.json').then((module) => module.default),
    ar: () => import('@/dictionnaries/ar.json').then((module) => module.default),
}

// Server-side function (for use in server components)
export const getDictionary = async (locale: 'en' | 'fr' | 'ar'): Promise<Dictionary> =>
    dictionaries[locale]()

// Client-side function (for use in client components)
export const getDictionaryClient = async (locale: 'en' | 'fr' | 'ar'): Promise<Dictionary> => {
    return await dictionaries[locale]()
}