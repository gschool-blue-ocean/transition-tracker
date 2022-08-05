import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import LoginContext from "../../../Context/LoginContext";
import Loading from "../../LoadingDisplay/Loading";
import { MdOutlineAddCircleOutline, MdOutlineAddCircle } from 'react-icons/md'
import AddStudentModal from "./AddStudentModal";

export default function AdminNav({ viewClickedCohort, setActiveStudent, activeStudent }) {
   const { allUsersData, setLoading } = useContext(AppContext);
   const { userData } = useContext(LoginContext)
   const [cohortStudents, setCohortStudents] = useState(null);
   const [showAddStudentModal, setShowAddStudentModal] = useState(false)

   useEffect(() => {
      if (viewClickedCohort) {
         getStudentList(viewClickedCohort.cohort_id);
      }

      if (userData.admin === false) {
         getStudentList(userData.cohort_id)
      }
   }, [viewClickedCohort]);


   useEffect(() => {

      if (cohortStudents && cohortStudents.length > 0) {
         setActiveStudent(cohortStudents[0])
         document.getElementById(cohortStudents[0].user_id).classList.add('activeStudent')

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

         <div className="sideNav">

            <button onClick={handleClickedAddStudentBtn} id="add-cohort-btn">+</button>
            {showAddStudentModal && <AddStudentModal setShowAddStudentModal={setShowAddStudentModal} viewClickedCohort={viewClickedCohort} getStudentList={getStudentList} />}

            <h3>{viewClickedCohort ? viewClickedCohort.cohort_name : userData.cohort_name}</h3>
            <div>
               {cohortStudents.map((student, index) => {
                  return (
                     <div>
                        <button
                           className={"sideNav--StudentBtn"}
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
