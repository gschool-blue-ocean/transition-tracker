import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CgEnter } from 'react-icons/cg'
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../Firebase'


function LoginModal({ invokeSetLogin, setShowLoginModal }) {
    const { allUsersData, allCohortsData } = useContext(AppContext)

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        validateUserLoginData()
    }

    let navigate = useNavigate()
    const validateUserLoginData = () => {
        signInWithEmailAndPassword(loginData.username, loginData.password)
            .then(({ user }) => {
                return user.getIdToken().then((idToken) => {
                    return fetch(`${window.location.origin}/api/create/user`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        },
                        body: JSON.stringify({ idToken })
                    })
                }
                )
            })
        // allUsersData.forEach((elem) => {
        //     if (loginData.username === elem.username && loginData.password === elem.password) {
        //         elem.new_user ? navigate("/createAccount") : invokeSetLogin(true)
        //         return console.log(elem)
        //     }
        // });


        // return console.warn('failed login attempt')
        // invokeSetLogin(true)
    }
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