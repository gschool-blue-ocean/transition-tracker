import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import Loading from "../../LoadingDisplay/Loading";

export default function AdminNav() {
   const { allUsersData, setLoading } = useContext(AppContext);
   const [cohortStudents, setCohortStudents] = useState(null);
   const [activeStudent, setActiveStudent] = useState(null);

   let id = 1;

   useEffect(() => {
      getStudentList(id);
   }, []);

   const handleClick = (e) => {
      setActiveStudent(e.target.id);
      e.target.classList.toggle("activeStudent");
   };

   const getStudentList = (id) => {
      fetch(`https://hacking-transition.herokuapp.com/api/users/cohort/${id}`)
         .then((res) => res.json())
         .then((list) => setCohortStudents(list));
   };

   console.log(cohortStudents);

   if (!cohortStudents) {
      setLoading(true);
      return <Loading />;
   } else {
      setLoading(false);
      return (
         <div className="sideNav">
            <h3>MSCP-12</h3>
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
