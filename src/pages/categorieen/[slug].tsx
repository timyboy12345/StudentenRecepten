import {useCategory} from "@/lib/directus";
import {useRouter} from "next/router";
import DirectusImage from "@/components/DirectusImage";
import RecipeCard from "@/components/cards/RecipeCard";
import Loader from "@/components/Loader";

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
            {category.image && <DirectusImage height='h-64' image={category.image}/>}
            <h1 className='font-serif text-2xl mb-2 mt-4'>{category.title}</h1>
            <p dangerouslySetInnerHTML={toHtml(category.content)} className='text-gray-600'/>

            <h2 className='font-serif text-xl mt-4 mb-2'>Recepten in deze categorie</h2>
            <div className='grid grid-cols-2 lg:grid-cols-4'>
                {category.recipes.map((object, i) => <RecipeCard key={i} recipe={object.recipes_id}/>)}
            </div>

            {/*{JSON.stringify(category)}*/}
        </>
    )
}

export default Recipe
