import Card from "@/components/cards/Card";
import {Ingredient} from "@/lib/directus";

export default function IngredientCard({ingredient, hideDescription = false}: {
    ingredient: Ingredient,
    hideDescription?: boolean
}) {
    return (
        <Card cropType={'contain'}
              title={ingredient.title}
              // image={ingredient.image}
              subtitle='Ingrediënt'
              description={(!hideDescription) ? ingredient.description : undefined}
              link={'/ingredienten/' + ingredient.slug}/>
    )
}
