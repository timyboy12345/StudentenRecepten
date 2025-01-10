export default function DirectusImage({image}) {
    return (
        <img alt={image.description} src={"https://data.arendz.nl/assets/" + image.id}
             className="object-cover object-center w-full h-36"/>
    )
}
