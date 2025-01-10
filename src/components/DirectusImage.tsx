export default function DirectusImage({image, height}) {
    return (
        <img alt={image.description} src={"https://data.arendz.nl/assets/" + image.id}
             className={'object-cover object-center w-full ' + (height ?? 'h-36')}/>
    )
}
