import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import SPTasks from "./components/SP-Tasks";
import SPETStag from "./components/SP-ETStag";
import SPDependents from "./components/SP-Dependents";
import SPTaskModal from "./components/SP-TaskModal";
import "../../StyleSheets/StudentPage.css";
import SideNav from "../SideNav/SideNav";
import LoginContext from "../../Context/LoginContext";
import ChatModal from "../../Components/Chat/ChatModal";
import { FiEdit } from 'react-icons/fi'
import EditStudentModal from "./components/EditStudentModal";

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
      width: "30%",
   },
};

// Modal.setAppElement(".AppContainer");

export default function StudentPage({ modalIsOpen, setModalIsOpen, activeStudent, setActiveStudent, allUsersData, socket, viewClickedCohort }) {
   const { userData } = useContext(LoginContext);
   const [activeStudent, setActiveStudent] = useState({});
   const [showEditStudentModal, setShowEditStudentModal] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);

   useEffect(() => {
      console.log(userData)
      if (!userData.admin) {
         document.querySelector(".test--grid").classList.add("studentView");
         setActiveStudent(userData);
      }
   }, []);

   function openModal() {
      setIsOpen(true);
   }
      })
   }, [])

   useEffect(() => {
      if (!userData.admin) {
         console.log(userData)
         document.querySelector('.test--grid').classList.add('studentView')
         // setActiveStudent(userData)
      }
   }, [userData]);

   function closeModal() {
      setModalIsOpen(false);
   }
   const handleEditBtnClicked = (e) => {
      setShowEditStudentModal(!showEditStudentModal)
   }

   return (
      <div className="test--grid">
         {JSON.parse(localStorage.currentUser).admin || userData.admin ? (
            <SideNav
               viewClickedCohort={viewClickedCohort}
               activeStudent={activeStudent}
               setActiveStudent={setActiveStudent}
            />
         ) : null}
         <div className="StudentDash--Wrapper">
            <div className="SDash--Header">
               <h3 id="StuHeader--Name">
                  {activeStudent.first} {activeStudent.last}
               </h3>
               <p id="StuHeader--Branch">{activeStudent.branch}</p>
               <SPETStag userETS={activeStudent.ets_date} />
            </div>

            {/* User Data Card */}
            <div className="SDash--Info-card">

               <div className="infoCard--container">

                  <ul>
                     <div >
                        {showEditStudentModal && <EditStudentModal userData={userData} setShowEditStudentModal={setShowEditStudentModal} activeStudent={activeStudent} setActiveStudent={setActiveStudent} />}
                        <div onClick={handleEditBtnClicked} className="editStudentBtnSpan"><FiEdit className="editStudentInfoBtn" /><span className="editStudentToolTip">Edit</span></div>
                        <h4 className="text-left">Personal Info</h4>
                     </div>

                     <li>
                        <span className="title"> Email: </span>
                        <span className="answer">{activeStudent.email}</span>
                     </li>

                     <li>
                        <span className="title under-line"> MOS: </span>
                        <span className="answer"> {activeStudent.mos} </span>
                     </li>

                     <li>
                        <span className="title"> Duty Station: </span>
                        <span className="answer"> {activeStudent.duty_station}</span>
                     </li>

                     <li>
                        <span className="title"> Terminal Leave: </span>
                        <span className="answer"> {activeStudent.leave_start_date}</span>
                     </li>

                     <li>
                        <span className="title"> ETS: </span>
                        <span className="answer"> {activeStudent.ets_date} </span>
                     </li>

                     <li>
                        <span className="title"> TAP Status: </span>
                        <span className="answer"> {activeStudent.taps_complete ? "Yes" : "No"} </span>
                     </li>

                     <li>
                        <h4 id="depends" className="text-left">
                           Dependents
                        </h4>
                        <SPDependents /> {/* // Pass in dependent info */}
                     </li>

                     <li>
                        <h4 className="text-left"> Education </h4>
                        <span className="title"> Degree: </span>
                        <span className="answer"> {activeStudent.highest_education}</span>
                     </li>

                     <li>
                        <h4 className="text-left"> Interests </h4>
                        <span className="answer">{activeStudent.interests}</span>
                     </li>

                     <li>
                        <h4 className="text-left"> Relocation </h4>
                        <span className="title"> Planning to Relocate?: </span>
                        <span className="answer"> {activeStudent.planning_to_relocate ? "Yes" : "No"}</span>
                     </li>
                  </ul>
               </div>
            </div>
            <SPTasks activeStudent={activeStudent} openModal={openModal} />
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
               <SPTaskModal />
            </Modal>

            <ChatModal socket={socket} activeStudent={activeStudent} />
         </div>
      </div>
   );
}
