import e from 'cors'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../../../StyleSheets/AddNewStudentModal.css'

const AddStudentModal = ({ setShowAddStudentModal, viewClickedCohort }) => {

    const [formData, setFormData] = useState({
        first: null,
        last: null,
        email: null
    })

    const handleChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.first) {
            return alert('First Name can not be blank!')
        }
        if (!formData.last) {
            return alert('Last Name can not be blank!')
        }
        if (!formData.email) {
            return alert('Email can not be blank!')
        }

        let data = {
            first: formData.first,
            last: formData.last,
            email: formData.email,
            username: formData.first + formData.last,
            password: viewClickedCohort.cohort_name,
            cohort_id: viewClickedCohort.cohort_id,
            admin: false,
            new_user: true
        }
        console.log(viewClickedCohort)
        console.log(data)
    }
    const handleCancel = () => {
        setShowAddStudentModal(false)
    }

    return ReactDOM.createPortal(
        <div className='portalContainer'>
            <div className='addStudentModal'>
                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <div style={!formData.first ? { 'display': 'block' } : { 'display': 'none' }}>Name Cant be blank</div>
                    <input
                        id="firstname"
                        data-error='Please Enter FirstName'
                        className='addStudentFormInput'
                        type='text'
                        placeholder="Student's First name"
                        onChange={handleChange}
                        name='first'
                        value={formData.first} />
                    <input
                        className='addStudentFormInput'
                        type='text'
                        placeholder="Student's Last name"
                        onChange={handleChange}
                        name='last'
                        value={formData.last} />
                    <input
                        className='addStudentFormInput'
                        type='email'
                        placeholder="Student's Email Address"
                        onChange={handleChange}
                        name='email'
                        value={formData.email} />
                    <input
                        className='addStudentFormButton createStudent'
                        type='submit'
                        value='Create Student' />
                    <input
                        className='addStudentFormButton cancel'
                        onClick={handleCancel}
                        type='button'
                        value='Cancel' />
                </form>
            </div>
        </div>,
        document.getElementById('portal')
    )
    // return (<div>test portal</div>)
}

export default AddStudentModal