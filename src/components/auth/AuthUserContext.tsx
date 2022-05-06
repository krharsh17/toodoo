import {createContext, useContext} from 'react'
import useFirebaseAuth from './useFirebaseAuth';
import {AuthUserContext, AuthUserContextProps} from "../../types/auth";

/**
 * Context for supplying FirebaseAuth functions and FirebaseUser object
 * throughout the app
 */
const authUserContext = createContext<AuthUserContext>({
    authUser: null,
    loading: true,
    signIn: async () => null,
    createUser: async () => null,
    signOut: () => null
});

/**
 * ContextProvider for supplying {@see #authUserContext} throughout the app
 * @param children      Components that need to be provided with {@see #authUserContext}
 * @constructor
 */
export function AuthUserProvider({children}: AuthUserContextProps) {
    const auth = useFirebaseAuth();

    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);