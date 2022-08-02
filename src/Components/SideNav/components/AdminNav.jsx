import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import LoginContext from "../../../Context/LoginContext";
import Loading from "../../LoadingDisplay/Loading";

export default function AdminNav({ viewClickedCohort, setActiveStudent, activeStudent }) {
   const { allUsersData, setLoading } = useContext(AppContext);
   const { userData } = useContext(LoginContext)
   const [cohortStudents, setCohortStudents] = useState(null);

   useEffect(() => {
      if (viewClickedCohort) {
         getStudentList(viewClickedCohort.cohort_id);
      }

      if (userData.admin === false) {
         getStudentList(userData.cohort_id)
      }
   }, [viewClickedCohort]);


   useEffect(() => {

      if (cohortStudents) {
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

      //-Neo: We can move the logic from the H3 on line 49 to render the sideNav
      //  only if an Admin is logged in 
      return (

         <div className="sideNav">
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
