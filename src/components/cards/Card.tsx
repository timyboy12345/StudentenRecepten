import Link from "next/link";
import DirectusImage from "@/components/DirectusImage";

// @ts-ignore
function Card({image, title, description, link, subtitle, cropType}: {
    image?: any,
    title?: string,
    description?: string,
    link?: string,
    subtitle?: string,
    cropType?: 'contain',
}) {
    if (link) return (
        <Link href={link}
              className="w-full border border-gray-100 bg-white cursor-pointer hover:bg-gray-100 transition duration-100">
            {image && <DirectusImage width={500} height={300} cropType={cropType} image={image}/>}

            <div className='p-4'>
                {subtitle && <div className='text-xs opacity-60'>{subtitle}</div>}
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    )

    return (
        <div className="w-full border border-gray-100 bg-white">
            {image &&
                <img alt={image.description} src={"https://data.arendz.nl/assets/" + image.id}
                     className="object-cover object-center w-full h-36"/>
            }

            <div className='p-4'>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>

            {/*{JSON.stringify(recipe)} */}
        </div>
    );
}

export default Card;
