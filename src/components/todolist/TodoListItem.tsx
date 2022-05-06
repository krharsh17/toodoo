import * as React from "react";
import {useEffect, useState} from "react";
import {AlertColor, Grid, Paper, TextField, Tooltip} from "@mui/material";
import {
    ALERT_CHANGES_NOT_SAVED,
    ALERT_CHANGES_SAVED,
    ALERT_ENTER_TITLE,
    ARIA_LABEL_CLOSE,
    ARIA_LABEL_DELETE,
    ARIA_LABEL_EDIT,
    ARIA_LABEL_SAVE,
    DUE_DATE_FORMAT,
    DUE_DATE_TEMPLATE,
    EMPTY_STRING,
    LABEL_DUE_DATE,
    LABEL_TITLE,
    PAGE_HORIZONTAL_PADDING,
    SEVERITY_ERROR,
    SEVERITY_INFO,
    SEVERITY_SUCCESS,
    TEST_ID_CLOSE,
    TEST_ID_DELETE, TEST_ID_DUE_DATE_FIELD,
    TEST_ID_EDIT,
    TEST_ID_SAVE, TEST_ID_TITLE, TEST_ID_TITLE_FIELD,
    TITLE_CLOSE,
    TITLE_DELETE,
    TITLE_EDIT,
    TITLE_SAVE
} from "../../utils/Constants";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {ToDo} from "../../types/todo";

/**
 * List item component that takes in the details of one to-do
 * as a list item in the to-do list
 * @param toDo              Object that contains details of one to-do
 * @param toggleDone        Function to mark current to-do as complete
 * @param updateDetails     Function to update the details of the current to-do
 * @param deleteToDo        Function to delete the current to-do
 * @param showAlert         Function to show an alert message
 * @constructor
 */
const ToDoListItem: React.FC<ToDoListItemProps> = ({toDo, toggleDone, updateDetails, deleteToDo, showAlert}) => {

    // State containers for editable to-do details
    const [itemTitle, setItemTitle] = useState<string>(toDo.title)
    const [itemDueDate, setItemDueDate] = useState<Date | null>(new Date(toDo.dueDate))

    // State containers for toggling visibility of edit, close, save, and delete buttons
    const [editIconVisible, setEditIconVisible] = useState<boolean>(false)
    const [closeIconVisible, setCloseIconVisible] = useState<boolean>(false)
    const [saveIconVisible, setSaveIconVisible] = useState<boolean>(false)
    const [deleteIconVisible, setDeleteEditIconVisible] = useState<boolean>(false)

    // State container for toggling the edit mode for a to-do
    const [editMode, setEditMode] = useState<boolean>(false)

    // Effect to update title and due date in the view from the state whenever it changes
    useEffect(() => {
        setItemTitle(toDo.title)
        setItemDueDate(new Date(toDo.dueDate))

        // For new to-dos,switch to edit mode by default
        if (toDo.isNew)
            onEditIconClick()

    }, [toDo.title, toDo.dueDate, toDo.isNew])

    // Effect to update button visibilities
    useEffect(() => {
        if (editMode) {
            if (isChangeMade() && toDo.isNew && isInputValid()) {
                setDeleteEditIconVisible(false)
                setCloseIconVisible(true)
                setSaveIconVisible(true)

            } else if (isChangeMade() && !toDo.isNew && !isInputValid()) {
                setDeleteEditIconVisible(true)
                setCloseIconVisible(true)
                setSaveIconVisible(false)

            } else if (isChangeMade() && !toDo.isNew && isInputValid()) {
                setDeleteEditIconVisible(true)
                setCloseIconVisible(true)
                setSaveIconVisible(true)

            } else if (!isChangeMade() && toDo.isNew && !isInputValid()) {
                setDeleteEditIconVisible(false)
                setCloseIconVisible(true)
                setSaveIconVisible(false)
                setEditMode(true)

            } else if (!isChangeMade() && !toDo.isNew && isInputValid()) {
                setDeleteEditIconVisible(true)
                setCloseIconVisible(true)
                setSaveIconVisible(false)
            }
        }
    }, [toDo.isNew, itemTitle, itemDueDate])

    // Effect to hide all action buttons when edit mode is off
    useEffect(() => {
        if (!editMode) {
            setDeleteEditIconVisible(false)
            setCloseIconVisible(false)
            setSaveIconVisible(false)
        }
    }, [editMode])

    // Function to check if user has updated a to-do in edit mode
    const isChangeMade: (() => boolean) = () => {
        return (
            toDo.title !== itemTitle ||
            toDo.dueDate !== itemDueDate?.toISOString()
        )
    }

    // Function to validate title is not empty
    const isInputValid: (() => boolean) = () => {
        return (
            itemTitle !== undefined && itemTitle !== EMPTY_STRING
        )
    }

    // Event for showing edit icon when user hovers on the list item
    const onMouseEnter = () => {
        setEditIconVisible(!editMode)
        setDeleteEditIconVisible(editMode ? deleteIconVisible : true)
    }

    // Event for hiding the edit icon when user's mouse pointer moves out of this list item
    const onMouseExit = () => {
        setEditIconVisible(false)
        setDeleteEditIconVisible(editMode ? deleteIconVisible : false)
    }

    // Event for handling click on edit icon to toggle into edit mode
    const onEditIconClick = () => {
        setEditIconVisible(false)
        setEditMode(true)
    }

    /**
     * Event for handling click on save icon to update the details in the global
     * state container and toggle out of edit mode
     */
    const onSaveIconClick = () => {
        if (isInputValid()) {
            updateDetails(toDo.id, itemTitle, itemDueDate?.toISOString() || (new Date()).toISOString())
            setEditMode(false)
            showAlert(ALERT_CHANGES_SAVED, SEVERITY_SUCCESS)
        } else {
            showAlert(ALERT_ENTER_TITLE, SEVERITY_ERROR)
        }

    }

    // Event for passing the delete operation to the parent
    const onDeleteIconClick = () => {
        deleteToDo(toDo.id, toDo.isNew)
    }

    /**
     * Event for handling click on close icon to revert the unsaved changes made
     * to the to-do and toggle out of edit mode
     */
    const onCloseIconClick = () => {
        setEditMode(false)
        showAlert(ALERT_CHANGES_NOT_SAVED, SEVERITY_INFO)

        if (toDo.isNew) {
            onDeleteIconClick()
            return
        }

        if (isChangeMade()) {
            setItemDueDate(new Date(toDo.dueDate))
            setItemTitle(toDo.title)
        }
    }

    // Event for handling title text update via user input
    const onTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemTitle(ev.target.value)
    }

    // Event for handling due date update via user input
    const onDueDateChange = (newValue: Date | null) => {
        if (newValue)
            setItemDueDate(new Date(newValue.toISOString()))
    }

    // Event for handling checked state changes via user input
    const onCheckChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log("CHECK CHANGED TO: ", ev.target.checked)
        toggleDone(toDo.id, ev.target.checked)
    }

    return (
        <Paper style={{margin: `16px ${PAGE_HORIZONTAL_PADDING}`, padding: "8px"}}
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseExit}>
            <Grid container style={{justifyContent: "right"}}>

                {/* Check box for status updates */}
                <Grid item style={{margin: "8px"}}>
                    {!editMode ? <Checkbox checked={toDo.isComplete} onChange={onCheckChange}/> : <div/>}
                </Grid>

                {/* List item body */}
                {(!editMode ?
                        // Static texts to show to-do details when not in edit mode
                        <Grid item xs={9}>
                            <Grid item xs={12}>
                                <Typography data-testid={TEST_ID_TITLE} variant={"h6"}>{itemTitle}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant={"body2"}>{DUE_DATE_TEMPLATE(itemDueDate?.toDateString())}</Typography>
                            </Grid>
                        </Grid>
                        :
                        // Input text fields to enable users to edit to-do details when in edit mode
                        <Grid item container xs={12} sm={10} md={8} lg={4} spacing={2}
                              style={{alignItems: "center", justifyContent: "center"}}>
                            <Grid item>
                                <TextField
                                    label={LABEL_TITLE}
                                    data-testid={TEST_ID_TITLE_FIELD}
                                    value={itemTitle}
                                    onChange={onTitleChange}
                                    variant="standard"
                                    style={{
                                        width: "200px",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DesktopDatePicker
                                        label={LABEL_DUE_DATE}
                                        data-testid={TEST_ID_DUE_DATE_FIELD}
                                        inputFormat={DUE_DATE_FORMAT}
                                        value={itemDueDate}
                                        onChange={onDueDateChange}
                                        renderInput={(params) => <TextField variant={"standard"} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                )}

                {/* Flex box to automatically adjust to screen width and keep side elements anchored */}
                <Grid item flexGrow={1}/>

                {/* Action buttons for the to-dos */}
                <Grid item style={{margin: "8px 16px 8px 8px"}}>
                    {editIconVisible ?
                        <Tooltip title={TITLE_EDIT}>
                            <IconButton
                                aria-label={ARIA_LABEL_EDIT}
                                data-testid={TEST_ID_EDIT}
                                onClick={onEditIconClick}
                                style={{margin: "0 2px"}}>
                                <CreateIcon/>
                            </IconButton>
                        </Tooltip>
                        : <div/>}

                    {deleteIconVisible ?
                        <Tooltip title={TITLE_DELETE}>
                            <IconButton
                                aria-label={ARIA_LABEL_DELETE}
                                data-testid={TEST_ID_DELETE}
                                onClick={onDeleteIconClick}
                                style={{margin: "0 2px"}}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        : <div/>}

                    {closeIconVisible ?
                        <Tooltip title={TITLE_CLOSE}>
                            <IconButton
                                aria-label={ARIA_LABEL_CLOSE}
                                data-testid={TEST_ID_CLOSE}
                                onClick={onCloseIconClick}
                                style={{margin: "0 2px"}}>
                                <CloseIcon/>
                            </IconButton>
                        </Tooltip>
                        : <div/>}

                    {saveIconVisible ?
                        <Tooltip title={TITLE_SAVE}>
                            <IconButton
                                aria-label={ARIA_LABEL_SAVE}
                                data-testid={TEST_ID_SAVE}
                                onClick={onSaveIconClick}
                                style={{margin: "0 2px"}}>
                                <SaveIcon/>
                            </IconButton>
                        </Tooltip>
                        : <div/>}

                </Grid>
            </Grid>
        </Paper>
    )
}

/**
 * Prop types for {@see #ToDoListItem} component
 */
type ToDoListItemProps = {
    toDo: ToDo
    toggleDone: (id: number, isDone: boolean) => void
    updateDetails: (id: number, title: string, dueDate: string) => void
    deleteToDo: (id: number, isNew: boolean) => void
    showAlert: (message: string, severity: AlertColor) => void
}

export default ToDoListItem