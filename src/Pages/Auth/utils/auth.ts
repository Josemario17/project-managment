import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../Config/conection";
import { child, get, ref } from "firebase/database";

interface AuthCredentials {
  email: string;
  password: string;
}

export const signInUser = async (credentials: AuthCredentials) => {
  const { email, password } = credentials;
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      throw error;
    });
};

export const getDataOfUser = async (userId: string) => {
  const userRef = ref(db);
  try {
    const snapshot = await get(child(userRef, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export const LoginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user.uid;
    })
    .catch((error) => {
      throw error;
    });
}
