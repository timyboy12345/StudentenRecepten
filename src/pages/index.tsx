import { usePages} from "@/lib/directus";
import RecipeCard from "@/components/cards/RecipeCard";

function Index() {
    const {recipes, isError, isLoading} = usePages()

    if (isError) return (<div>ERROR</div>)
    if (isLoading) return (<div>LOADING</div>)

    return (
        <>
            <h1 className='mb-8 font-bold text-2xl'>Welkom</h1>
            <div className='grid grid-cols-2 lg:grid-cols-4'>
                {recipes.map((object, i) => <RecipeCard key={i} recipe={object}/>)}
            </div>
        </>
    )
}

export default Index
