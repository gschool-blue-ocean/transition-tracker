import React, { useEffect, useState } from "react";
import Loading from "../../LoadingDisplay/Loading";

export default function SPTasks({ openModal, activeStudent }) {
   const [selectedStudent, setSelectedStudent] = useState(activeStudent.user_id);
   const [studentTasks, setStudentTasks] = useState(null);

   useEffect(() => {
      setSelectedStudent(activeStudent.user_id);
      fetch(`https://hacking-transition.herokuapp.com/api/tasks/student/${activeStudent.user_id}`)
         .then((res) => res.json())
         .then((tasks) => {
            console.log(tasks);
            setStudentTasks(tasks);
         });
   }, [activeStudent]);

   if (!activeStudent) {
      return <Loading />;
   } else if (!studentTasks) {
      return <Loading />;
   } else {
      return (
         <div className="SDash--Tasks">
            <h4 id="StuTasks--Header">Tasks</h4>
            <>
               {studentTasks.map((task) => {
                  return <div>{task.title}</div>;
               })}
            </>
         </div>
      );
   }
}
