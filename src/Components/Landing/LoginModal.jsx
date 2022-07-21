import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import auth from '../Firebase'

function LoginModal({ changeSetLogin }) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        changeSetLogin(true)
    }

    const handleChange = (e) => {
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCreateAcc = () => {
        auth.createUserWithEmailAndPassword(

        )
    }
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
                    <input
                        type='submit'
                        className='loginBtn'
                        onChange={handleChange}
                        value='Log in' />

                    <button
                        type='button'
                        className='loginBtn'
                        onClick={handleCreateAcc}>Create Account</button>
                </form>
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default LoginModal