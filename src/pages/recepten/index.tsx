import RecipeCard from '@/components/cards/RecipeCard';
import {Recipe, useRecipes} from "@/lib/directus";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import {useState} from "react";

function RecipesPage() {
    const {recipes, isError, isLoading} = useRecipes()

    // TODO: Fix router query search
    // const router = useRouter()
    // let params = new URL(document.location.toString()).searchParams;
    const [query, setQuery] = useState('');

    function handleSubmit(e: any) {
        e.preventDefault();
    }

    const filteredRecipes = (): Recipe[] => {
        return recipes ? recipes.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())) : []
    }

    return (
        <>
            <Head>
                <title>Alle Recepten - StudentenRecepten</title>
            </Head>

            <h1 className='font-serif text-2xl mb-4 mt-4'>Alle Recepten</h1>

            {isError && <Error>{isError}</Error>}
            {isLoading && <Loader/>}
            {recipes && <>
                <form className={'mb-4 flex flex-row gap-2 w-full'} onSubmit={handleSubmit}>
                    <input
                        value={query}
                        type='text'
                        placeholder='Zoek naar recepten'
                        className='rounded flex-grow border-gray-200 focus:outline-none'
                        onChange={e => setQuery(e.target.value)}
                    />

                    <button type={'submit'}
                            className={'px-2 bg-red-800 text-white hover:bg-red-900 transition duration-100 rounded'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                        </svg>
                    </button>
                </form>

                <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                    {filteredRecipes().map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
                </div>
            </>}
        </>
    )
}

export default RecipesPage
