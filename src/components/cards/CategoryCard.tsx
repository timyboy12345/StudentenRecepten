import Card from "@/components/cards/Card";
import {Category} from "@/lib/directus";

export default function CategoryCard({category, hideDescription = false}: {
    category: Category,
    hideDescription?: boolean
}) {
    return (
        <Card title={category.title} image={category.image} subtitle='Categorie'
              description={(!hideDescription) ? category.description : undefined} link={'/categorieen/' + category.slug}/>
    )
}
