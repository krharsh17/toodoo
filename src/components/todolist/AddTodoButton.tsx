import React from "react"
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * Material FAB button that enables users to add
 * new to-dos in the list
 * @param onAddButtonClicked        Event listener for button clicks
 * @constructor
 */
const AddTodoButton: React.FC<AddTodoButtonPropTypes> = ({onAddButtonClicked}) => {

    return <>
        <div style={{position: "absolute", bottom: 16, right: 16}}>
            <Fab color="primary" aria-label="add" onClick={onAddButtonClicked}>
                <AddIcon/>
            </Fab>
        </div>
    </>
}

/**
 * Prop types for {@see #AddTodoButton}
 */
type AddTodoButtonPropTypes = {
    onAddButtonClicked: () => void
}

export default AddTodoButton