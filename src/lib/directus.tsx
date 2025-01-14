import {createDirectus, readItems, rest} from '@directus/sdk';
import useSWR from "swr";
import * as hash from 'object-hash';
import {PageNotFoundError} from "next/dist/shared/lib/utils";

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
    image: any;
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
        recipe_categories_id: Category | string;
        id: string;
    }[];
    servings: number;
    cooktime: number;
    oventime: number;
}

type RecipeIngredient = {
    ingredient: Ingredient;
    amount: number;
    unit: string;
    optional: boolean;
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
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

// @ts-ignore
const categoryFetcher = query => directus
    .request(readItems('recipe_categories',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'recipes.recipes_id.*', 'recipes.recipes_id.image.*'],
            filter: {
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))

// @ts-ignore
const recipesFetcher = query => directus
    .request(readItems('recipes',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'categories.recipe_categories_id.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

// TODO: Disable SWRs revalidateOnFocus

// @ts-ignore
const recipeFetcher = query => directus
    .request(readItems('recipes',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
            filter: {
                ...query.filter,
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))

// @ts-ignore
const ingredientsFetcher = query =>
    directus
        .request(readItems('ingredients',
            {
                sort: query.sort ?? [],
                limit: query.limit ?? -1,
                fields: ['*', 'image.*'],
                filter: {
                    ...query.filter
                }
            }))

// @ts-ignore
const ingredientFetcher = (slug) => directus
    .request(readItems('ingredients',
        {
            fields: ['*', 'image.*'],
            filter: {
                'slug': slug
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))


function useCategories(query = {}) {
    const {data, error, isLoading} = useSWR<Category[]>('recipe_categories', () => categoriesFetcher(query))

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


function useRecipes(query = {}) {
    const {data, error, isLoading} = useSWR<Recipe[]>('recipes_' + hash(query), () => recipesFetcher(query))

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

function useIngredients(query = {}) {
    const {data, error, isLoading} = useSWR<Ingredient[]>('ingredients_' + hash(query), () => ingredientsFetcher(query))

    return {
        ingredients: data,
        isLoading,
        isError: error
    }
}

function useIngredient(slug) {
    const {
        data,
        error,
        isLoading
    } = useSWR<Ingredient>('ingredient_' + slug, () => ingredientFetcher(slug))

    return {
        ingredient: data,
        isLoading,
        isError: error
    }
}

async function getCategory(slug) {
    // @ts-ignore
    return await directus
        .request(readItems('recipe_categories',
            {
                fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'recipes.recipes_id.*', 'recipes.recipes_id.image.*'],
                filter: {
                    'slug': slug
                }
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Categorie niet gevonden");
        });
}

async function getIngredient(slug) {
    // @ts-ignore
    return await directus
        .request(readItems('ingredients',
            {
                fields: ['*', 'image.*'],
                filter: {
                    'slug': slug
                }
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Ingredient niet gevonden");
        });
}

async function getRecipe(slug) {
    // @ts-ignore
    return await directus
        .request(readItems('recipes',
            {
                fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
                filter: {
                    'slug': slug
                },
                limit: 1
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Recept niet gevonden");
        });
}

export {directus, Recipe, Category, useRecipe, useRecipes, useCategories, useCategory, useIngredients, useIngredient, getCategory, getRecipe, getIngredient};
