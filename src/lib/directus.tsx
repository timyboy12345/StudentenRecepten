import {createDirectus, readItems, rest} from '@directus/sdk';
import useSWR from "swr";
// @ts-ignore
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
    description: string;
    content: string;
    slug: string;
    image: any;
}

type Recipe = {
    image: any;
    title: string;
    author: Author;
    description: string;
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
    ingredients: Ingredient[];
    categories: Category[];
    global: Global;
}

type Query = {
    filter?: any,
    limit?: number,
    fields?: any[],
    sort?: string[],
}

const directus = createDirectus<Schema>('https://data.arendz.nl').with(rest());

const categoriesFetcher = (query: Query) => directus
    // @ts-ignore
    .request(readItems('recipe_categories',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

const categoryFetcher = (query: Query) => directus
    // @ts-ignore
    .request(readItems('recipe_categories',
        {
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'recipes.recipes_id.*', 'recipes.recipes_id.image.*'],
            filter: {
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))

const recipesFetcher = (query: Query) => directus
    // @ts-ignore
    .request(readItems('recipes',
        {
            // @ts-ignore
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'categories.recipe_categories_id.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

// TODO: Disable SWRs revalidateOnFocus

// @ts-ignore
const recipeFetcher = (query: Query) => directus
    .request(readItems('recipes',
        {
            // @ts-ignore
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
            filter: {
                ...query.filter,
                'slug': query
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))

// @ts-ignore
const ingredientsFetcher = (query: Query) =>
    directus
        .request(readItems('ingredients',
            {
                // @ts-ignore
                sort: query.sort ?? [],
                limit: query.limit ?? -1,
                // @ts-ignore
                fields: ['*', 'image.*'],
                filter: {
                    ...query.filter
                }
            }))

// @ts-ignore
const ingredientFetcher = (slug) => directus
    .request(readItems('ingredients',
        {
            // @ts-ignore
            fields: ['*', 'image.*'],
            filter: {
                'slug': slug
            }
        }))
    .then((res) => res.length > 0 ? res[0] : Promise.reject(404))


function useCategories(query = {}) {
    // @ts-ignore
    const {data, error, isLoading} = useSWR<Category[]>('recipe_categories', () => categoriesFetcher(query))

    return {
        categories: data,
        isLoading,
        isError: error
    }
}

function useCategory(slug: string) {
    // @ts-ignore
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

function useRecipe(slug: string) {
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

function useIngredient(slug: string) {
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

async function getCategory(slug: string) {
    return await directus
        // @ts-ignore
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

async function getIngredient(slug: string) {
    // @ts-ignore
    return await directus
        .request(readItems('ingredients',
            {
                // @ts-ignore
                fields: ['*', 'image.*'],
                filter: {
                    // @ts-ignore
                    'slug': slug
                }
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Ingredient niet gevonden");
        });
}

async function getRecipe(slug: string) {
    // @ts-ignore
    return await directus
        .request(readItems('recipes',
            {
                // @ts-ignore
                fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
                filter: {
                    // @ts-ignore
                    'slug': slug
                },
                limit: 1
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Recept niet gevonden");
        });
}

// @ts-ignore
export {directus, Recipe, Ingredient, Category, useRecipe, useRecipes, useCategories, useCategory, useIngredients, useIngredient, getCategory, getRecipe, getIngredient};
