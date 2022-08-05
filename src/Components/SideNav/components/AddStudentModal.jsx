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
        let emailSubject = `Welcome to Galvanize ${data.first}!`
        let emailBody = `this is a test body\ntest ne line` + "\n"
        window.open(`mailto:${formData.email}?subject=${emailSubject}&body=${emailBody}`)

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

                    <input
                        required
                        data-error='Please Enter FirstName'
                        className='addStudentFormInput'
                        type='text'
                        placeholder="Student First name"
                        onChange={handleChange}
                        name='first'
                        value={formData.first} />
                    <input
                        required
                        className='addStudentFormInput'
                        type='text'
                        placeholder="Student Last name"
                        onChange={handleChange}
                        name='last'
                        value={formData.last} />
                    <input
                        required
                        className='addStudentFormInput'
                        type='email'
                        placeholder="Student Email Address"
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