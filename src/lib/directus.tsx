import {aggregate, createDirectus, DirectusFile, readItems, rest} from '@directus/sdk';
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
    id: string;
    title: string;
    title_plural?: string;
    description: string;
    content: string;
    slug: string;
    image: DirectusFile;
    parent?: Ingredient;
}

type Recipe = {
    image: DirectusFile;
    title: string;
    user_created: string | Author;
    date_created: string;
    user_updated: string | Author;
    date_updated: string;
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
    reviews: string[] | Review[];
}

type RecipeIngredient = {
    ingredient: Ingredient;
    amount: number;
    unit: string;
    optional: boolean;
}

type Step = {
    image: DirectusFile;
    content: string;
    order: number;
}

type Category = {
    title: string;
    description: string
    content: string;
    slug: string;
    image: DirectusFile;
    recipes: {
        id: string;
        recipes_id: Recipe | string;
        recipe_categories_id: Category | string;
    }[]
}

type Review = {
    status: 'review' | 'published' | 'rejected';
    review: string;
    stars: number;
    date_created: string;
    user_created?: string;
}

type Schema = {
    recipes: Recipe[];
    ingredients: Ingredient[];
    recipe_ingredients: RecipeIngredient,
    recipe_categories: Category[];
    global: Global;
}

type Query = {
    filter?: any,
    limit?: number,
    fields?: any[],
    sort?: string[],
}

const directus = createDirectus<Schema>('https://data.arendz.nl').with(rest());

// TODO: Disable SWRs revalidateOnFocus
const categoriesFetcher = (query: Query) => directus
    .request(readItems('recipe_categories',
        {
            // @ts-ignore
            fields: ['*', 'image.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

const recipesFetcher = (query: Query) => directus
    .request(readItems('recipes',
        {
            // @ts-ignore
            fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'categories.recipe_categories_id.*'],
            filter: {
                ...query.filter
            },
            limit: query.limit ?? -1
        }))

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

function useCategories(query = {}) {
    // @ts-ignore
    const {data, error, isLoading, mutate} = useSWR<Category[]>('recipe_categories', () => categoriesFetcher(query))

    return {
        categories: data,
        isLoading,
        isError: error,
        mutate
    }
}

function useRecipes(query = {}) {
    const {data, error, isLoading, mutate} = useSWR<Recipe[]>('recipes_' + hash(query), () => recipesFetcher(query))

    return {
        recipes: data,
        isLoading,
        isError: error,
        mutate
    }
}

function useIngredients(query = {}) {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR<Ingredient[]>('ingredients_' + hash(query), () => ingredientsFetcher(query))

    return {
        ingredients: data,
        isLoading,
        isError: error,
        mutate
    }
}

async function getCategory(slug: string) {
    return await directus
        .request(readItems('recipe_categories',
            {
                // @ts-ignore
                fields: ['*', 'image.*', 'recipes.recipes_id.*', 'recipes.recipes_id.image.*'],
                filter: {
                    // @ts-ignore
                    'slug': slug
                }
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Categorie niet gevonden");
        });
}

async function getIngredient(slug: string) {
    return await directus
        .request(readItems('ingredients',
            {
                // @ts-ignore
                fields: ['*', 'image.*', 'parent.*', 'parent.parent.*'],
                filter: {
                    // @ts-ignore
                    'slug': slug
                }
            }))
        .then((d) => {
            return d.length > 0 ? d[0] : new PageNotFoundError("Ingredient niet gevonden");
        });
}

async function getRecipeCount(query?: Query) {
    return await directus
        // @ts-ignore
        .request(aggregate('recipes', {
            aggregate: {count: '*'},
            // query: {
            //     filter: query?.filter,
            // }
        }))
        .then((d) => {
            return d[0].count;
        });
}

async function getRecipes(query?: Query) {
    return await directus
        .request(readItems('recipes',
            {
                // @ts-ignore
                fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*'],
                filter: {
                    ...query?.filter
                },
                limit: query?.limit
            }))
        .then((d) => {
            return d;
        });
}

async function getRecipe(slug: string) {
    return await directus
        .request(readItems('recipes',
            {
                // @ts-ignore
                fields: ['*', 'image.*', 'steps.*', 'ingredients.*', 'ingredients.ingredient.*', 'categories.recipe_categories_id.*', 'reviews.*'],
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

export {
    directus,
    // @ts-ignore
    Recipe,
    // @ts-ignore
    RecipeIngredient,
    // @ts-ignore
    Ingredient,
    // @ts-ignore
    Step,
    // @ts-ignore
    Review,
    // @ts-ignore
    Category,
    useRecipes,
    useCategories,
    useIngredients,
    getCategory,
    getRecipe,
    getRecipeCount,
    getRecipes,
    getIngredient
};
