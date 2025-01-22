import {getRecipeCount, getRecipes, Recipe, useCategories} from "@/lib/directus";
import RecipeCard from "@/components/cards/RecipeCard";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Head from "next/head";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import CategoryCard from "@/components/cards/CategoryCard";

function Index({recipes, recipeCount}: { recipes: Recipe[], recipeCount: number }) {
    const categories = useCategories({limit: 6})

    const router = useRouter()
    const [query, setQuery] = useState('');

    const handleSearchSubmit = (d: any) => {
        d.preventDefault();
        router.push('/recepten?query=' + query);
    }

    return (
        <>
            <Head>
                <title>StudentenRecepten - Goedkope recepten voor elke student</title>
            </Head>
            <div className='text-center my-16'>
                <h1 className='font-serif text-2xl'>Welkom bij StudentenRecepten</h1>
                <p className='opacity-60'>Wat ga jij vandaag eten?</p>

                <form onSubmit={handleSearchSubmit}>
                    <input
                        value={query}
                        type='text'
                        placeholder={'Zoek tussen onze ' + recipeCount + ' recepten'}
                        className='w-full md:w-8/12 mt-4 focus:ring-red-800 focus:border-red-800 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-600 focus:outline-none'
                        onChange={e => setQuery(e.target.value)}
                    />
                </form>
            </div>

            <div className={'grid gap-6'}>
                {recipes && <>
                    <h2 className={'font-serif text-lg -mb-4'}>Populaire Studentenrecepten</h2>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
                    </div>

                    <Link
                        className={'underline hover:no-underline text-gray-600 dark:text-gray-400 text-right -mt-4 text-sm block'}
                        href={'/recepten'}>Bekijk alle Recepten</Link>
                </>}

                {categories.isError && <Error>{JSON.stringify(categories.isError)}</Error>}
                {categories.isLoading && <Loader/>}

                {categories.categories && <>
                    <h2 className={'font-serif text-lg -mb-4'}>Populaire Categorieën</h2>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {categories.categories.map((category, i) => <CategoryCard key={i} category={category}/>)}
                    </div>

                    <Link
                        className={'underline hover:no-underline text-gray-600 dark:text-gray-400 text-right -mt-4 text-sm block'}
                        href={'/categorieen'}>Bekijk alle Categorieën</Link>
                </>}
            </div>
        </>
    )
}

export const getStaticProps = (async (context: any) => {
    const recipes = await getRecipes({
        limit: 6
    });

    const recipeCount = await getRecipeCount();

    return {props: {recipes: recipes, recipeCount: recipeCount}}
})

export default Index
