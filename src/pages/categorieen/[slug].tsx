import {useCategory} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import RecipeCard from "@/components/cards/RecipeCard";
import Loader from "@/components/Loader";
import Head from "next/head";

function Recipe() {
    const router = useRouter()
    const {category, isError, isLoading} = useCategory(router.query.slug)

    if (isError) return (<div>ERROR</div>)
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
