import Card from "@/components/cards/Card";

export default function CategoryCard({category, hideDescription = false}) {
    return (
        <Card title={category.title} image={category.image} subtitle='Categorie' description={(!hideDescription) ? category.description : null} link={'/categorieen/' + category.slug}/>
    )
}
