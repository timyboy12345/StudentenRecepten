import Card from "@/components/cards/Card";

export default function CategoryCard({category}) {
    return (
        <Card title={category.title} image={category.image} description={category.description} link={'/categorieen/' + category.slug}/>
    )
}
