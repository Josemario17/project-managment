import {createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../../Config/conection";

interface createUserData {
    email: string;
    password: string;
    name: string;
}

export const CreatUser = async (credentials: createUserData) => {
    const { email, password, name } = credentials;
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            set(userRef, {
                name: name,
                email: email,
            });
            return user;
        })
        .catch((error) => {
            throw error;
        });
};