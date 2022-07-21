import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { auth, createUserWithEmailAndPassword } from '../Firebase'
import { useNavigate } from 'react-router-dom'

function CreateAccountModal() {

    const [createAccData, setCreateAccData] = useState({
        username: '',
        password: '',
        verifyPassword: ''
    })


    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/')
        alert('Account successfuly created! Please log in')
        handleCreateAcc()
    }

    const handleChange = (e) => {
        setCreateAccData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCreateAcc = () => {
        // createUserWithEmailAndPassword(
        //     auth,
        //     createAccData.username,
        //     createAccData.password
        // ).then((user) => console.log(user))
        //     .catch((err) => console.error(err))
    }

    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input
                        className='loginInputBox'
                        type='text'
                        placeholder='Desired Username'
                        name='username'
                        value={createAccData.username}
                        onChange={handleChange} />
                    <input
                        className='loginInputBox'
                        type='password'
                        placeholder='Desired Password'
                        name='password'
                        value={createAccData.password}
                        onChange={handleChange} />
                    <input
                        className='loginInputBox'
                        type='password'
                        placeholder='Verify Password'
                        name='verifyPassword'
                        value={createAccData.verifyPassword}
                        onChange={handleChange} />
                    <input
                        type='submit'
                        className='loginBtn createAccBtn'
                        value='Submit' />

                    {/* <button
                        type='button'
                        className='loginBtn'
                        onClick={handleShowLoginModal}> Return to Log in <RiArrowGoBackFill /></button> */}
                </form>
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default CreateAccountModal