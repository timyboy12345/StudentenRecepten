import RecipeCard from '@/components/cards/RecipeCard';
import {useRecipes} from "@/lib/directus";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";

function Recipes() {
    const {recipes, isError, isLoading} = useRecipes()

    return (
        <>
            <Head>
                <title>Alle Recepten - StudentenRecepten</title>
            </Head>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Recepten</h1>

            {isError && <Error>{isError}</Error>}
            {isLoading && <Loader/>}
            {recipes && <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
            </div>}
        </>
    )
}

export default Recipes
