import React from "react";
import Link from "next/link";

const Navigation = () => {
    return (
        <>
            <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="p-2 md:p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center h-full">
                        <Link href='/' className='font-bold text-xl'>StudentenRecepten</Link>

                        <ul className="flex gap-x-6 text-gray-800">
                            <li>
                                <Link href="/recepten">
                                    <p>Recepten</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/artikelen">
                                    <p>Artikelen</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categorieen">
                                    <p>Categorieën</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/over-ons">
                                    <p>Over Ons</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
