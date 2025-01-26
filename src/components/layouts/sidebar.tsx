import {useCategories, useIngredients} from "@/lib/directus";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import CategoryCard from "@/components/cards/CategoryCard";
import Link from "next/link";
import IngredientCard from "@/components/cards/IngredientCard";

export default function Sidebar() {
    const {categories, isError, isLoading} = useCategories({limit: 6});
    const ingredients = useIngredients({filter: {'featured': {'_eq': 'true'}}});

    return (
        <div>
            <div className='font-serif text-xl'>Welkom bij StudentenRecepten</div>
            <div className='text-sm'>Dit is dé website om goedkope recepten te vinden. Kook je voor jezelf, of voor het
                hele huis? Geen probleem! Met de recepten die je hier vindt ben je altijd goed voorbereid, zonder je
                bankrekening te plunderen.
            </div>

            <div className='font-serif mt-4 text-lg mb-2'>Populaire Categorieën</div>

            {isLoading && <Loader/>}
            {isError && <Error>{JSON.stringify(isError)}</Error>}
            {categories && <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
                {categories.map((category, i) => <CategoryCard hideDescription={true} key={i} category={category}/>)}
            </div>}

            <div className='font-serif mt-4 text-lg'>Over Ons</div>
            <div className='text-sm mb-2'>Student zijn is al moeilijk genoeg, je moet wassen, huishouden, op stap en dan
                ook nog koken! Veel te veel gedoe natuurlijk allemaal. Daarom heb ik, <Link
                    className={'underline hover:no-underline text-red-800 dark:text-red-700'} target={'blank'}
                    href={'https://arendz.nl/?utm_source=studentenrecepten&utm_medium=backlink'}>Tim</Link>, zelf al
                bijna 8 jaar student,
                een lijst samengesteld met de lekkerste studentenrecepten. Je zoekt zo makkelijk een goedkoop, snel en
                lekker recept dat je vanavond nog kan maken.
            </div>
            <div className='text-sm'>De lijst met recepten wordt nog steeds aangevuld en verbeterd, dus kijk regelmatig
                tussen <Link className={'underline hover:no-underline text-red-800 dark:text-red-700'} href={'/recepten'}>alle
                    recepten</Link> om jouw volgende favoriete recept te vinden.
            </div>

            <div className='font-serif mt-4 text-lg mb-2'>Populaire Ingrediënten</div>

            {ingredients.isLoading && <Loader/>}
            {ingredients.isError && <Error>{JSON.stringify(ingredients.isError)}</Error>}
            {ingredients.ingredients && <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
                {ingredients.ingredients.slice(0, 8).map((ingredient, i) =>
                    <IngredientCard hideDescription={true} key={i} ingredient={ingredient}/>)}
            </div>}
        </div>
    )
}
