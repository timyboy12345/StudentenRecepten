import {useRecipes} from "@/lib/directus";
import RecipeCard from "@/components/cards/RecipeCard";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Head from "next/head";
import {useState} from "react";
import {useRouter} from "next/router";

function Index() {
    const {recipes, isError, isLoading} = useRecipes()

    const router = useRouter()
    const [query, setQuery] = useState('');

    const handleSearchSubmit = (d) => {
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
                        placeholder='Zoek naar recepten'
                        className='w-full md:w-8/12 mt-4 rounded border-gray-200 focus:outline-none'
                        onChange={e => setQuery(e.target.value)}
                    />
                </form>
            </div>

            {isError && <Error>{JSON.stringify(isError)}</Error>}
            {isLoading && <Loader/>}

            {recipes && <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
            </div>}
        </>
    )
}

export default Index
