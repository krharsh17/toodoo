import React, {useState} from "react";
import {AlertPopupState} from "../../types/common";
import {AlertColor} from "@mui/material";
import AlertPopup from "./AlertPopup";

/**
 * Custom hook to embed and show Alerts in any component
 */
const useAlert = () => {
    // State container for controlling the visibility and other details of the alert popup
    const [popupState, setPopupState] = useState<AlertPopupState>({message: "", isOpen: false, severity: "error"})

    // Function to close the alert
    const closePopup = () => {
        setPopupState({...popupState, isOpen: false})
    }

    // Function to show alerts with set severity and message
    const showAlert = (message: string, severity: AlertColor) => {
        setPopupState({
            message,
            severity,
            isOpen: true
        })
    }

    // Alert component to be added in the parent component where alerts are to be displayed
    const Alert =
        <AlertPopup alertPopupState={popupState} handleClose={closePopup}/>

    return {
        Alert,
        showAlert
    }
}

export default useAlert