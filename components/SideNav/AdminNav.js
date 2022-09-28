import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import AppContext from "../../context/AppContext";
import LoginContext from "../../context/LoginContext";
import { Loading } from "../LoadingDisplay";
import style from '../../styles/SideNav.module.css'

export default function AdminNav({ viewClickedCohort, setActiveStudent, activeStudent }) {
   const { allUsersData, setLoading } = useContext(AppContext);
   const { userData } = useContext(LoginContext);
   const [cohortStudents, setCohortStudents] = useState(null);
   const [showAddStudentModal, setShowAddStudentModal] = useState(false)

   useEffect(() => {
      if (viewClickedCohort) {
         getStudentList(viewClickedCohort.cohort_id);
      }

      if (JSON.parse(localStorage.currentUser).admin === false || userData.admin === false) {
         getStudentList(userData.cohort_id)
      }
   }, [viewClickedCohort]);


   useEffect(() => {

      if (cohortStudents) {
          let index = 0;
         if(activeStudent){
            cohortStudents.forEach((stuData,i) => {
               let check = JSON.stringify(stuData);
               if(check == JSON.stringify(activeStudent)){
                  index = i;
               }
            })
            
            //index = cohortStudents.indexof(activeStudent);
         }
         setActiveStudent(cohortStudents[index])
         document.getElementById(cohortStudents[index].user_id).classList.add('activeStudent')

      }
   }, [cohortStudents])


   const handleClick = (e) => {

      document.querySelectorAll('.sideNav--StudentBtn').forEach(elem => elem.classList.remove('activeStudent'))

      setActiveStudent(cohortStudents[e.currentTarget.getAttribute('data-index')]);
      e.target.classList.toggle("activeStudent");
   };

   const getStudentList = (id) => {
      fetch(`https://hacking-transition.herokuapp.com/api/users/cohort/${id}`)
         .then((res) => res.json())
         .then((list) => setCohortStudents(list))
   };

   // console.log(cohortStudents);

   if (!cohortStudents) {
      setLoading(true);
      return <Loading />;
   } else {
      setLoading(false);

      const handleClickedAddStudentBtn = () => {
         setShowAddStudentModal(!showAddStudentModal)
      }
      return (

         <div className={style.sideNav}>

            <button onClick={handleClickedAddStudentBtn} id="add-cohort-btn">+</button>
            {showAddStudentModal && <AddStudentModal setShowAddStudentModal={setShowAddStudentModal} viewClickedCohort={viewClickedCohort} getStudentList={getStudentList} />}

            <h3>{viewClickedCohort ? viewClickedCohort.cohort_name : userData.cohort_name}</h3>
            <div>
               {cohortStudents.map((student, index) => {
                  return (
                     <div>
                        <button
                           className={style.sideNav-StudentBtn}
                           id={student.user_id}
                           data-index={index}
                           key={student.user_id}
                           onClick={handleClick}
                        >
                           {student.first} {student.last}
                        </button>
                     </div>
                  );
               })}
            </div>
         </div>
      );
   }
}

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
        <div className={style.portalContainer}>

            <div className={style.addStudentModal}>
                <form className={style.addStudentForm} onSubmit={handleSubmit}>
                    <h4 className={style.newStudentFormTitle}>Add new student information</h4>

                    <input
                        required
                        data-error='Please Enter FirstName'
                        className={style.addStudentFormInput}
                        type='text'
                        placeholder="Student First name"
                        onChange={handleChange}
                        name='first'
                        value={formData.first} />
                    <input
                        required
                        className={style.addStudentFormInput}
                        type='text'
                        placeholder="Student Last name"
                        onChange={handleChange}
                        name='last'
                        value={formData.last} />

                    <input
                        required
                        className={style.addStudentFormInput}
                        type='email'
                        placeholder="Student Email Address"
                        onChange={handleChange}
                        name='email'
                        value={formData.email} />


                    <label
                        className={style.labelGenerateEmailCheckBox}
                        htmlFor='generateEmail'>
                        <input
                            id='generateEmail'
                            type='checkbox'
                            name='generateEmail'
                            onChange={handleChange}
                            checked={formData.generateEmail}
                        /> Auto generate email</label>


                    <input
                        className={`${style.addStudentFormButton} ${style.createStudent}`}
                        type='submit'
                        value='Create Student' />
                    <input
                        className={`${style.addStudentFormButton} ${style.cancel}`}
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