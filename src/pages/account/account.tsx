'use client'

import {getMe, logout, refreshToken} from "@/lib/directus";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Account() {
    // Set the value received from the local storage to a local state
    const [account, setAccount] = useState<any>()
    const router = useRouter();

    useEffect(() => {
        getMe().then(setAccount);
    }, [])

    async function logOut() {
        await logout().then((d) => console.log(d)).catch((e) => console.error(e));
        router.push('/account/inloggen');
    }

    return <>
        <h1 className='font-serif text-2xl'>Jouw Account</h1>

        <div className={'flex flex-row gap-4'}>
            <button onClick={logOut} type={'button'}
                    className={'my-4 py-2 px-4 rounded text-white bg-red-800 hover:bg-red-900 transition duration-100'}>Uitloggen
            </button>

            <button onClick={refreshToken} type={'button'}
                    className={'my-4 py-2 px-4 rounded text-white bg-red-800 hover:bg-red-900 transition duration-100'}>
                Token Vernieuwen
            </button>
        </div>

        {account && <ul className={'rounded border border-gray-200'}>
            {Object.keys(account).map((key) => <li className={'py-1 px-2'}>
                {key}: {account[key]}
            </li>)}
        </ul>}
    </>
}
