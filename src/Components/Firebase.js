// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB8w3V0Chzdg8_6Z3nHs_Gwd5qo4jVrdmU",
//     authDomain: "hacking-transitions.firebaseapp.com",
//     projectId: "hacking-transitions",
//     storageBucket: "hacking-transitions.appspot.com",
//     messagingSenderId: "976584743170",
//     appId: "1:976584743170:web:8242742a66651fa64fca1b",
//     measurementId: "G-F3H9RQP7ED"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export const auth = getAuth(app);
// app.auth().setPersistence(app.auth.Auth.Persistence.NONE)

// export { createUserWithEmailAndPassword };

// export defaultAuth;

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
