import {Recipe, RecipeIngredient, Step} from "@/lib/directus";
import {alterIngredientAmount} from "@/lib/ingredients";

export default function RecipeSnippet({recipe}: { recipe: Recipe }) {
    function ingredient(i: RecipeIngredient) {
        return alterIngredientAmount(i).join(' ');
    }

    function step(i: Step, order: number) {
        return {
            "@type": "HowToStep",
            "text": i.content,
            "url": `https://studentenrecepten.com/${recipe.slug}#step-${i.order ?? order}`,
            // "image": "https://example.com/photos/non-alcoholic-pina-colada/step3.jpg"
        };
    }

    function addRecipeLd() {
        return {
            // TODO: Implement all images, once this is used more widely
            // @ts-ignore
            __html: `{
                "@context": "https://schema.org/",
                "@type": "Recipe",
                "name": "${recipe.title}",
                "image": ${JSON.stringify(recipe.image ? [`https://data.arendz.nl/assets/${recipe.image.id}`] : [])},
                "author": {
                    "@type": "Person",
                    "name": "Tim Arendsen"
                },
                "datePublished": "${recipe.date_created}",
                "description": "${recipe.description}",
                "cookTime": "${recipe.cooktime}",
                "recipeYield": "${recipe.servings} personen",
                "recipeCategory": "Dinner",
                "recipeIngredient": ${JSON.stringify(recipe.ingredients.map(ingredient))},
                "recipeInstructions": ${JSON.stringify(recipe.steps.map((s, i) => step(s, i)))},
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": ${recipe.reviews.length > 0 ? (recipe
                .reviews
                // @ts-ignore
                .reduce((total, next) => total + next.stars, 0) / recipe.reviews.length) : null},
                  "ratingCount": ${recipe.reviews.length}
                }
            }`
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addRecipeLd()}
            key="recipe-jsonld"
        />)
}
