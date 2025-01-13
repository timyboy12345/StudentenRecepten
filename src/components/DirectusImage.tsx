export default function DirectusImage({image, tailwindHeight, width, height, cropType}) {
    const getImgUrl = (): string => {
        // TODO: Add file name to URL for SEO purposes
        // TODO: Serve in WEBP is possible
        const url = new URL(`https://data.arendz.nl/assets/${image.id}`);

        if (width) url.searchParams.append("width", width);
        if (height) url.searchParams.append("height", height);
        if (cropType) url.searchParams.append("fit", cropType);
        // url.searchParams.append("format", 'auto');

        return url.href;
    };

    const tailwindObject = (): string => {
        switch (cropType) {
            case 'contain':
                return 'object-contain';
            default:
                return 'object-cover object-center';
        }
    }

    return (
        <img alt={image.description} src={getImgUrl()}
             className={'w-full ' + (tailwindHeight ?? 'h-36') + ' ' + tailwindObject()}/>
    )
}
