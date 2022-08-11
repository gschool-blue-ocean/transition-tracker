import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import '../../../StyleSheets/AddNewStudentModal.css'

const AddStudentModal = ({ setShowAddStudentModal, viewClickedCohort, getStudentList }) => {


    const [formData, setFormData] = useState({
        first: '',
        last: '',
        email: '',
        generateEmail: true
    })

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            return setFormData((prevData) => {
                return {
                    ...prevData,
                    [e.target.name]: e.target.checked
                }
            })
        }

        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newUserData = {
            first: formData.first,
            last: formData.last,
            email: formData.email,
            username: formData.first + formData.last,
            password: viewClickedCohort.cohort_name,
            cohort_id: viewClickedCohort.cohort_id,
            cohort_name: viewClickedCohort.cohort_name,
            admin: false,
            new_user: true
        }

        fetch("https://hacking-transition.herokuapp.com/api/create/user", {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then((res) => res.json())
            .then(() => getStudentList(viewClickedCohort.cohort_id))
            .then(() => setShowAddStudentModal(false))
            .catch((err) => console.log(err));


        if (formData.generateEmail) {
            let emailSubject = `Welcome to Galvanize ${newUserData.first}!`

            let emailBody = `Hello ${newUserData.first}, %0D%0A %0D%0A You have been added to Cohort ${newUserData.cohort_name}! To log in for the first time, please navigate to https://hacking-transition.herokuapp.com/ %0D%0A %0D%0A Your temporary Username: ${newUserData.first + newUserData.last} (your first and last name without spaces) %0D%0A %0D%0A Your temporary Password: ${newUserData.cohort_name} (your cohort name)  %0D%0A %0D%0A %0D%0A Sincerely, %0D%0A %0D%0A Galvanize Admissions`
            window.location.href = `mailto:${formData.email}?subject=${emailSubject}&body=${emailBody}`
            // window.open(`mailto:${formData.email}?subject=${emailSubject}&body=${emailBody}`)
        }
    }

    const handleCancel = () => {
        setShowAddStudentModal(false)
    }

    return ReactDOM.createPortal(
        <div className='portalContainer'>

            <div className='addStudentModal'>
                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <h4 className='newStudentFormTitle'>Add new student information</h4>

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


                    <label
                        className='labelGenerateEmailCheckBox'
                        htmlFor='generateEmail'>
                        <input
                            id='generateEmail'
                            type='checkbox'
                            name='generateEmail'
                            onChange={handleChange}
                            checked={formData.generateEmail}
                        /> Auto generate email</label>


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
        </div >,
        document.getElementById('portal')
    )
    // return (<div>test portal</div>)
}

export default AddStudentModal