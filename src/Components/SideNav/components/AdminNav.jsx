import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import Loading from "../../LoadingDisplay/Loading";

export default function AdminNav({ viewClickedCohort }) {
   const { allUsersData, setLoading } = useContext(AppContext);
   const [cohortStudents, setCohortStudents] = useState(null);
   const [activeStudent, setActiveStudent] = useState(null);


   useEffect(() => {
      if (viewClickedCohort) {
         console.log(viewClickedCohort)
         getStudentList(viewClickedCohort.cohort_id);

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
      return (
         <div className="sideNav">
            <h3>{viewClickedCohort.cohort_name}</h3>
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
