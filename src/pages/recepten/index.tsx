import { useState, useEffect} from 'react'

import RecipeCard from '@/components/cards/RecipeCard';
import {usePages} from "@/lib/directus";

function Recipes() {
    const {recipes, isError, isLoading} = usePages()

    if (isError) return (<div>ERROR</div>)
    if (isLoading) return (<div>LOADING</div>)

    return (
        <>
            <div className='grid grid-cols-2 lg:grid-cols-4'>
                {recipes.map((object, i) => <RecipeCard key={i} recipe={object}/>)}
            </div>
        </>
    )
}

export default Recipes
