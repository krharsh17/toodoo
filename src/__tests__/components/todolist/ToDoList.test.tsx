import "@testing-library/jest-dom";
import ToDoList from '../../../components/todolist/TodoList'
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {ToDo} from "../../../types/todo";
import {TEST_ID_CLOSE, TEST_ID_DELETE, TEST_ID_EDIT, TEST_ID_SAVE, TEST_ID_TITLE} from "../../../utils/Constants";

describe('ToDoList', () => {

    const setup = () => {
        const updateToDoDetails = jest.fn()
        const updateToDoStatus = jest.fn()
        const deleteTodo = jest.fn()

        const toDos: ToDo[] = [
            {isNew: false, title: "Task 1", dueDate: (new Date(Date.now())).toISOString(), id: 1, isComplete: false},
            {isNew: false, title: "Task 2", dueDate: (new Date(Date.now())).toISOString(), id: 2, isComplete: false},
            {isNew: false, title: "Task 3", dueDate: (new Date(Date.now())).toISOString(), id: 3, isComplete: false},
        ]

        render(<ToDoList toDos={toDos}
                         updateToDoDetails={updateToDoDetails}
                         updateToDoStatus={updateToDoStatus}
                         deleteToDo={deleteTodo}/>)
    }

    it('adds 3 to-dos', () => {
        setup()
        expect(screen.getAllByTestId(TEST_ID_TITLE).length).toBe(3)
    })

    it('focuses on one to-do', () => {

        setup()

        expect(screen.queryAllByTestId(TEST_ID_DELETE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_EDIT).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_CLOSE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_SAVE).length).toBe(0)

        fireEvent.mouseEnter(screen.getByText("Task 1"))

        expect(screen.queryAllByTestId(TEST_ID_DELETE).length).toBe(1)
        expect(screen.queryAllByTestId(TEST_ID_EDIT).length).toBe(1)
        expect(screen.queryAllByTestId(TEST_ID_CLOSE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_SAVE).length).toBe(0)
    })

    it('focuses on one to-do and defocuses to check action icons visibility', () => {

        setup()

        expect(screen.queryAllByTestId(TEST_ID_DELETE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_EDIT).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_CLOSE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_SAVE).length).toBe(0)

        fireEvent.mouseEnter(screen.getByText("Task 2"))
        fireEvent.mouseLeave(screen.getByText("Task 2"))

        expect(screen.queryAllByTestId(TEST_ID_DELETE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_EDIT).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_CLOSE).length).toBe(0)
        expect(screen.queryAllByTestId(TEST_ID_SAVE).length).toBe(0)
    })

})