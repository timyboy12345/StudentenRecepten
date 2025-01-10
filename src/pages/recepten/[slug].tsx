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
            {recipe.image && <DirectusImage image={recipe.image}/>}
            <h1 className='font-bold text-2xl mb-4 mt-4'>{recipe.title}</h1>
            <p dangerouslySetInnerHTML={toHtml(recipe.content)} className='text-gray-600'/>
        </>
    )
}

export default Recipe
