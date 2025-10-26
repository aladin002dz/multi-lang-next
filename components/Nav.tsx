'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Nav() {
    const [language, setLanguage] = useState('en')
    const router = useRouter()
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value)
        router.push(`/${e.target.value}`)
    }
    return (
        <header className="flex justify-between items-center p-4">
            <h1>Multi Language Nex.js</h1>
            <nav className="flex items-center gap-2">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <div className="flex items-center gap-2">
                    <label htmlFor="language">Language</label>
                    <select
                        name="language"
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-background text-foreground border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                    >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>
            </nav>
        </header>
    )
}
