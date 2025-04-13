// vamos criar um hook para consumir os dados com sdk do firebase

import { get, ref } from "firebase/database"
import { db } from "../Config/conection"


export const getUsers = async (userId?: string) => {
    const useRef = ref(db, `users/${userId || ""}`)
    const snapshot = await get(useRef)
    return snapshot.val()
}