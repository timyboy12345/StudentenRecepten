import React from "react";
import Link from "next/link";
import {isLoggedIn} from "@/lib/auth-checker";

const Navigation = () => {
    return (
        <>
            <div
                className="w-full bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-10">
                <div className="p-2 py-4 md:p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center h-full">
                        <Link href='/'
                              className='font-bold text-xl hover:text-red-900 dark:hover:text-gray-300 duration-100 transition'>
                            StudentenRecepten
                        </Link>

                        <ul className="text-center gap-2 flex flex-wrap gap-y-2 justify-center gap-x-6 text-gray-800 dark:text-gray-300">
                            <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/recepten">
                                    <p>Recepten</p>
                                </Link>
                            </li>
                            {/*<li>*/}
                            {/*    <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'} href="/artikelen">*/}
                            {/*        <p>Artikelen</p>*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/ingredienten">
                                    <p>Ingrediënten</p>
                                </Link>
                            </li>
                            <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/categorieen">
                                    <p>Categorieën</p>
                                </Link>
                            </li>
                            <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/over-ons">
                                    <p>Over Ons</p>
                                </Link>
                            </li>
                            {!isLoggedIn() && <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/account/inloggen">
                                    <p>Inloggen</p>
                                </Link>
                            </li>}
                            {isLoggedIn() && <li>
                                <Link className={'hover:text-red-900 duration-100 transition dark:hover:text-gray-400'}
                                      href="/account/account">
                                    <p>Jouw Account</p>
                                </Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
