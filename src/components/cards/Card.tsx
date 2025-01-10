import Link from "next/link";
import DirectusImage from "@/components/DirectusImage";

function Card({image, title, description, link}) {
    if (link) return (
        <Link href={link}
              className="w-full border border-gray-100 bg-white cursor-pointer hover:bg-gray-100 transition duration-100">
            {image && <DirectusImage image={image}/>}

            <div className='p-4'>
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
};

export default Card;
