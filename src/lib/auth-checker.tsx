import {useEffect, useState} from "react";

function isLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('directus-data')) {
            let value = localStorage.getItem("directus-data") ?? "{}"
            setIsLoggedIn(JSON.parse(value).access_token !== null)
            return;
        }

        setIsLoggedIn(false)
    }, [])

    return isLoggedIn
}

export {
    isLoggedIn
}
