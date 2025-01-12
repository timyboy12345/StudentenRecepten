import {useRecipe} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import {alterIngredientAmount} from "@/lib/ingredients";

function Recipe() {
    const router = useRouter()
    const {recipe, isError, isLoading} = useRecipe(router.query.slug)

    if (isError) return (<Error>{isError}</Error>)
    if (isLoading) return (<Loader/>)

    // TODO: Fix the weird error between having loaded the item and returning the item
    if (!recipe) return (<Loader/>)

    function toHtml(content: string) {
        return {__html: content}
    }

    return (
        <>
            <Head>
                <title>{recipe.title} - Recept - StudentenRecepten</title>
            </Head>

            {recipe.image && <DirectusImage width='850' height='360' tailwindHeight='h-64' image={recipe.image}/>}
            <div className='mb-4 mt-4'>
                <h1 className='font-serif text-2xl'>{recipe.title}</h1>

                <div className='flex flex-row gap-4 text-red-800 items-center text-sm'>
                    {recipe.servings && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>

                        {recipe.servings} personen
                    </div>}
                    {recipe.cooktime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                        </svg>

                        {recipe.cooktime} min. bereiden
                    </div>}
                    {recipe.oventime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
                        </svg>

                        {recipe.oventime} min. oventijd
                    </div>}
                    {recipe.oventime && <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>

                        {(recipe.cooktime ?? 0) + (recipe.oventime ?? 0)} min. totaal
                    </div>}
                </div>
            </div>

            <p dangerouslySetInnerHTML={toHtml(recipe.content)} className='text-gray-600'/>

            <div className='my-4 mb-8'>
                <div className='px-4 border-l-8 border-red-800'>
                    <h2 className='font-serif text-xl mb-2'>Ingrediënten</h2>

                    {recipe.ingredients.filter((o) => !o.optional).map((object, i) => <div
                        className='whitespace-nowrap' key={i}>
                        <div className='inline-block text-red-900 text-right min-w-16 mr-1'>
                            {alterIngredientAmount(object.unit, object.amount)}</div>
                        {object.ingredient.title}
                    </div>)}
                </div>

                {recipe.ingredients.filter((o) => o.optional).length > 0 &&
                    <div
                        className='px-4 border-l-8 border-red-800 border-opacity-60 opacity-60 hover:opacity-100 transition duration-100'>
                        <h2 className='font-serif text-xl mb-2 mt-4'>Optionele Ingrediënten</h2>
                        {recipe.ingredients.filter((o) => o.optional).map((object, i) => <div
                            className='whitespace-nowrap' key={i}>
                            <div className='inline-block text-red-900 text-right min-w-16 mr-1'>
                                {alterIngredientAmount(object.unit, object.amount)}</div>
                            {object.ingredient.title}
                        </div>)}
                    </div>
                }
            </div>

            <div className='border-l-8 border-red-800 my-4 p-4'>
                <h2 className='font-serif text-xl mb-2'>Stappen</h2>
                <div className='border-red-800 my-4'>
                    {recipe.steps.map((object, i) => <div key={i}>
                        <span className='opacity-60'>{i + 1}.</span> {object.content}
                    </div>)}
                </div>
            </div>

            {/*{JSON.stringify(recipe)}*/}
        </>
    )
}

export default Recipe
