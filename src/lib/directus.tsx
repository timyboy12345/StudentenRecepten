import {createDirectus, readItems, rest} from '@directus/sdk';
import useSWR from "swr";

type Global = {
    title: string;
    description: string;
}

type Author = {
    name: string
}

type Ingredient = {
    title: string;
    content: string;
    slug: string;
}

type Recipe = {
    image: any;
    title: string;
    author: Author;
    content: string;
    published_date: string
    slug: string;
    ingredients: RecipeIngredient[];
    steps: Step[];
}

type RecipeIngredient = {
    ingredient: Ingredient;
    amount: number;
    unit: string;
}

type Step = {
    image: any;
    content: string;
}

type Schema = {
    recipes: Recipe[];
    global: Global;
    ingredients: Ingredient[];
}

const directus = createDirectus<Schema>('https://data.arendz.nl').with(rest());

const recipesFetcher = query => directus
    .request(readItems('recipes',
        {fields: ['*', 'image.*', 'steps.*', 'ingredients.*']}))

const recipeFetcher = query => directus
    .request(readItems('recipes',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*'],
            filter: {
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(res))


function usePages() {
    const {data, error, isLoading} = useSWR('recipes', recipesFetcher)

    return {
        recipes: data,
        isLoading,
        isError: error
    }
}

function usePage(slug) {
    const {data, error, isLoading} = useSWR<Recipe>(slug, recipeFetcher)

    return {
        recipe: data,
        isLoading,
        isError: error
    }
}

export {directus, Recipe, usePage, usePages};
