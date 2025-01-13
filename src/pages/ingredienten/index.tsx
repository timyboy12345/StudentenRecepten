import {useIngredients} from "@/lib/directus";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import IngredientCard from "@/components/cards/IngredientCard";

function Recipes() {
    const {ingredients, isError, isLoading} = useIngredients({sort: ['title'], filter: {'content': {'_nnull': true}}})

    return (
        <>
            <Head>
                <title>Alle Ingrediënten - StudentenRecepten</title>
            </Head>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Ingrediënten</h1>

            {isError && <Error>{isError}</Error>}
            {isLoading && <Loader/>}
            {ingredients && <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                {ingredients.map((ingredient, i) => <IngredientCard key={i} ingredient={ingredient}/>)}
            </div>}
        </>
    )
}

export default Recipes
