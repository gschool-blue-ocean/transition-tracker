import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function LoginModal({ changeSetLogin }) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        changeSetLogin(true)
        fetch('https://hacking-transition.herokuapp.com/api/users')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
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

    }
    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input
                        class='loginInputBox'
                        type='text'
                        placeholder='User name'
                        name='username'
                        value={loginData.username}
                        onChange={handleChange} />
                    <input
                        class='loginInputBox'
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