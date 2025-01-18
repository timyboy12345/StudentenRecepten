import {Category, Recipe} from "@/lib/directus";

export default function CategoryRecipeSnippet({category}: { category: Category }) {

    function recipe(r: Recipe | any, position: number) {
        return {
            "@type": "ListItem",
            "position": `${position + 1}`,
            "url": `https://studentenrecepten.com/${r.slug}`,
        };
    }

    function addRecipeLd() {
        return {
            // @ts-ignore
            __html: `{
                "@context": "https://schema.org/",
                "@type": "ItemList",
                "itemListElement": ${JSON.stringify(category.recipes.map((r, i) => recipe(r.recipes_id, i)))}
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
