import e from 'cors'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../../../StyleSheets/AddNewStudentModal.css'

const AddStudentModal = ({ setShowAddStudentModal, cohortID }) => {

    const [formData, setFormData] = useState({
        first: '',
        last: '',
        email: ''
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

        let data = {
            first: formData.first,
            last: formData.last,
            email: formData.email,
            username: '',
            password: '',
            cohort_id: cohortID,
            admin: false,
            new_user: true
        }
        e.preventDefault()
        console.log(data)
    }
    const handleCancel = () => {
        setShowAddStudentModal(false)
    }

    return ReactDOM.createPortal(
        <div className='portalContainer'>
            <div className='addStudentModal'>
                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <input
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