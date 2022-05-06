import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {useAuth} from "../components/auth/AuthUserContext";
import {useRouter} from "next/router";
import {
    ALERT_CREATING_USER,
    ALERT_WEAK_PASSWORD,
    ALERT_SOMETHING_WENT_WRONG, ALERT_WRONG_PASSWORD,
    FIREBASE_ERROR_USER_NOT_FOUND, FIREBASE_ERROR_WEAK_PASSWORD,
    FIREBASE_ERROR_WRONG_PASSWORD,
    LABEL_EMAIL,
    LABEL_PASSWORD,
    ROUTE_HOME, SEVERITY_ERROR, SEVERITY_INFO,
    TITLE_LOGIN,
    TITLE_SIGN_IN,
    WHITE, ALERT_MISSING_EMAIL, ALERT_BAD_EMAIL, ALERT_MISSING_PASSWORD, ALERT_SIGNED_IN
} from "../utils/Constants";
import {LoginDetails} from "../types/auth";
import {FirebaseError} from "@firebase/util";
import {validateEmail} from "../utils/helpers";
import useAlert from "../components/common/useAlert";

/**
 * Login page to enable the users to login before proceeding
 * @constructor
 */
const Login: React.FC = () => {
    // State container for login details of the user
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({email: "", password: ""})

    // Hook for displaying snackbar alerts
    const {Alert, showAlert} = useAlert()
    // Hook for accessing Firebase authentication APIs
    const auth = useAuth()
    // Hook for navigating to home when logged in
    const router = useRouter()

    // Event for handling email input changes
    const onEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({...loginDetails, email: ev.target.value})
    }

    // Event for handling password input changes
    const onPasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({...loginDetails, password: ev.target.value})
    }

    // Event for starting the login flow once user clicks on the submit button
    const onLoginClick = () => {
        // Before proceeding, validate if login details are proper
        if (isUserInputValid()) {
            // Start the sign-in flow
            auth.signIn(loginDetails.email, loginDetails.password)
                .then(onSignedIn)
                .catch((error: FirebaseError) => {
                    // In case of error, take appropriate action
                    switch (error.code) {
                        case FIREBASE_ERROR_WRONG_PASSWORD:
                            showAlert(ALERT_WRONG_PASSWORD, SEVERITY_ERROR)
                            console.log(error)
                            break
                        // When user not found, automatically create new user for simplicity
                        case FIREBASE_ERROR_USER_NOT_FOUND:
                            console.log("Creating new user"
                            )
                            showAlert(ALERT_CREATING_USER, SEVERITY_INFO)

                            // Create new user with the same credentials
                            auth.createUser(loginDetails.email, loginDetails.password)
                                .then(onSignedIn)
                                .catch((error: FirebaseError) => {
                                    console.log(error.message)

                                    // In case of error, show appropriate message
                                    switch (error.code) {
                                        case FIREBASE_ERROR_WEAK_PASSWORD:
                                            showAlert(ALERT_WEAK_PASSWORD, SEVERITY_ERROR)
                                            break;
                                        default:
                                            showAlert(ALERT_SOMETHING_WENT_WRONG, SEVERITY_ERROR)
                                    }
                                })
                            break;
                        default:
                            showAlert(ALERT_SOMETHING_WENT_WRONG, SEVERITY_ERROR)
                    }

                })
        }
    }

    // Function to validate user input before signing in
    const isUserInputValid: (() => boolean) = () => {

        if (loginDetails.email === "") {
            showAlert(ALERT_MISSING_EMAIL, SEVERITY_ERROR)
            return false
        }

        if (!validateEmail(loginDetails.email)) {
            showAlert(ALERT_BAD_EMAIL, SEVERITY_ERROR)
            return false
        }

        if (loginDetails.password === "") {
            showAlert(ALERT_MISSING_PASSWORD, SEVERITY_ERROR)
            return false
        }

        return true
    }

    // Event for redirecting the user to home once signed in
    const onSignedIn = async () => {
        console.log("Signed in!")
        showAlert(ALERT_SIGNED_IN, SEVERITY_ERROR)
        await router.push(ROUTE_HOME)
    }

    return <Grid container
                 style={{
                     justifyContent: "center",
                     alignItems: "center",
                     minHeight: "100vh"
                 }}>

        <Grid item
              style={{
                  backgroundColor: WHITE,
                  padding: "8vh 4vw",
                  borderRadius: "8px",
                  justifyContent: "center",
              }}
              xs={10} sm={6} md={4}>

            {/* Card title */}
            <Grid item xs={12}>
                <h2>{TITLE_LOGIN}</h2>
            </Grid>

            {/* Email input field */}
            <Grid item xs={12} style={{marginBottom: '16px'}}>
                <TextField
                    id="email"
                    type={"email"}
                    label={LABEL_EMAIL}
                    value={loginDetails.email}
                    onChange={onEmailChange}
                    variant="standard"
                    fullWidth/>
            </Grid>

            {/* Password input field */}
            <Grid item xs={12} style={{marginBottom: '32px'}}>
                <TextField
                    id="password"
                    type={"password"}
                    value={loginDetails.password}
                    onChange={onPasswordChange}
                    label={LABEL_PASSWORD}
                    variant="standard"
                    fullWidth/>
            </Grid>

            {/* Sign in Button */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={onLoginClick}>
                    {TITLE_SIGN_IN}
                </Button>
            </Grid>
        </Grid>

        {/* Alert component for displaying alert popups */}
        {Alert}
    </Grid>
}


export default Login