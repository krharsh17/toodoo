// @ts-nocheck
import DBMapper from "./DBMapper";
import {ToDo} from "../../types/todo";

const ROOT='todos'
const EMPTY_JSON="{}"

export class LocalStorage implements DBMapper {

    getDbRoot = () => JSON.parse(window.localStorage.getItem(ROOT) || EMPTY_JSON)

    deleteToDo(uid: String, toDo: ToDo): void {
        const root = this.getDbRoot()
        delete root[uid][toDo.id]
        window.localStorage.setItem(ROOT, JSON.stringify(root))
    }

    getAllToDos(uid: String, onSuccessListener?: ((toDos: ToDo[]) => void)): void {
        const root = this.getDbRoot()
        if (onSuccessListener) {
            onSuccessListener(root[uid] ? Object.values(root[uid]) : [])
        }
    }

    persistToDo(uid: String | undefined, toDo: ToDo): void {
        const root = this.getDbRoot()
        root[uid][toDo.id] = toDo
        window.localStorage.setItem(ROOT, JSON.stringify(root))
    }

}