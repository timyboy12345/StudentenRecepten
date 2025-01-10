// import Navbar from './navbar'
// import Footer from './footer'

import Navigation from "@/components/layouts/navigation";
import Sidebar from "@/components/layouts/sidebar";

export default function Layout({children}) {
    return (
        <>
            <Navigation/>

            <div className='container mx-auto mt-8 mb-4'>
                <div className='grid gap-4 md:grid-cols-3'>
                    <main className='md:col-span-2'>{children}</main>

                    <Sidebar/>
                </div>
            </div>
        </>
    )
}
