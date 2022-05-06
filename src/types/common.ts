import {AlertColor} from "@mui/material";

/**
 * To store the details of AlertPopup in a state container
 */
export type AlertPopupState = {
    isOpen: boolean
    severity: AlertColor
    message: string
}
