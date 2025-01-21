import {RecipeIngredient} from "@/lib/directus";

export function alterIngredientAmount(recipeIngredient: RecipeIngredient): [string, string] {
    const normalTitle = recipeIngredient.ingredient.title;
    const pluralTitle = recipeIngredient.ingredient.title_plural ?? normalTitle;

    if (recipeIngredient.unit === 'empty') {
        if (recipeIngredient.amount > 1) {
            return [recipeIngredient.amount.toString(), pluralTitle];
        }

        switch (recipeIngredient.amount) {
            case 0.75:
                return ['3/4', normalTitle];
            case 0.5:
                return ['1/2', normalTitle];
            case 0.25:
                return ['1/4', normalTitle];
            default:
                return [recipeIngredient.amount.toString(), normalTitle];
        }
    }

    return [`${recipeIngredient.amount} ${recipeIngredient.unit}`, normalTitle];
}
