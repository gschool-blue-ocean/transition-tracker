import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { auth, createUserWithEmailAndPassword } from '../Firebase'
import LoginContext from "../../Context/LoginContext"

function CreateAccountModal() {
    const { userData, invokeSetUserData, loading } = useContext(LoginContext)
    const [createAccData, setCreateAccData] = useState({

        username: '',
        password: '',
        verifyPassword: '',
        email: userData.email,
        etsDate: '',
        branch: '',
        dutyStation: '',
        city: '',
        state: '',
        mos: '',
        rank: '',
        terminalLeaveDate: '',
        dependents: '',
        relocation: '',
        degree: '',
        schooling: '',
        interests: ''
    })

    

    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/')
        console.log(createAccData)
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

    const handleCreateAcc = async () => {
        createUserWithEmailAndPassword(
            auth,
            createAccData.username,
            createAccData.password
        )
            .then((data) => {
                console.log(data)
            })
    }

    return ReactDOM.createPortal(
        <div className='createModalContainer'>
            <div className='createContainer'>

                <h1>Welcome</h1>
                <h3>Please fill in your information below.</h3>
                <br></br>
                <h3>User credintials</h3>
                <form className='createForm' onSubmit={handleSubmit}>
                    <div className="createInnerCredintials">
                        <div>
                            <p>User name:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='Desired Username'
                                name='username'
                                value={createAccData.username}
                                onChange={handleChange} />
                            <p>email:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='email'
                                value={createAccData.email}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <p>New password:</p>
                            <input
                                className='createInputBox'
                                type='password'
                                placeholder='Desired Password'
                                name='password'
                                value={createAccData.password}
                                onChange={handleChange} />
                            <p>Verify New Password:</p>
                            <input
                                className='createInputBox'
                                type='password'
                                placeholder='Verify Password'
                                name='verifyPassword'
                                value={createAccData.verifyPassword}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <h3>Service info</h3>
                    <div className="createInnerCredintials">
                        <div>
                            <p>ETS Date:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='etsDate'
                                value={createAccData.etsDate}
                                onChange={handleChange} />
                            <p>Branch of service:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='branch'
                                value={createAccData.branch}
                                onChange={handleChange} />
                            <p>MOS/Rate:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='mos'
                                value={createAccData.mos}
                                onChange={handleChange} />
                            <p>Rank:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='rank'
                                value={createAccData.rank}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <p>Duty Station:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='dutyStation'
                                value={createAccData.dutyStation}
                                onChange={handleChange} />
                            <p>City:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='city'
                                value={createAccData.city}
                                onChange={handleChange} />
                            <p>State:</p>
                            <input
                                className='createInputBox'
                                type='text'
                                placeholder='PaceHolderText'
                                name='state'
                                value={createAccData.state}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <p>Terminal Leave:</p>
                    <input
                        className='createDependentNumberInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='terminalLeaveDate'
                        value={createAccData.terminalLeaveDate}
                        onChange={handleChange} />
                    <h3>Dependents:</h3>
                    {/* here based on the input amount of dependents dinamicly render inputs for dependtes relationship to user */}
                    <p>Number of dependents:  <input
                        className='createDependentNumberInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='dependents'
                        value={createAccData.dependents}
                        onChange={handleChange} /></p>
                    <p>Relocating:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='relocation'
                        value={createAccData.relocation}
                        onChange={handleChange} />
                    <p>Degree:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='degree'
                        value={createAccData.degree}
                        onChange={handleChange} />
                    <p>Desired Schooling:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='schooling'
                        value={createAccData.schooling}
                        onChange={handleChange} />
                    <p>Interests:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='interests'
                        value={createAccData.interests}
                        onChange={handleChange} />

                    <input
                        type='submit'
                        className='createBtn createAccBtn'
                        value='Submit' />
                    
                    {/* <button
                        type='button'
                        className='loginBtn'
                        onClick={handleShowLoginModal}> Return to Log in <RiArrowGoBackFill /></button> */}
                </form>
            </div>

        </div >,
        document.getElementById('portal')
    )
}

export default CreateAccountModal