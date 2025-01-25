import Link from "next/link";

export default function Footer() {
    return <div className="py-4 text-gray-600 dark:text-gray-400 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-1 flex flex-col">
                <h3 className="text-lg font-serif">Over StudentenRecepten.com</h3>
                <p>StudentenRecepten.com is dé Nederlandstalige website met goedkope, lekkere en simpele recepten voor
                    studenten, maar ook zeker voor iedereen die niet al te veel wil uitgeven voor een goede
                    maaltijd.</p>
            </div>

            <div className="flex flex-col">
                <div className={'font-serif'}>Handige Links</div>
                <Link className="underline hover:no-underline" href="/over-ons">Over Ons</Link>
                <Link className="underline hover:no-underline" href="/over-ons">Contact</Link>
                <Link className="underline hover:no-underline" href="/recepten">Alle Recepten</Link>
                <Link className="underline hover:no-underline" href="/categorieen">Alle Categorieën</Link>
                <Link className="underline hover:no-underline" href="/ingredienten">Alle Ingrediënten</Link>
            </div>

            <div className="flex flex-col">
                <div className={'font-serif'}>Onze Andere Projecten</div>
                <a className="underline hover:no-underline" target={'_blank'} href="https://drankidee.nl/">Drankidee.nl</a>
                <a className="underline hover:no-underline" target={'_blank'} href="https://arendz.nl/">Arendz.nl</a>
                <a className="underline hover:no-underline" target={'_blank'} href="https://mc-heads.com/">MC-Heads.com</a>
            </div>
        </div>

        <div className="mt-2">
            Gemaakt met ❤️ door Tim - <a className="underline hover:no-underline text-gray-800 dark:text-gray-200" target="_blank"
                                         href="https://arendz.nl/?utm_source=drankidee&amp;utm_medium=backlink">Arendz.nl</a>
        </div>
    </div>
}
