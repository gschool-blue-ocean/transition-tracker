// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8w3V0Chzdg8_6Z3nHs_Gwd5qo4jVrdmU",
    authDomain: "hacking-transitions.firebaseapp.com",
    projectId: "hacking-transitions",
    storageBucket: "hacking-transitions.appspot.com",
    messagingSenderId: "976584743170",
    appId: "1:976584743170:web:8242742a66651fa64fca1b",
    measurementId: "G-F3H9RQP7ED"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
// app.auth().setPersistence(app.auth.Auth.Persistence.NONE)

export { createUserWithEmailAndPassword, signInWithEmailAndPassword };

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


//!!! ====== from login modal...
    // const validateUserLoginData = () => {
        //     signInWithEmailAndPassword(auth, loginData.username, loginData.password)
        //         .then(({ user }) => {
        //             // user.getIdToken().then(token => console.log(token))
        //             user.getIdToken().then((idToken) => {
        //                 fetch('https://hacking-transition.herokuapp.com/api/login', {
        //                     method: "POST",
        //                     headers: {
        //                         Accept: "application/json",
        //                         "Content-type": "application/json",
        //                         "CSRF-Token": Cookies.get('_csrf')
        //                     },
        //                     body: JSON.stringify({ idToken })
        //                 })

        //             })
        //                 // .then(() => app.auth().signOut())
        //                 .then(() => invokeSetLogin(true))

        //                 .catch(err => console.error(err))
        //         })
        //     //         return fetch('https://hacking-transition.herokuapp.com/api/login', {
        //     //             method: "POST",
        //     //             headers: {
        //     //                 Accept: "application/json",
        //     //                 "Content-type": "application/json",
        //     //                 "CSRF-Token": Cookies.get(user),
        //     //             },
        //     //             body: JSON.stringify({ idToken })
        //     //         })
        //     //     })
        //     // })
        //     // .then((data) => {
        //     //     console.log(data)
        //     //     // return app.auth().signOut();
        //     // })
        //     // .catch((err) => {
        //     //     if (err) {
        //     //         console.error(err)
        //     //     }
        //     // })
        //     // .then(() => {
        //     //     alert('Success')
        //     // })
        //     // allUsersData.forEach((elem) => {
        //     //     if (loginData.username === elem.username && loginData.password === elem.password) {
        //     //         elem.new_user ? navigate("/createAccount") : invokeSetLogin(true)
        //     //         return console.log(elem)
        //     //     }
        //     // });


        //     // return console.warn('failed login attempt')
        //     // invokeSetLogin(true)
        // }