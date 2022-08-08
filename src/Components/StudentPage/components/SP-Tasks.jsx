import React, { useEffect, useState } from "react";

export default function SPTasks({ openModal, activeStudent }) {
   const [userTasks, setUserTasks] = useState(null);

   useEffect(() => {
      fetch(`https://hacking-transition.herokuapp.com/api/tasks/student/${activeStudent.user_id}`)
         .then((res) => res.json())
         .then((tasks) => {
            setUserTasks(tasks);
         });
   });
   // Pull All Tasks from DB for Selected User
   return (
      <div className="SDash--Tasks">
         <h4 id="StuTasks--Header">Tasks</h4>
         <>
            {userTasks.map((task) => {
               return; //this will return the task div to click on and set an activeTask state for modal data
            })}
         </>
      </div>
   );
}
