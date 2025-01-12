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
    categories: {
        recipe_id: Recipe | String;
        recipe_category_id: Category | string;
        id: string;
    }[]
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

type Category = {
    title: string;
    description: string
    content: string;
    slug: string;
    image: any;
    recipes: {
        id: string;
        recipes_id: Recipe | string;
        recipe_categories_id: Category | string;
    }[]
}

type Schema = {
    recipes: Recipe[];
    global: Global;
    ingredients: Ingredient[];
}

const directus = createDirectus<Schema>('https://data.arendz.nl').with(rest());

// @ts-ignore
const categoriesFetcher = query => directus
    .request(readItems('recipe_categories',
        {fields: ['*', 'image.*', 'steps.*', 'ingredients.*']}))

// @ts-ignore
const categoryFetcher = query => directus
    .request(readItems('recipe_categories',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'recipes.recipes_id.*', 'recipes.recipes_id.image.*'],
            filter: {
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(res))

// @ts-ignore
const recipesFetcher = query => directus
    .request(readItems('recipes',
        {fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'categories.recipe_categories_id.*']}))

// @ts-ignore
const recipeFetcher = query => directus
    .request(readItems('recipes',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
            filter: {
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(res))

function useCategories() {
    const {data, error, isLoading} = useSWR<Category[]>('recipe_categories', categoriesFetcher)

    return {
        categories: data,
        isLoading,
        isError: error
    }
}

function useCategory(slug) {
    const {data, error, isLoading} = useSWR<Category>(slug, categoryFetcher)

    return {
        category: data,
        isLoading,
        isError: error
    }
}


function useRecipes() {
    const {data, error, isLoading} = useSWR<Recipe[]>('recipes', recipesFetcher)

    return {
        recipes: data,
        isLoading,
        isError: error
    }
}

function useRecipe(slug) {
    const {data, error, isLoading} = useSWR<Recipe>(slug, recipeFetcher)

    return {
        recipe: data,
        isLoading,
        isError: error
    }
}

export {directus, Recipe, useRecipe, useRecipes, useCategories, useCategory};
