import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SPTaskModal from "./SP-TaskModal";
import Loading from "../../LoadingDisplay/Loading";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--clr-primary-accent)",
      borderRadius: "10px",
      width: "35%",
   },
};

export default function SPTasks({ activeStudent }) {
   const [studentTasks, setStudentTasks] = useState([]);
   const [loading, setLoading] = useState(true);
   const [modalIsOpen, setIsOpen] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   function handleClick(task) {
      setSelectedTask(task);
      openModal();
      console.log(selectedTask);
   }

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
                        <div
                           className="StuTasks--Card"
                           id={task.task_id}
                           key={task.task_id}
                           onClick={() => {
                              handleClick(task);
                           }}
                        >
                           {task.title}
                        </div>
                     );
                  })
               )}
            </>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
               <SPTaskModal task={selectedTask} />
            </Modal>
         </div>
      );
   }
}
