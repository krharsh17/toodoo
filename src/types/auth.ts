/**
 * To store a compact version of FirebaseUser
 */
export type AuthUser = {
    uid: String
    email: String
}

/**
 * Context type to supply {@see #AuthUser} to all components along with some helper functions
 */
export type AuthUserContext = {
    authUser: AuthUser | null
    loading: boolean
    signIn: ((email: string, password: string) => Promise<any>)
    createUser: ((email: string, password: string) => Promise<any>)
    signOut: (() => void)
}

/**
 * Prop types for {@see #AuthUserContext}
 */
export type AuthUserContextProps = {
    children: JSX.Element
}

/**
 * To store the email and password of the user on the sign-in page
 */
export type LoginDetails = {
    email: string
    password: string
}