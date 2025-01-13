import Card from "@/components/cards/Card";

export default function IngredientCard({ingredient, hideDescription = false}) {
    return (
        <Card cropType={'contain'}
              title={ingredient.title}
              // image={ingredient.image}
              subtitle='Ingrediënt'
              description={(!hideDescription) ? ingredient.description : null}
              link={'/ingredienten/' + ingredient.slug}/>
    )
}
