import {getIngredient, useRecipes} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import RecipeCard from "@/components/cards/RecipeCard";
import Link from "next/link";

function IngredientPage({ingredient}: { ingredient: any }) {
    const router = useRouter()

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

    // TODO: Fix the weird error between having loaded the item and returning the item
    if (!ingredient) return (<Loader/>)

    function toHtml(content: string) {
        return {__html: content}
    }

    return (
        <>
            <Head>
                <title>{ingredient.title + ' - Ingrediënt - StudentenRecepten'}</title>
            </Head>

            {ingredient.parent && <div className={'text-sm opacity-60 flex flex-row items-center gap-2'}>
                <Link href={'/ingredienten'}>Ingrediënten</Link>
                {ingredient.parent.parent && <>
                    &gt;
                    <Link
                        href={'/ingredienten/' + ingredient.parent.parent.slug}>{ingredient.parent.parent.title}</Link>
                </>}
                &gt;
                <Link href={'/ingredienten/' + ingredient.parent.slug}>{ingredient.parent.title}</Link>
                &gt;
                <Link href={'/ingredienten/' + ingredient.slug}>{ingredient.title}</Link>
            </div>}

            {ingredient.image &&
                <DirectusImage width={850} height={360} tailwindHeight='h-64' image={ingredient.image}/>}
            <div className='mb-4 mt-4'>
                <h1 className='font-serif text-2xl'>{ingredient.title}</h1>
            </div>

            <div dangerouslySetInnerHTML={toHtml(ingredient.content)} className='prose dark:prose-invert max-w-none'/>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Recepten met dit ingrediënt</h1>

            {isRecipesError && <Error>{JSON.stringify(isRecipesError)}</Error>}
            {isRecipesLoading && <Loader/>}
            {recipes && <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
            </div>}
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://data.arendz.nl/items/ingredients')
    const posts = await res.json()

    const paths = posts.data.map((ingredient: any) => ({
        params: {slug: ingredient.slug},
    }))

    return {paths, fallback: false}
}

export const getStaticProps = (async (context: any) => {
    const slug = context.params.slug;
    const ingredient = await getIngredient(slug);

    return {props: {ingredient: ingredient}}
})

export default IngredientPage
