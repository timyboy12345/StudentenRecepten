import {useState} from "react";
import {login} from "@/lib/directus";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginIn, setLoginIn] = useState(false);
    const [loginError, setLoginError] = useState();

    async function handleSubmit(e: any) {
        e.preventDefault();

        setLoginIn(true);
        await login(email, password)
            .then((d) => {
                console.log(d)
                setEmail('');
                setPassword('');
                // router.push("/account/account")

                // TODO: Replace with propper state management
                // @ts-ignore
                window.location = '/account/account';
            })
            .catch((e) => {
                console.error(e)
                setLoginError(e.errors ? e.errors[0].message : e)
            })
            .then(() => setLoginIn(false));
    }


    return <>
        <h1 className='font-serif text-2xl'>Inloggen</h1>

        <div className={'grid lg:grid-cols-2 gap-x-4 gap-y-8'}>
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
                        disabled={loginIn}
                        className={'rounded bg-red-800 text-white inline-block py-2 px-4 hover:bg-red-900 transition duration-100 ' + (loginIn ? 'opacity-60' : '')}>
                    Inloggen
                </button>

                {loginError && <div className={'p-2 border border-red-900 text-sm text-red-900'}>{loginError}</div>}
            </form>

            <div className={'flex flex-col gap-4'}>
                <p>Door in te loggen krijg je toegang tot jouw reviews, jouw favoriete recepten en meer persoonlijke
                    functies.</p>
                <p className={'opacity-60'}>Momenteel is het helaas niet mogelijk een account aan te maken. Hopelijk is
                    deze feature binnenkort
                    wel beschikbaar, tot die tijd kan je tabbladen aan de favorieten van je eigen browser toevoegen.</p>
            </div>
        </div>
    </>
}
