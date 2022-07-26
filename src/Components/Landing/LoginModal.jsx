import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CgEnter } from 'react-icons/cg'
import AppContext from '../../Context/AppContext';
import LoginContext from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom'
// import { auth, signInWithEmailAndPassword } from '../Firebase'
// import { app } from '../Firebase'
// import { CookiesProvider, withCookies, Cookies, useCookies } from 'react-cookie';
// import Cookies from 'js-cookie'

function LoginModal({ invokeSetLogin, setShowLoginModal }) {
    const { allUsersData, allCohortsData } = useContext(AppContext)
    const { setUserData } = useContext(LoginContext)

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            setUserData(JSON.parse(currentUser));
            invokeSetLogin(true)
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin()
    }

    let navigate = useNavigate()
    const handleLogin = () => {

        let inputData = {
            username: loginData.username,
            password: loginData.password
        }

        fetch('https://hacking-transition.herokuapp.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data === 'string') {
                    alert(data)
                }
                else if (data.newUser) {
                    navigate('/createAccount')
                }
                else {
                    setUserData(data)
                    invokeSetLogin(true)
                    localStorage.setItem("currentUser", JSON.stringify(data))
                }
            })
    }
    const handleChange = (e) => {
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [e.target.name]: e.target.value
            }
        })
    }

    // const handleHash = () => {
    //     allUsersData.forEach(elem => {
    //         let data = {
    //             username: elem.username,
    //             password: elem.password
    //         }

    //         fetch('https://hacking-transition.herokuapp.com/api/hash', {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data)
    //         })
    //             .then(res => res.json())
    //             .then(data => console.log(data))
    //             .catch(err => console.warn(err))
    //     })
    // }

    return ReactDOM.createPortal(
        <div className='modalContainer'>
            {/* <button onClick={handleHash}>CLICK TO HASH</button> */}
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