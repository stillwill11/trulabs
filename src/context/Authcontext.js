import { createContext,useContext,useEffect,useState  } from "react";
import { auth, db } from "../firebase"
import {setDoc,doc} from 'firebase/firestore'

import {createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                signOut,
                onAuthStateChanged} from 'firebase/auth'

  

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Set initial value to null

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
      savedShows: [],
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null); // Set user to null if currentUser is falsy
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures the effect runs only once after mount

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}



