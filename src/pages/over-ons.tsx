import Head from "next/head";
import Link from "next/link";

function AboutUs() {
    return (
        <>
            <Head>
                <title>Over Ons - StudentenRecepten - Goedkope recepten voor elke student</title>
            </Head>
            <div className='text-center my-16'>
                <h1 className='font-serif text-2xl'>Over Ons</h1>
                <p className='opacity-60'>Jij wilt natuurlijk weten wie wij zijn</p>
            </div>

            <div className={'grid gap-4'}>
                <article>
                    <h2 className={'text-lg font-serif'}>Wie zijn wij?</h2>
                    <p className={'opacity-60'}>
                        Wij zijn allemaal studenten, die het zat zijn om elke week weer het internet af te moeten
                        struinen om goede recepten te vinden, maar ook niet elke week hetzelfde willen eten. Daarom
                        hebben we StudentenRecepten.com ontwikkeld, een site voor en door studenten, met goedkope,
                        makkelijke recepten die je gewoon zelf, in je studentenhuis of -kamer, kan maken.
                    </p>
                    <p className={'opacity-60 mt-2'}>
                        De website is ontwikkeld door Tim, een Computing-Science student die er enkele hobby-projectjes
                        op nahoudt. Wil je meer van zijn projecten zien? Ga dan naar <Link
                        className={'underline hover:no-underline'} href={'https://arendz.nl'}
                        target={'_blank'}>arendz.nl</Link> om meer over hem, en zijn websites, te leren.
                    </p>
                </article>
                <article>
                    <h2 className={'text-lg font-serif'}>Ons gebruik van AI</h2>
                    <p className={'opacity-60'}>
                        Elke student gebruikt wel eens AI, daar zijn wij geen uitzondering op. We maken je wel één
                        belofte: we zullen nooit AI gebruiken om recepten te genereren (van ingrediënten tot stappen),
                        en lopen altijd elk stuk tekst woord voor woord na. We maken elk gerecht ook minimaal 1x zelf,
                        zodat je er zeker van kan zijn dat een recept lekker is. Om een consistente uitstraling te
                        hebben gebruiken we wel vaak AI-gegenereerde afbeeldingen, maar die zien er over het algemeen
                        ook wat gelikter uit dan foto's uit een gemiddelde studentenkeuken.
                    </p>
                </article>
                <article>
                    <h2 className={'text-lg font-serif'}>Hoe neem ik contact op?</h2>
                    <p className={'opacity-60 mb-2'}>
                        Misschien heb jij wel een overheerlijk recept dat je met ons wilt delen, heb je opmerkingen over
                        een recept dat al op de site staat, of heb je een vraag. Je kan heel makkelijk contact met ons
                        opnemen, via info@studentenrecepten.com.
                    </p>

                    <p className={'opacity-60'}>
                        Zo hebben we laatst op verzoek van een mede-student de website ook dark-mode compatible gemaakt,
                        zodat je in een donker studentenhuis niet naar een fel wit telefoonscherm hoeft te kijken. Dat
                        zouden meer recepten-websites moeten doen!
                    </p>
                </article>
            </div>
        </>
    )
}

export default AboutUs
