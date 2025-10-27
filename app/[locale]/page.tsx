
import { getTranslations } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> & Promise<{ locale: string }> }) {
  const { locale } = await params;

  //const t = await getTranslations({ locale: locale, namespace: 'HomePage' });
  const t = await getTranslations('HomePage');
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl mx-auto flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Current language: {locale}
        </p>
      </main>
    </div>
  );
}
