import Navigation from "@/components/layouts/navigation";
import Sidebar from "@/components/layouts/sidebar";

export default function Layout({children}) {

    return (
        <>
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
