import react, { useState } from 'react'
import ReactDOM from 'react-dom'

const EditStudentModal = ({ activeStudent, setShowEditStudentModal }) => {

    const [formData, setFormData] = useState({
        first: activeStudent.first,
        last: activeStudent.last,
        email: activeStudent.email,
        username: activeStudent.username,
        password: activeStudent.password,
        rank: activeStudent.rank,
        branch: activeStudent.branch,
        duty_station: activeStudent.duty_station,
        taps_complete: activeStudent.taps_complete,
        leave_start_date: convertDateToIso(activeStudent.leave_start_date),
        ets_date: convertDateToIso(activeStudent.ets_date),
        planning_to_relocate: activeStudent.planning_to_relocate,
        city: activeStudent.city,
        state: activeStudent.state,
        has_dependents: activeStudent.has_dependents,
        highest_education: activeStudent.highest_education,
        seeking_further_education: activeStudent.seeking_further_education,
        admin: activeStudent.admin,
        cohort_name: activeStudent.cohort_name,
        cohort_id: activeStudent.cohort_id,
        new_user: activeStudent.new_user,
        mos: activeStudent.mos,
        interests: activeStudent.interests
    })

    function convertDateToIso(date) {
        let newDate = new Date(date)
        let dateArray = newDate.toLocaleDateString().split('/')
        let year = dateArray[2]
        let day = dateArray[1].length > 1 ? dateArray[1] : `0${dateArray[1]}`
        let month = dateArray[0].length > 1 ? dateArray[0] : `0${dateArray[0]}`

        return `${year}-${month}-${day}`
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = () => {

    }

    const handleCancel = () => {
        setShowEditStudentModal(false)
    }

    return ReactDOM.createPortal(
        <div className='portalContainer'>
            <div className='addStudentModal'>

                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <h4 className='newStudentFormTitle'>Edit student information</h4>

                    <label>First
                        <input
                            id='editStudentFirstName'
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student First name"
                            onChange={handleChange}
                            name='first'
                            value={formData.first} /></label>


                    <label>Last
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student Last name"
                            onChange={handleChange}
                            name='last'
                            value={formData.last} />
                    </label>

                    <label>Email
                        <input
                            required
                            className='addStudentFormInput'
                            type='email'
                            placeholder="Student Email Address"
                            onChange={handleChange}
                            name='email'
                            value={formData.email} />
                    </label>

                    <label>Rank
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student Rank"
                            onChange={handleChange}
                            name='rank'
                            value={formData.rank} />
                    </label>

                    <label>Branch
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student Branch of Service"
                            onChange={handleChange}
                            name='branch'
                            value={formData.branch} />
                    </label>

                    <label>Duty Station
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student Duty Station"
                            onChange={handleChange}
                            name='duty_station'
                            value={formData.duty_station} />
                    </label>

                    <label>Leave start date
                        <input
                            required
                            className='addStudentFormInput'
                            type='date'
                            onChange={handleChange}
                            name='leave_start_date'
                            value={formData.leave_start_date} />
                    </label>

                    <label>ETS date
                        <input
                            required
                            className='addStudentFormInput'
                            type='date'
                            onChange={handleChange}
                            name='ets_date'
                            value={formData.ets_date} />
                    </label>

                    <label>City
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student City"
                            onChange={handleChange}
                            name='city'
                            value={formData.city} />
                    </label>

                    <label>State
                        <input
                            required
                            className='addStudentFormInput'
                            type='text'
                            placeholder="Student State"
                            onChange={handleChange}
                            name='state'
                            value={formData.state} />
                    </label>


                    <label>
                        <input
                            type='checkbox'
                            name='taps_complete'
                            onChange={handleChange}
                            checked={formData.taps_complete}
                        /> Taps complete ?</label>

                    <label
                    // className='labelGenerateEmailCheckBox'
                    >
                        <input
                            type='checkbox'
                            name='planning_to_relocate'
                            onChange={handleChange}
                            checked={formData.planning_to_relocate}
                        /> Planning to relocate ?</label>


                    <input
                        className='addStudentFormButton createStudent'
                        type='submit'
                        value='Update Student' />

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
}

export default EditStudentModal