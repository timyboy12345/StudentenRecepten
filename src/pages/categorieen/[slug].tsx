import {getCategory} from "@/lib/directus";
import DirectusImage from "@/components/DirectusImage";
import RecipeCard from "@/components/cards/RecipeCard";
import Head from "next/head";

function Category({ category }) {
    function toHtml(cont) {
        return {__html: cont}
    }

    return (
        <>
            <Head>
                <title>{category.title + ' - Categorie - StudentenRecepten'}</title>
            </Head>

            {category.image && <DirectusImage width='850' height='350' tailwindHeight='h-64' image={category.image}/>}
            <h1 className='font-serif text-2xl mb-2 mt-4'>{category.title}</h1>
            <div dangerouslySetInnerHTML={toHtml(category.content)} className='prose max-w-none'/>

            <h2 className='font-serif text-xl mt-4 mb-2'>Recepten in deze categorie</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {category.recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe.recipes_id}/>)}
            </div>

            {/*{JSON.stringify(category)}*/}
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://data.arendz.nl/items/recipe_categories')
    const posts = await res.json()

    const paths = posts.data.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }
}

export const getStaticProps = (async (context) => {
    const slug = context.params.slug;
    const category = await getCategory(slug);

    return { props: {category: category }}
})

export default Category
