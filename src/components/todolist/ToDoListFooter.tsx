import React from "react"
import {Alert, Grid} from "@mui/material";
import {ALERT_EMPTY, PAGE_HORIZONTAL_PADDING} from "../../utils/Constants";

/**
 * Footer component to show below the list
 * @param isEmptyAlertHidden        Flag to control visibility of the empty-alert
 * @constructor
 */
const ToDoListFooter: React.FC<ToDoListFooterProps> = ({isEmptyAlertHidden}) => {
    return <Grid container>
        {(!isEmptyAlertHidden ?
            <Grid item
                  style={{margin: `24px ${PAGE_HORIZONTAL_PADDING} 0 ${PAGE_HORIZONTAL_PADDING}`}}>
                <Alert severity="info">
                    {ALERT_EMPTY}
                </Alert>
            </Grid> : <div/>)}
    </Grid>
}

type ToDoListFooterProps = {
    isEmptyAlertHidden: boolean
}

export default ToDoListFooter