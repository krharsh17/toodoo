import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PAGE_HORIZONTAL_PADDING, TITLE_LIST} from "../../utils/Constants";

/**
 * Header component to show at the top of the list
 * Will contain filter and search features later
 * @constructor
 */
const ToDoListHeader: React.FC = () => {
    return (
        <Grid container>
            <Grid
                item
                container
                style={{margin: `24px ${PAGE_HORIZONTAL_PADDING} 0 ${PAGE_HORIZONTAL_PADDING}`}}>

                {/* List title */}
                <Typography
                    variant={"h5"}>
                    {TITLE_LIST}
                </Typography>

            </Grid>
        </Grid>
    )
}

export default ToDoListHeader