import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SPTaskModal from "./SP-TaskModal";
import Loading from "../../LoadingDisplay/Loading";
import SPEditTask from "./SP-EditTask";
import SPCreateTask from "./SP-CreateTask";

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
   const [editTask, setEditTask] = useState(false);
   const [createTask, setCreateTask] = useState(false);

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
      setEditTask(false);
      setCreateTask(false);
   }

   function viewTask(task) {
      setSelectedTask(task);
      openModal();
   }

   function modalRendering() {
      if (editTask) {
         return <SPEditTask task={selectedTask} closeModal={setIsOpen} cancelEdit={setEditTask} />;
      } else if (createTask) {
         return <SPCreateTask closeModal={setIsOpen} cancelCreate={setCreateTask} />;
      } else {
         return <SPTaskModal task={selectedTask} />;
      }
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
            <button
               onClick={() => {
                  setCreateTask(true);
                  openModal();
               }}
            >
               Create Task
            </button>
            <>
               {studentTasks.length === 0 ? (
                  <div>{activeStudent.first} has not started a task</div>
               ) : (
                  studentTasks.map((task) => {
                     return (
                        <div className="StuTasks--Card">
                           <div
                              id={task.task_id}
                              key={task.task_id}
                              onClick={() => {
                                 viewTask(task);
                              }}
                           >
                              {task.title}
                           </div>
                           <button
                              onClick={() => {
                                 setEditTask(true);
                                 openModal();
                                 setSelectedTask(task);
                              }}
                           >
                              Edit
                           </button>
                        </div>
                     );
                  })
               )}
            </>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
               {/* {editTask ? (
                  <SPEditTask task={selectedTask} closeModal={setIsOpen} cancelEdit={setEditTask} />
               ) : (
                  <SPTaskModal task={selectedTask} />
               )} */}
               {modalRendering()}
            </Modal>
         </div>
      );
   }
}
