import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CgEnter } from 'react-icons/cg'
import AppContext from '../../Context/AppContext';
import LoginContext from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom'

function LoginModal({ invokeSetLogin, setShowLoginModal }) {
    let navigate = useNavigate()

    const { allUsersData, allCohortsData, loading, setLoading } = useContext(AppContext)
    const { userData, setUserData } = useContext(LoginContext)

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


    useEffect(() => {
        if (userData) {
            invokeSetLogin(true)
        }
    }, [userData])

    const handleSubmit = (e) => {
        e.preventDefault()
        removeErrorMsgs()
        handleLogin()
    }

    const removeErrorMsgs = () => {
        document.querySelectorAll('.errorMsg').forEach(elem => elem.classList.remove('show'))
    }

    const handleLogin = () => {
        setLoading(true)

        let inputData = {
            username: loginData.username,
            password: loginData.password
        }

        if (inputData.username.length === 0 || inputData.password.length === 0) {
            setLoading(false)
            return document.getElementById('blankLoginErrMsg').classList.add('show')
        }

        let foundUsername = checkUsernames(inputData.username)

        if (!foundUsername) {
            setLoading(false)
            return document.getElementById('usernameLoginErrMsg').classList.add('show')
        }

        fetch('https://hacking-transition.herokuapp.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)

                if (!data.username) {
                    return document.getElementById('passwordLoginErrMsg').classList.add('show')
                }

                else if (data.new_user) {
                    setUserData(data)
                    navigate('/createAccount')
                }

                else {
                    setUserData(data)
                    invokeSetLogin(true)
                    localStorage.setItem("currentUser", JSON.stringify(data))
                }
            })
    }

    const checkUsernames = (username) => {
        let result = false
        allUsersData.forEach(elem => {
            if (elem.username === username) {
                result = true
            }
        })
        return result
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

                <h1 className='loginTitle'>Hacking Transition</h1>
                <span id="blankLoginErrMsg" className='errorMsg'>Fields can not be blank!</span>

                <form className='loginForm' onSubmit={handleSubmit}>
                    <input
                        className='loginInputBox username'
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={loginData.username}
                        onChange={handleChange} />
                    <span id="usernameLoginErrMsg" className='errorMsg'>Username Not Found!</span>

                    <input
                        className='loginInputBox'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={loginData.password}
                        onChange={handleChange} />
                    <span id="passwordLoginErrMsg" className='errorMsg'>Incorrect Password!</span>


                    <button
                        type='submit'
                        className='loginBtn'>LOG IN <CgEnter /> </button>

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