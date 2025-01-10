import Card from "./Card.tsx";

function RecipeCard({recipe}) {
    return (
        <Card link={'/recepten/' + recipe.slug} title={recipe.title} description={recipe.description} image={recipe.image}/>
    );
};

export default RecipeCard;
