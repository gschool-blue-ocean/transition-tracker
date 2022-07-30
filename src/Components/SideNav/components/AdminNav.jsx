import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import LoginContext from "../../../Context/LoginContext";
import Loading from "../../LoadingDisplay/Loading";

export default function AdminNav({ viewClickedCohort }) {
   const { allUsersData, setLoading } = useContext(AppContext);
   const { userData } = useContext(LoginContext)
   const [cohortStudents, setCohortStudents] = useState(null);
   const [activeStudent, setActiveStudent] = useState(null);


   useEffect(() => {
      if (viewClickedCohort) {
         getStudentList(viewClickedCohort.cohort_id);
      }

      if (userData.admin === false) {
         getStudentList(userData.cohort_id)
      }
   }, [viewClickedCohort]);

   const handleClick = (e) => {
      document.querySelectorAll('.sideNav--StudentBtn').forEach(elem => elem.classList.remove('activeStudent'))

      setActiveStudent(e.target.id);
      e.target.classList.toggle("activeStudent");
   };

   const getStudentList = (id) => {
      fetch(`https://hacking-transition.herokuapp.com/api/users/cohort/${id}`)
         .then((res) => res.json())
         .then((list) => setCohortStudents(list));
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
               {cohortStudents.map((student) => {
                  return (
                     <div>
                        <button
                           className={"sideNav--StudentBtn"}
                           id={student.user_id}
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
