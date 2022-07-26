import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CgEnter } from 'react-icons/cg'
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../Firebase'
import { app } from '../Firebase'
// import { CookiesProvider, withCookies, Cookies, useCookies } from 'react-cookie';
// import Cookies from 'js-cookie'

function LoginModal({ invokeSetLogin, setShowLoginModal }) {
    const { allUsersData, allCohortsData } = useContext(AppContext)

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {

    })

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin()
    }

    const handleLogin = () => {

        let inputData = {
            username: loginData.username,
            password: loginData.password
        }

        fetch('https://hacking-transition.herokuapp.com/api/login', {
            method: 'POST',
            body: JSON.stringify(inputData)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    // let navigate = useNavigate()
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

    const handleChange = (e) => {
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [e.target.name]: e.target.value
            }
        })
    }

    // const handleShowCreateAccModal = () => {
    //     setShowLoginModal(false)
    // }

    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input
                        className='loginInputBox'
                        type='text'
                        placeholder='User name'
                        name='username'
                        value={loginData.username}
                        onChange={handleChange} />
                    <input
                        className='loginInputBox'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={loginData.password}
                        onChange={handleChange} />
                    <button
                        type='submit'
                        className='loginBtn'>Log in  <CgEnter /> </button>

                    {/* <button
                        type='button'
                        className='loginBtn createAccBtn'
                        onClick={handleShowCreateAccModal}>Create an Account</button> */}
                </form>
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default LoginModal