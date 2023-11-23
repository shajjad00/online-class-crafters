import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AllContext = createContext(null);
const auth = getAuth(app);
const Provider = ({ children }) => {
  //stat
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //user gmail password login

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //user sign out

  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //google login

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //update profile

  const userUpdateProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //watch user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const values = {
    createUser,
    userSignIn,
    loading,
    user,
    userSignOut,
    auth,
    googleSignIn,
    userUpdateProfile,
  };
  return (
    <div>
      <AllContext.Provider value={values}>{children}</AllContext.Provider>
    </div>
  );
};

export default Provider;
