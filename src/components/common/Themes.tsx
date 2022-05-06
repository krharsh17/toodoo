import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {BLACK, BLUE, GREY, PINK, YELLOW} from "../../utils/Constants";

// Theme overrides for the app
const theme = createTheme({
    palette: {
        primary: {
            main: BLACK,
        },
        secondary: {
            main: BLUE,
        },
        background: {
            default: GREY,
        },
        error: {
            main: PINK,
        },
        warning: {
            main: YELLOW,
        },
    },
});

// Custom theme provider
export default function Theme(props: IThemeProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {props.children}
        </ThemeProvider>
    );
}

// Basic skeleton for theme provider prop types
type IThemeProps = {
    children: any;
}