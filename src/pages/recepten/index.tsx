import RecipeCard from '@/components/cards/RecipeCard';
import {useRecipes} from "@/lib/directus";
import Error from "@/components/Error";
import Loader from "@/components/Loader";

function Recipes() {
    const {recipes, isError, isLoading} = useRecipes()

    return (
        <>
            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Recepten</h1>

            {isError && <Error>{isError}</Error>}
            {isLoading && <Loader/>}
            {recipes && <div className='grid grid-cols-2 lg:grid-cols-4'>
                {recipes.map((object, i) => <RecipeCard key={i} recipe={object}/>)}
            </div>}
        </>
    )
}

export default Recipes
