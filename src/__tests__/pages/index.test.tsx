import "@testing-library/jest-dom";
import Home from '../../pages'
import {fireEvent, render, screen} from "@testing-library/react";
import {
    ALERT_EMPTY,
    APP_NAME,
    LABEL_TITLE,
    TEST_ID_ADD,
    TEST_ID_CLOSE,
    TEST_ID_TITLE_FIELD,
    TITLE_LIST
} from "../../utils/Constants";

describe('Home', () => {

    it('renders the app name', () => {
        render(<Home/>)
        expect(screen.getAllByText(APP_NAME.toLowerCase())[0]).toBeInTheDocument();
    })

    it('renders an empty list with title', () => {
        render(<Home/>)
        expect(screen.getAllByText(TITLE_LIST)[0]).toBeInTheDocument()
    })

    it('renders the add button on loading', () => {
        render(<Home/>)
        expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
    })

    it('renders the empty info message on loading', () => {
        render(<Home/>)
        expect(screen.getAllByText(ALERT_EMPTY)[0]).toBeInTheDocument()
    })

    it('adds a to-do on clicking add', () => {
        render(<Home/>)
        fireEvent.click(screen.getByTestId(TEST_ID_ADD))
        expect(screen.getAllByText(LABEL_TITLE).length).toBe(1)
    })

    it('deletes a to-do on clicking add & delete', () => {
        render(<Home/>)
        fireEvent.click(screen.getByTestId(TEST_ID_ADD))
        fireEvent.click(screen.getAllByTestId(TEST_ID_CLOSE)[0])
        expect(screen.queryByTestId(TEST_ID_TITLE_FIELD)).not.toBeInTheDocument()
    })

    it('adds two to-dos and deletes one', () => {
        render(<Home/>)
        fireEvent.click(screen.getByTestId(TEST_ID_ADD))
        fireEvent.click(screen.getByTestId(TEST_ID_ADD))
        fireEvent.click(screen.getAllByTestId(TEST_ID_CLOSE)[0])
        expect(screen.getAllByTestId(TEST_ID_TITLE_FIELD).length).toBe(1)
    })

})