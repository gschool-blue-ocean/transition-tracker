import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import LoginContext from "../../Context/LoginContext"

//not verifying password
function CreateAccountModal() {
    const { userData, invokeSetUserData, loading } = useContext(LoginContext)
    const [createAccData, setCreateAccData] = useState({
        first: userData.first,
        last: userData.last,
        email: userData.email,
        username: userData.username,
        password: '',
        rank: '',
        mos: '',
        interests: '',   
        branch: '',
        duty_station: '',
        taps_complete: true,
        leave_start_date: '',
        ets_date: '',
        planning_to_relocate: false,
        city: '',
        state: '',
        has_dependents: false,
        highest_education: '',
        seeking_further_education: false,
        admin: userData.admin,
        cohort_name: userData.cohort_name,
        cohort_id: userData.cohort_id,
        new_user: false, 
        
    })

    let verifyPassword = '';
    let dependents = '';
    //if statement for redirecting when not logged in
    const updateUser = () => {
        fetch(`http://hacking-transition.herokuapp.com/api/update/user/${userData.user_id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(createAccData)
        })
        .catch(console.error())        
    }
    console.log(userData)
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser()
        invokeSetUserData({}); 
        localStorage.clear();
        console.log(createAccData) 
        navigate('/')
        alert('Account successfuly created! Please log in')
    }

    const handleChange = (e) => {
        setCreateAccData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
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
                                value={verifyPassword}
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
                                name='ets_date'
                                value={createAccData.ets_date}
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
                                name='duty_station'
                                value={createAccData.duty_station}
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
                        name='leave_start_date'
                        value={createAccData.leave_start_date}
                        onChange={handleChange} />
                    <h3>dependents:</h3>
                    {/* here based on the input amount of dependents dinamicly render inputs for dependtes relationship to user */}
                    <p>Number of dependents:  <input
                        className='createDependentNumberInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='has_dependents'
                        value={dependents}
                        onChange={handleChange} /></p>
                    <p>Relocating:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='planning_to_relocate'
                        value={createAccData.planning_to_relocate}
                        onChange={handleChange} />
                    <p>Education:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='highest_education'
                        value={createAccData.highest_education}
                        onChange={handleChange} />
                    <p>Desired Schooling:</p>
                    <input
                        className='createInputBox'
                        type='text'
                        placeholder='PaceHolderText'
                        name='seeking_further_education'
                        value={createAccData.seeking_further_education}
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