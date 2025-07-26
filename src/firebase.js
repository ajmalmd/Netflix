import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6Xm9ONTdZnArfTeNMaakLdjnc-SbJWoA",
  authDomain: "netflix-clone-reactjs-project.firebaseapp.com",
  projectId: "netflix-clone-reactjs-project",
  storageBucket: "netflix-clone-reactjs-project.firebasestorage.app",
  messagingSenderId: "762220305214",
  appId: "1:762220305214:web:4ed5eeb6424ca712f1ea6f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
