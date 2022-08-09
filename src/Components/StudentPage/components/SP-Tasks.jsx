import React, { useEffect, useState } from "react";
import Loading from "../../LoadingDisplay/Loading";

export default function SPTasks({ openModal, activeStudent }) {
   const [studentTasks, setStudentTasks] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      if (activeStudent.user_id) {
         fetch(`https://hacking-transition.herokuapp.com/api/tasks/student/${activeStudent.user_id}`)
            .then((res) => res.json())
            .then((tasks) => {
               setLoading(false);
               setStudentTasks(tasks);
            });
      }
   }, [activeStudent]);

   if (loading) {
      return <Loading />;
   } else {
      return (
         <div className="SDash--Tasks">
            <h4 id="StuTasks--Header">Tasks</h4>
            <>
               {studentTasks.length === 0 ? (
                  <div>{activeStudent.first} has not started a task</div>
               ) : (
                  studentTasks.map((task) => {
                     return (
                        <div className="StuTasks--Card" id={task.task_id} key={task.task_id} onClick={openModal}>
                           {task.title}
                        </div>
                     );
                  })
               )}
            </>
         </div>
      );
   }
}
