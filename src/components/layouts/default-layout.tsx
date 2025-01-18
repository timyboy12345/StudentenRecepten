import Navigation from "@/components/layouts/navigation";
import Sidebar from "@/components/layouts/sidebar";
import Head from "next/head";

export default function Layout({children}: {children: any}) {

    return (
        <>
            <Head>
                <title>StudentenRecepten</title>
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='96x96'
                    href='/favicon-96x96.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest'/>
                <link
                    rel='icon'
                    href='/favicon.svg'
                    type='image/svg+xml'
                    sizes='any'
                />
                <link
                    rel='mask-icon'
                    href='/safari-pinned-tab.svg'
                    color='#ae150d'
                />
                <meta name="apple-mobile-web-app-title" content="StudentenRecepten"/>
                <link rel='shortcut icon' href='/favicon.ico'/>
                <meta name='msapplication-TileColor' content='#ae150d'/>
                <meta name="theme-color" content="#ae150d"/>
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#4c0703"/>
            </Head>

            <Navigation/>

            <div className='mx-4 sm:mx-8 md:container md:mx-auto mt-4 md:mt-8 mb-4'>
                <div className='grid gap-8 md:grid-cols-3'>
                <main className='md:col-span-2'>{children}</main>

                    <Sidebar/>
                </div>
            </div>
        </>
    )
}
