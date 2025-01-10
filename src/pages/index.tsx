import { usePages} from "@/lib/directus";
import RecipeCard from "@/components/cards/RecipeCard";

function Index() {
    const {recipes, isError, isLoading} = usePages()

    if (isError) return (<div>ERROR</div>)
    if (isLoading) return (<div>LOADING</div>)
    if (!recipes) return (<div>ERROR 2</div>)

    return (
        <>
            <div className='text-center my-16'>
                <h1 className='font-serif text-2xl'>Welkom bij StudentenRecepten</h1>
                <p className='opacity-60'>Wat ga jij vandaag eten?</p>

                <input type='text' placeholder='Zoek naar recepten' className='w-8/12 mt-4 rounded border-gray-200 focus:outline-none'/>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4'>
                {recipes.map((object, i) => <RecipeCard key={i} recipe={object}/>)}
            </div>
        </>
    )
}

export default Index
