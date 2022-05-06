import ResponsiveAppBar from '../components/common/AppBar'
import {NextPage} from "next";
import TodoList from "../components/todolist/TodoList";
import TodoListHeader from '../components/todolist/ToDoListHeader';
import AddTodoButton from "../components/todolist/AddTodoButton"
import React, {useState} from "react";
import {ToDo} from "../types/todo";
import ToDoListFooter from "../components/todolist/ToDoListFooter";

/**
 * Index page to show the to-do list and enable users to add or
 * update items
 * @constructor
 */
const Home: NextPage = () => {

    // State container for list of to-dos
    const [toDos, setToDos] = useState<ToDo[]>([])

    // Event for adding new to-dos to the list by clicking the add button
    const onAddButtonClicked = () => {
        const newToDos = [...toDos]
        newToDos.push({id: Date.now(), title: "", dueDate: (new Date()).toISOString(), isComplete: false, isNew: true})
        setToDos(newToDos)
        console.log("Add button clicked!")
    }

    /**
     * Function to update the status of a to-do when
     * the user toggles the checkbox
     *
     * @param id                ID of the to-do being updated
     * @param isComplete        New status of the to-do
     */
    const updateToDoStatus = (id: number, isComplete: boolean) => {

        console.log("Update action received for id: " + id + " isComplete: " + isComplete)
        const toDoIndex = toDos.findIndex((elem) => elem.id === id)
        const newTodo = {...toDos[toDoIndex]}

        newTodo.isComplete = isComplete

        const newTodos = [...toDos]
        newTodos[toDoIndex] = newTodo
        setToDos(newTodos)

    }

    /**
     * Function to delete a to-do when the user clicks on
     * the delete icon
     *
     * @param id        ID of the to-do being updated
     * @param isNew     Flag to check if call needs to be sent to the data store for
     *                  deleting the to-do
     */
    const deleteToDo = (id: number, isNew: boolean) => {

        console.log("Delete action received for id: " + id + " isNew: " + isNew)
        const newToDos = toDos.filter((elem) => elem.id !== id)
        setToDos(newToDos)

    }

    /**
     * Function to update the details of a to-do when
     * the user makes changes and clicks on save icon
     *
     * @param id        ID of the to-do being updated
     * @param title     New title for the to-do
     * @param dueDate   New due date for the to-do
     */
    const updateToDoDetails = (id: number, title: string, dueDate: string) => {
        console.log("Update action received for id: " + id + " title: " + title + " dueDate: " + dueDate)

        const toDoIndex = toDos.findIndex((elem) => elem.id === id)
        const newTodo = {...toDos[toDoIndex]}

        newTodo.title = title
        newTodo.dueDate = dueDate
        newTodo.isNew = false

        const newTodos = [...toDos]
        newTodos[toDoIndex] = newTodo
        setToDos(newTodos)

    }

    return (
        <div>
            <ResponsiveAppBar/>
            <TodoListHeader/>
            <TodoList
                toDos={toDos}
                updateToDoStatus={updateToDoStatus}
                updateToDoDetails={updateToDoDetails}
                deleteToDo={deleteToDo}/>
            <ToDoListFooter isEmptyAlertHidden={toDos.length !== 0}/>
            <AddTodoButton
                onAddButtonClicked={onAddButtonClicked}/>
        </div>
    )
}

export default Home
