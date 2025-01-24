'use client'

import {getMe} from "@/lib/directus";
import {useEffect, useState} from "react";

export default function Account() {
    // Set the value received from the local storage to a local state
    const [account, setAccount] = useState<any>()

    useEffect(() => {
        getMe().then(setAccount);
    }, [])

    return <>
        <h1 className='font-serif text-2xl'>Jouw Account</h1>

        {account && <ul className={'rounded border border-gray-200'}>
            {Object.keys(account).map((key) => <li className={'py-1 px-2'}>
                {key}: {account[key]}
            </li>)}
        </ul>}
    </>
}
