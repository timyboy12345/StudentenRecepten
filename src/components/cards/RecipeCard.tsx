import Card from "@/components/cards/Card";
import {Recipe} from "@/lib/directus";

function RecipeCard({recipe}: { recipe: Recipe }) {
    return (
        <Card link={'/recepten/' + recipe.slug} subtitle={recipe.cooktime ? recipe.cooktime + 'm kooktijd' : undefined}
              title={recipe.title} description={recipe.description} image={recipe.image}/>
    );
}

export default RecipeCard;
