import * as React from 'react';
import {useEffect, useState} from 'react';
import {ToDo} from "../../types/todo";
import ToDoListItem from "./TodoListItem";
import useAlert from "../common/useAlert";

/**
 * Main list component that takes in an array of to-dos and renders them
 * as a list of {@see #ToDoListItem}
 * @param toDos                 List of to-dos passed by the parent
 * @param updateToDoDetails     Function to update the details of a to-do using its ID
 * @param updateToDoStatus      Function to update the status of a to-do using its ID
 * @param deleteToDo            Function to delete a to-do using its ID
 * @constructor
 */
const TodoList: React.FC<ListProps> = ({toDos, updateToDoDetails, updateToDoStatus, deleteToDo}) => {

    // State container for the list of to-dos
    const [items, setItems] = useState<ToDo[]>([])

    // Hook for displaying snackbar alerts
    const {Alert, showAlert} = useAlert()

    // Effect to update items whenever toDos is updated by the parent
    useEffect(() => {
        setItems(toDos)
    }, [toDos])

    return (
        <>
            {items.map((item) => {
                return (
                    <ToDoListItem key={item.id}
                                  toDo={item}
                                  toggleDone={updateToDoStatus}
                                  updateDetails={updateToDoDetails}
                                  deleteToDo={deleteToDo}
                                  showAlert={showAlert}
                    />
                );
            })}

            {/* Alert component for displaying alert popups */}
            {Alert}
        </>
    );
}


/**
 * Prop types for {@see #ListProps} component
 */
type ListProps = {
    toDos: ToDo[],
    updateToDoDetails: (id: number, title: string, dueDate: string) => void,
    updateToDoStatus: (id: number, isDone: boolean) => void
    deleteToDo: (id: number, isDone: boolean) => void
}

export default TodoList