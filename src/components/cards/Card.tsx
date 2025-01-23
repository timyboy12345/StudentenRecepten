import Link from "next/link";
import DirectusImage from "@/components/DirectusImage";

// @ts-ignore
function Card({image, title, description, link, subtitle, cropType, children}: {
    image?: any,
    title?: string,
    description?: string,
    link?: string,
    subtitle?: string,
    cropType?: 'contain',
    children?: any,
}) {
    if (link) return (
        <Link href={link}
              className="w-full border border-gray-100 bg-white cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700 transition duration-100">
            {image && <DirectusImage width={500} height={300} cropType={cropType} image={image}/>}

            <div className='p-4'>
                {subtitle && <div className='text-xs opacity-60'>{subtitle}</div>}
                {title && <h2 className="text-xl font-bold">{title}</h2>}
                {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}

                {children}
            </div>
        </Link>
    )

    return (
        <div className="w-full border border-gray-100 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
            {image &&
                <img alt={image.description} src={"https://data.arendz.nl/assets/" + image.id}
                     className="object-cover object-center w-full h-36"/>
            }

            <div className='p-4'>
                {title && <h2 className="text-xl font-bold">{title}</h2>}
                {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}

                {children}
            </div>

            {/*{JSON.stringify(recipe)} */}
        </div>
    );
}

export default Card;
