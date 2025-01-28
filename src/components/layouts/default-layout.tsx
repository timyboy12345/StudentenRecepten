import Navigation from "@/components/layouts/navigation";
import Sidebar from "@/components/layouts/sidebar";
import Head from "next/head";
import Footer from "@/components/layouts/footer";

export default function Layout({children}: { children: any }) {

    return (
        <>
            <Head>
                <title>StudentenRecepten</title>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"/>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <meta name="apple-mobile-web-app-title" content="StudentenRecepten"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ae150d'/>

                <meta name="apple-mobile-web-app-title" content="StudentenRecepten"/>
                <meta name='msapplication-TileColor' content='#ae150d'/>
                <meta name="theme-color" content="#ae150d"/>

                {/* TODO: Fix dark-mode theme-color, this now seems to take over all theme colors in iOS */}
                {/*<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#4c0703"/>*/}
            </Head>

            <Navigation/>

            <div className='mx-4 sm:mx-8 md:container md:mx-auto mt-4 md:mt-8 mb-4'>
                <div className='grid gap-8 md:grid-cols-3'>
                    <main className='md:col-span-2'>{children}</main>

                    <Sidebar/>
                </div>

                <div className={'my-8'}>
                    <Footer/>
                </div>
            </div>
        </>
    )
}
