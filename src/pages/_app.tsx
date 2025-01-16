import Layout from '../components/layouts/default-layout'
import "../globals.css";

// @ts-ignore
export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
