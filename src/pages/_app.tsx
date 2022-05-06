import '../../styles/globals.css'
import type {AppProps} from 'next/app'
import {AuthUserProvider} from '../components/auth/AuthUserContext'
import Theme from "../components/common/Themes";

/**
 * Main wrapper component for every page rendered by Next.js
 * @param Component     The component to be shown in the page
 * @param pageProps     Props for the above component
 * @constructor
 */
function MyApp({Component, pageProps}: AppProps) {
    return (
        // ContextProvider for Firebase Auth object
        <AuthUserProvider>
            {/* ContextProvider for overriding MUI Theme*/}
            <Theme>
                <Component {...pageProps} />
            </Theme>
        </AuthUserProvider>
    )
}

export default MyApp
