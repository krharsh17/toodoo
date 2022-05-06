import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {AlertPopupState} from "../../types/common";

/**
 * Alert Popup component that makes use of Material Snackbar to display alerts
 * @param alertPopupState       State container for popup visibility and other details passed from parent
 * @param handleClose           Function to close the popup as needed
 * @constructor
 */
const AlertPopup: React.FC<AlertPopupProps> = ({alertPopupState, handleClose},) => {
    return <Snackbar open={alertPopupState.isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertPopupState.severity} sx={{width: '100%'}}>
            {alertPopupState.message}
        </Alert>
    </Snackbar>
}

/**
 * Prop types for {@see #AlertPopup} component
 */
type AlertPopupProps = {
    alertPopupState: AlertPopupState
    handleClose: () => void
}

export default AlertPopup