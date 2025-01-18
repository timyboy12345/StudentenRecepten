import {alterIngredientAmount} from "@/lib/ingredients";
import {useState} from "react";

function IngredientListSection({ingredients}: { ingredients: any[] }) {
    const [ings, setIngs] = useState<string[]>([]);

    function toggleIngredient(e: any, id: string) {
        const index = ings.indexOf(id);

        if (index === -1) {
            setIngs([...ings, id]);
        } else {
            setIngs(ings.filter((i) => i !== id));
        }
    }

    return (
        <>
            {ingredients.map((ingredient, i) =>
                <div
                    className={'cursor-pointer whitespace-nowrap ' + (ings.includes(ingredient.id) ? 'line-through opacity-50' : '')}
                    onClick={(e) => toggleIngredient(e, ingredient.id)} key={i}>
                    <div
                        className={'inline-block text-red-900 dark:text-red-700 text-right min-w-16 mr-1'}>
                        {alterIngredientAmount(ingredient.unit, ingredient.amount)}</div>
                    {ingredient.ingredient.title}
                </div>
            )}
        </>
    )
}

export default function IngredientList({ingredients, servings}: { ingredients: any[], servings?: number }) {
    return (
        <>
            <div className='px-4 border-l-8 border-red-800 dark:border-red-900'>
                <h2 className='font-serif text-xl mb-2'>
                    Ingrediënten {servings && <span className={'opacity-60 text-xs'}>voor {servings} personen</span>}
                </h2>
                <IngredientListSection ingredients={ingredients.filter((o) => !o.optional)}/>
            </div>

            {/* Tip to mark ingredients as complete */}
            <div className={'ml-24 mt-1 opacity-60 text-xs flex flex-row items-center'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-4 mr-1 rotate-[-65deg]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"/>
                </svg>

                <div className={''}>Klik op een ingredient om het af te vinken</div>
            </div>

            {ingredients.filter((o) => o.optional).length > 0 &&
                <div
                    className='px-4 border-l-8 border-red-800 dark:border-red-900 border-opacity-60'>
                    <h2 className='font-serif text-xl mb-2 mt-4'>Optionele Ingrediënten</h2>
                    <IngredientListSection ingredients={ingredients.filter((o) => o.optional)}/>
                </div>
            }
        </>
    )
}
