'use client'

import {getMe, logout, refreshToken} from "@/lib/directus";
import {useEffect, useState} from "react";
import Card from "@/components/cards/Card";

export default function Account() {
    // Set the value received from the local storage to a local state
    const [account, setAccount] = useState<any>()

    useEffect(() => {
        getMe().then(setAccount);
    }, [])

    async function logOut() {
        await logout().then((d) => console.log(d)).catch((e) => console.error(e));
        // router.push('/account/inloggen');
        // router.replace

        // TODO: Replace with proper state management
        // @ts-ignore
        window.location = '/account/inloggen';
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

        {account && <Card>
            <ul className={'flex flex-col divide-y divide-gray-100 dark:divide-gray-700 -m-4'}>
                {Object.keys(account).map((key) => <li key={key} className={'py-2 px-4'}>
                    {key}: {account[key]}
                </li>)}
            </ul>
        </Card>}
    </>
}
