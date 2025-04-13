import {createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../../Config/conection";

interface createUserData {
    email: string;
    password: string;
    name: string;
}

const saveUserData = async (userId: string, name: string, email: string) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    set(userRef, {
        name: name,
        email: email,
        id: userId,
    });
}

export const CreatUser = async (credentials: createUserData) => {
    const { email, password, name } = credentials;
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            saveUserData(user.uid, name, email)
            return user;
        })
        .catch((error) => {
            throw error;
        });
};
