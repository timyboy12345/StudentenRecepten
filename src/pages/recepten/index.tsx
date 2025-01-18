import RecipeCard from '@/components/cards/RecipeCard';
import {useIngredients, useRecipes} from "@/lib/directus";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Head from "next/head";
import {useEffect, useState} from "react";

function RecipesPage() {
    const [selectedIngredients, setIngredients] = useState<string[]>([]);

    // TODO: Fix router query search
    // const router = useRouter()
    // let params = new URL(document.location.toString()).searchParams;
    const [query, setQuery] = useState('');
    const [delayedQuery, setDelayedQuery] = useState('');

    useEffect(() => {
        const timeOutId = setTimeout(() => setDelayedQuery(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const getFilters = () => {
        if (!selectedIngredients) {
            return {}
        }

        const arr: any = selectedIngredients.map((i) => {
            return {
                "ingredients": {
                    "ingredient": {
                        "id": {
                            "_eq": i
                        }
                    }
                }
            }
        })

        if (delayedQuery) {
            arr.push({
                "title": {
                    "_icontains": delayedQuery ?? ''
                }
            })
        }

        return {
            "_and": arr
        }
    }

    const {recipes, isError, isLoading, mutate: reloadRecipes} = useRecipes({filter: getFilters()})
    const {ingredients, isError: ingredientsError, isLoading: ingredientsLoading} = useIngredients({
        sort: 'title'
    })

    function selectIngredient(id: string) {
        const index = selectedIngredients.indexOf(id);

        if (index === -1) {
            setIngredients([...selectedIngredients, id]);
        } else {
            setIngredients(selectedIngredients.filter((i) => i !== id));
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        reloadRecipes();
    }

    return (
        <>
            <Head>
                <title>Alle Recepten - StudentenRecepten</title>
            </Head>

            <h1 className='font-serif text-2xl mt-4 mb-2'>Alle Recepten</h1>

            <form className={'mb-4 flex flex-col gap-2 w-full'} onSubmit={handleSubmit}>
                <div className={'flex flex-row gap-2'}>
                    <input
                        value={query}
                        type='text'
                        placeholder='Zoek naar recepten'
                        className='rounded flex-grow border-gray-200  focus:ring-red-800 focus:border-red-800  dark:bg-gray-800 dark:border-gray-600 focus:outline-none'
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
                </div>

                {ingredientsLoading && <div className={'h-32 w-full bg-gray-100 dark:bg-gray-800 animate-pulse'}>
                </div>}
                {ingredients &&
                    <div
                        className={'flex flex-col gap-y-1 max-h-32 overflow-y-auto border dark:border-gray-700 border-gray-100 px-4 py-2 text-sm'}>
                        {ingredients.map((ing, i) =>
                            <div className={'flex flex-row gap-1 items-center'}
                                 key={i}
                            >
                                <input onChange={() => selectIngredient(ing.id)}
                                       checked={selectedIngredients.includes(ing.id)} type={'checkbox'}
                                       className={'rounded dark:bg-gray-700 dark:border-gray-600 text-red-800'}/>
                                <div className={'cursor-pointer'}
                                     onClick={() => selectIngredient(ing.id)}>{ing.title}</div>
                            </div>)}
                    </div>
                }
            </form>

            {isError && <Error>{JSON.stringify(isError)}</Error>}
            {isLoading && <div className={'my-12'}><Loader/></div>}
            {recipes && <>
                {recipes.length === 0 && <div className={'text-center flex flex-col'}>
                    <h2 className={'font-serif text-lg text-red-800 dark:text-red-700'}>Geen recepten gevonden</h2>
                    <p className={'opacity-60'}>Gebruik andere filters of een andere zoekopdracht</p>
                </div>}
                <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                    {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe}/>)}
                </div>
            </>}
        </>
    )
}

export default RecipesPage
