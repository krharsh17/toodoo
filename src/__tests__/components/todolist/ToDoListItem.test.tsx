import "@testing-library/jest-dom";
import Home from '../../../pages'
import {render, screen} from "@testing-library/react";
import ToDoListItem from "../../../components/todolist/TodoListItem";
import {ToDo} from "../../../types/todo";

describe('Home', () => {

    it('renders the list item', () => {
        const deleteTodo = jest.fn()
        const updateDetails = jest.fn()
        const toggleDone = jest.fn()
        const showAlert = jest.fn()

        const toDo: ToDo = {
            id: 0,
            dueDate: (new Date(Date.now())).toISOString(),
            title: "Task 1",
            isNew: false,
            isComplete: false
        }
        render(<ToDoListItem
            key={3}
            deleteToDo={deleteTodo}
            toDo={toDo}
            updateDetails={updateDetails}
            toggleDone={toggleDone}
            showAlert={showAlert}/>)

        expect(screen.getByText("Task 1")).toBeInTheDocument();
    })

})