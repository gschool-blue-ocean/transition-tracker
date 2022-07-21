import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { CgEnter } from 'react-icons/cg'

function LoginModal({ invokeSetLogin, setShowLoginModal }) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        invokeSetLogin(true)
        console.log({ loginData })
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