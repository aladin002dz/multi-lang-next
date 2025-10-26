'use client'
import { Dictionary, getDictionaryClient } from "@/lib/dictionnaries";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
    const router = useRouter()
    const pathname = usePathname()

    // Extract language from pathname (e.g., /fr -> fr, /en -> en, /ar -> ar)
    const getCurrentLanguage = () => {
        const segments = pathname.split('/').filter(Boolean)
        const lang = segments[0]
        return (lang === 'fr' || lang === 'ar') ? lang : 'en'
    }

    const currentLanguage = getCurrentLanguage()
    const [dictionary, setDictionary] = useState<Dictionary | null>(null)

    useEffect(() => {
        const loadDictionary = async () => {
            const dict = await getDictionaryClient(currentLanguage as 'en' | 'fr' | 'ar')
            setDictionary(dict)
        }
        loadDictionary()
    }, [currentLanguage])

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`/${e.target.value}`)
    }

    if (!dictionary) {
        return (
            <header className="flex justify-between items-center p-4">
                <h1>Multi Language Next.js</h1>
                <div>Loading...</div>
            </header>
        )
    }

    return (
        <header className="flex justify-between items-center p-4">
            <h1>Multi Language Next.js</h1>
            <nav className="flex items-center gap-2">
                <Link href="/">{dictionary.home.title}</Link>
                <Link href="/about">{dictionary.about.title}</Link>
                <Link href="/contact">{dictionary.contact.title}</Link>
                <div className="flex items-center gap-2">
                    <label htmlFor="language">{dictionary.language.title}</label>
                    <select
                        name="language"
                        id="language"
                        value={currentLanguage}
                        onChange={handleLanguageChange}
                        className="bg-background text-foreground border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                    >
                        <option value="en">{dictionary.language.en}</option>
                        <option value="fr">{dictionary.language.fr}</option>
                        <option value="ar">{dictionary.language.ar}</option>
                    </select>
                </div>
            </nav>
        </header>
    )
}
