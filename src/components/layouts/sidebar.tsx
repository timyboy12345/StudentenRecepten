import {useCategories} from "@/lib/directus";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import CategoryCard from "@/components/cards/CategoryCard";

export default function Sidebar() {
    const {categories, isError, isLoading} = useCategories();


    return (
        <div>
            <div className='font-serif text-xl'>Welkom bij StudentenRecepten</div>
            <div className='text-sm'>Dit is dé website om goedkope recepten te vinden. Kook je voor jezelf, of voor het
                hele huis? Geen probleem! Met de recepten die je hier vindt ben je altijd goed voorbereid, zonder je
                bankrekening te plunderen.
            </div>

            <div className='font-serif mt-4 text-lg mb-2'>Populaire Categorieën</div>

            {isLoading && <Loader/>}
            {isError && <Error>{isError}</Error>}
            {categories && <div className='grid lg:grid-cols-2 gap-4'>
                {categories.map((category, i) => <CategoryCard hideDescription={true} key={i} category={category}/>)}
            </div>}
        </div>
    )
}
