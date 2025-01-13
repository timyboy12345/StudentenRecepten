import {useCategory} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import RecipeCard from "@/components/cards/RecipeCard";
import Loader from "@/components/Loader";
import Head from "next/head";
import Link from "next/link";
import Error from "@/components/Error";

function Recipe() {
    const router = useRouter()
    const {category, isError, isLoading} = useCategory(router.query.slug)

    if (isError) return (isError === 404 ? <div className={'text-center my-8'}>
        <h1 className={'text-2xl font-serif text-red-800'}>Recept niet gevonden</h1>
        <p>Heb je de URL goed getypt, of heb je een ongeldige link gevolgd?</p>
        <div className={'flex gap-4 justify-center mt-8'}>
            <Link className={'underline hover:no-underline'} href={'/'}>Home</Link>
            <Link className={'underline hover:no-underline'} href={'/recepten'}>Alle Recepten</Link>
        </div>
    </div> : <Error>{isError}</Error>)
    if (isLoading) return (<Loader/>)

    // TODO: Fix the weird error between having loaded the item and returning the item
    if (!category) return (<Loader/>)

    function toHtml(cont) {
        return {__html: cont}
    }

    return (
        <>
            <Head>
                <title>{category?.title} - Categorie - StudentenRecepten</title>
            </Head>

            {category.image && <DirectusImage width='850' height='350' tailwindHeight='h-64' image={category.image}/>}
            <h1 className='font-serif text-2xl mb-2 mt-4'>{category.title}</h1>
            <p dangerouslySetInnerHTML={toHtml(category.content)} className='prose max-w-none'/>

            <h2 className='font-serif text-xl mt-4 mb-2'>Recepten in deze categorie</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {category.recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe.recipes_id}/>)}
            </div>

            {/*{JSON.stringify(category)}*/}
        </>
    )
}

export default Recipe
