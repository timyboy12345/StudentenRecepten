export default function DirectusImage({image, tailwindHeight, width, height}) {
    const getImgUrl = (): string => {
        // TODO: Add file name to URL for SEO purposes
        // TODO: Serve in WEBP is possible
        const url = new URL(`https://data.arendz.nl/assets/${image.id}`);

        if (width) url.searchParams.append("width", width);
        if (height) url.searchParams.append("height", height);
        // url.searchParams.append("format", 'auto');

        return url.href;
    };

    return (
        <img alt={image.description} src={getImgUrl()}
             className={'object-cover object-center w-full ' + (tailwindHeight ?? 'h-36')}/>
    )
}
