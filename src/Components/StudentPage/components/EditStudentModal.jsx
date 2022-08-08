import react, { useState } from 'react'
import ReactDOM from 'react-dom'

const EditStudentModal = ({ activeStudent }) => {

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
        leave_start_date: activeStudent.leave_start_date,
        ets_date: activeStudent.ets_date,
        planning_to_relocate: activeStudent.planning_to_relocate,
        city: activeStudent.city,
        state: activeStudent.state,
        has_dependents: activeStudent.has_dependents,
        highest_education: activeStudent.highest_education,
        seeking_further_education: activeStudent,
        admin: activeStudent,
        cohort_name: activeStudent,
        cohort_id: activeStudent,
        new_user: activeStudent,
        mos: activeStudent,
        interests: activeStudent
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return ReactDOM.createPortal(
        <div className='portalContainer'>
            <div className='addStudentModal'>

                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <h4 className='newStudentFormTitle'>Edit student information</h4>

                    <input

                    />

                </form>

            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default EditStudentModal