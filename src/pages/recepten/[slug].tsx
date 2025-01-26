import DirectusImage from "@/components/DirectusImage";
import Head from "next/head";
import Link from "next/link";
import {addReview, getRecipe, Recipe} from "@/lib/directus";
import IngredientList from "@/components/IngredientList";
import RecipeSnippet from "@/components/seo-snippets/RecipeSnippet";
import ReviewCard from "@/components/cards/ReviewCard";
import {useState} from "react";
import Card from "@/components/cards/Card";
import {isLoggedIn} from "@/lib/auth-checker";

function RecipePage({recipe}: { recipe: Recipe }) {
    function toHtml(content: string) {
        return {__html: content}
    }

    // Set the value received from the local storage to a local state
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("3")
    const [submittingReview, setSubmittingReview] = useState(false)

    function submitReview(e: any) {
        e.preventDefault();

        setSubmittingReview(true);

        addReview(stars, review, recipe.id)
            .then((d) => {
                setReview('')
                setStars("3")
                console.log(d)
            })
            .catch((e) => console.error(e))
            .then(() => setSubmittingReview(false))
    }

    return (
        <>
            <Head>
                <title>{recipe.title + ' - Recept - StudentenRecepten'}</title>
                <RecipeSnippet recipe={recipe}/>
            </Head>

            {recipe.image &&
                <div className={''}>
                    <DirectusImage width={843} height={384} tailwindHeight='h-96' image={recipe.image}/>
                    <div className={'text-xs mt-1 opacity-60'}>
                        Afbeeldingen kunnen door AI zijn gegenereerd, onze recepten zijn dat nooit, lees er <Link
                        className={'underline hover:no-underline'} href={'/over-ons'}>hier</Link> meer over.
                    </div>
                </div>
            }

            <div className='mb-4 mt-4'>
                <h1 className='font-serif text-2xl'>{recipe.title}</h1>

                <div
                    className='flex flex-row flex-wrap whitespace-nowrap gap-y-2 gap-x-4 text-red-800 dark:text-red-700 items-center text-sm'>
                    {recipe.servings && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>

                        {recipe.servings} personen
                    </div>}
                    {recipe.cooktime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                        </svg>

                        {recipe.cooktime} min. bereiden
                    </div>}
                    {recipe.oventime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
                        </svg>

                        {recipe.oventime} min. oventijd
                    </div>}
                    {recipe.oventime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>

                        {(recipe.cooktime ?? 0) + (recipe.oventime ?? 0)} min. totaal
                    </div>}
                    {recipe.reviews && recipe.reviews.length > 0 &&
                        <Link href={'#reviews'} className={'flex gap-1 items-center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                            </svg>

                            {/* @ts-ignore */}
                            {(recipe.reviews.reduce((total, next) => total + next.stars, 0) / recipe.reviews.length).toFixed(1)} /
                            5.0
                        </Link>}
                </div>
            </div>

            <div dangerouslySetInnerHTML={toHtml(recipe.content)}
                 className='prose dark:prose-invert max-w-none'/>

            <div className='my-4 mb-8'>
                <IngredientList servings={recipe.servings} ingredients={recipe.ingredients}/>
            </div>

            <div className='border-l-8 border-red-800 dark:border-red-900 my-4 p-4'>
                <h2 className='font-serif text-xl mb-2'>Stappen</h2>
                <div className='my-4 flex flex-col gap-y-2'>
                    {recipe.steps.map((r, i) => <div key={i}>
                        <span className='opacity-60'>{i + 1}.</span> {r.content}
                    </div>)}
                </div>
            </div>

            {recipe.categories.length > 0 && (
                <div className='my-4'>
                    <h2 className='font-serif text-xl mb-2'>Categorieën</h2>
                    <div className='flex flex-row gap-2'>
                        {recipe.categories.map((category, i) => <div key={i}>
                            <Link
                                // @ts-ignore
                                href={'/categorieen/' + category.recipe_categories_id.slug}
                                className={'bg-red-800 border border-red-800 text-white py-1 px-2 hover:bg-transparent hover:text-red-800 transition duration-200'}>
                                {/*@ts-ignore*/}
                                {category.recipe_categories_id.title}
                            </Link>
                        </div>)}
                    </div>
                </div>
            )}

            {recipe.reviews.length > 0 && (
                <div className='my-4' id={'reviews'}>
                    <h2 className='font-serif text-xl'>Reviews</h2>
                    {/* @ts-ignore */}
                    Gemiddeld: {(recipe.reviews.reduce((total, next) => total + next.stars, 0) / recipe.reviews.length).toFixed(1)} /
                    5.0

                    <div className='grid md:grid-cols-2 gap-4 mt-2'>
                        {/* @ts-ignore */}
                        {recipe.reviews.map((review, i) => <ReviewCard review={review} key={i}/>)}
                    </div>
                </div>
            )}

            {isLoggedIn() && <Card>
                <h2>Plaats een review</h2>

                <form className={'flex flex-col gap-4'} onSubmit={submitReview}>
                    <select
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        className={'w-full focus:ring-red-800 focus:border-red-800 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-600 focus:outline-none'}>
                        {["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"].map((s) =>
                            <option value={s} key={s}>{s} sterren</option>
                        )}
                    </select>

                    <textarea
                        value={review}
                        required={true}
                        onChange={(e) => setReview(e.target.value)}
                        className={'w-full focus:ring-red-800 focus:border-red-800 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-600 focus:outline-none'}></textarea>

                    <button type={'submit'}
                            disabled={submittingReview}
                            className={'rounded bg-red-800 text-white inline-block py-2 px-4 hover:bg-red-900 transition duration-100 ' + (submittingReview ? 'opacity-60' : '')}>
                        Review Toevoegen
                    </button>
                </form>
            </Card>}

            {!isLoggedIn() && <div>
                Log in om een review achter te laten
            </div>}
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://data.arendz.nl/items/recipes')
    const posts = await res.json()

    const paths = posts.data.map((post: Recipe) => ({
        params: {slug: post.slug},
    }))

    return {paths, fallback: false}
}

export const getStaticProps = (async (context: any) => {
    const slug = context.params.slug;
    const recipe = await getRecipe(slug);

    return {props: {recipe: recipe}}
})

export default RecipePage
