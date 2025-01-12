import {useCategories} from "@/lib/directus";
import CategoryCard from "@/components/cards/CategoryCard";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Head from "next/head";

function Recipes() {
    const {categories, isError, isLoading} = useCategories()

    if (isError) return (<Error>{isError}</Error>)
    if (isLoading) return (<Loader/>)

    return (
        <>
            <Head>
                <title>Alle Categorieën - StudentenRecepten</title>
            </Head>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Categorieën</h1>
            {categories && <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {categories.map((object, i) => <CategoryCard key={i} category={object}/>)}
            </div>}
        </>
    )
}

export default Recipes
