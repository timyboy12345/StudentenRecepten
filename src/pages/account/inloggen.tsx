import {useState} from "react";
import {login} from "@/lib/directus";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleSubmit(e: any) {
        e.preventDefault();

        await login(email, password)
            .then((d) => console.log(d))
            .catch((e) => {
                console.error(e)
            });
    }


    return <>
        <h1 className='font-serif text-2xl'>Inloggen</h1>

        <form className={'flex flex-col gap-4'} onSubmit={handleSubmit}>
            <div className={'flex gap-0 flex-col'}>
                <label htmlFor={'email'}>Email</label>
                <input
                    id={'email'}
                    name={'email'}
                    value={email}
                    type='email'
                    className='w-full focus:ring-red-800 focus:border-red-800 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-600 focus:outline-none'
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className={'flex gap-0 flex-col'}>
                <label htmlFor={'password'}>Wachtwoord</label>
                <input
                    id={'password'}
                    name={'password'}
                    value={password}
                    type='password'
                    className='w-full focus:ring-red-800 focus:border-red-800 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-600 focus:outline-none'
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button type={'submit'}
                    className={'rounded bg-red-800 text-white inline-block py-2 px-4 hover:bg-red-900 transition duration-100'}>
                Inloggen
            </button>
        </form>
    </>
}
