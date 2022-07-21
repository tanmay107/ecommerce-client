import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, doc, setDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_KEY,
    authDomain: "fir-auth-ecommerce-9b085.firebaseapp.com",
    projectId: "fir-auth-ecommerce-9b085",
    storageBucket: "fir-auth-ecommerce-9b085.appspot.com",
    messagingSenderId: "282818523080",
    appId: "1:282818523080:web:5a80205ec1b60759b7dafd",
    measurementId: "G-9ZBZWHQ0YD"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      });
  } catch (err) {
      console.error(err);
      alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    localStorage.clear();
};

const registerProduct = async ( title, description, price, image) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      title: title,
      description: description,
      price: price,
      image: image,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];
      querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        title: doc.data().title,
        price: doc.data().price,
        description: doc.data().description,
        image: doc.data().image,
      });
    })
    return list
  }
  catch (e){
    console.error("Error fetching documents: ", e)
  }
}

const addToBasket = async ( uid, cart, createdAt ) => {
  try {
    const doc = await addDoc(collection(db, "orders"), {
      uid: uid,
      cart: cart,
    });
    console.log("Document written with ID: ", doc.id);
  } catch (e) {
    console.error("Error adding the document ", e);
  }
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    registerProduct,
    getProducts,
    addToBasket,
  };