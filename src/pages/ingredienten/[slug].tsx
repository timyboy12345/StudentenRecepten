import {useIngredient, useRecipes} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import Link from "next/link";
import RecipeCard from "@/components/cards/RecipeCard";

function Recipe() {
    const router = useRouter()
    const {ingredient, isError, isLoading} = useIngredient(router.query.slug)
    const {recipes, isError: isRecipesError, isLoading: isRecipesLoading} = useRecipes({
        'filter': {
            "ingredients": {
                "ingredient": {
                    "slug": {
                        "_eq": router.query.slug
                    }
                }
            }
        }
    })

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
    if (!ingredient) return (<Loader/>)

    function toHtml(content: string) {
        return {__html: content}
    }

    return (
        <>
            <Head>
                <title>{ingredient.title} - Ingrediënt - StudentenRecepten</title>
            </Head>

            {ingredient.image &&
                <DirectusImage width='850' height='360' tailwindHeight='h-64' image={ingredient.image}/>}
            <div className='mb-4 mt-4'>
                <h1 className='font-serif text-2xl'>{ingredient.title}</h1>
            </div>

            <p dangerouslySetInnerHTML={toHtml(ingredient.content)} className='prose max-w-none'/>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Recepten met dit ingrediënt</h1>

            {isRecipesError && <Error>{isRecipesError}</Error>}
            {isRecipesLoading && <Loader/>}
            {recipes && <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
            </div>}

            {JSON.stringify(isRecipesError)}
        </>
    )
}

export default Recipe
