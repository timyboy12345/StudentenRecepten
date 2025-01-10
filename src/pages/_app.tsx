import Layout from '../components/layouts/default-layout'
import "../globals.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
