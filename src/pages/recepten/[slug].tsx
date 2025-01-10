import {usePage} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";

function Recipe() {
    const router = useRouter()
    const {recipe, isError, isLoading} = usePage(router.query.slug)

    if (isError) return (<div>ERROR</div>)
    if (isLoading) return (<div>LOADING</div>)
    if (!recipe) return (<div>ERROR 2</div>)

    function toHtml(cont) {
        return {__html: cont}
    }

    return (
        <>
            {recipe.image && <DirectusImage height='h-64' image={recipe.image}/>}
            <h1 className='font-serif text-2xl mb-4 mt-4'>{recipe.title}</h1>
            <p dangerouslySetInnerHTML={toHtml(recipe.content)} className='text-gray-600'/>

            <div className='border-l-8 border-red-800 my-4 p-4'>
                <h2 className='font-serif text-xl mb-2'>Ingrediënten</h2>

                {recipe.ingredients.map((object, i) => <div className='whitespace-nowrap' key={i}>
                    <div className='inline-block text-red-900 text-right min-w-16 mr-1'>{object.amount} {object.unit}</div>
                    {object.ingredient.title}
                </div>)}
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
