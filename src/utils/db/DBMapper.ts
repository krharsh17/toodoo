import {ToDo} from "../../types/todo";

/**
 * Interface for creating database mappers
 */
export default interface DBMapper {
    // Fetches all to-dos for a given user
    getAllToDos: (
        uid: String,
        onSuccessListener?: (toDos: ToDo[]) => void,
        onFailureListener?: (error: string) => void
    ) => void

    // Persists a given to-do under the given user
    persistToDo: (
        uid: String | undefined,
        toDo: ToDo,
        onSuccessListener?: () => void,
        onFailureListener?: (error: string) => void
    ) => void,

    // Deletes a given to-do under the given user
    deleteToDo: (
        uid: String,
        toDo: ToDo,
        onSuccessListener?: () => void,
        onFailureListener?: (error: string) => void
    ) => void

}