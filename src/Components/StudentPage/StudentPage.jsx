import React, { useState, useContext, useEffect } from "react";
import SPTasks from "./components/SP-Tasks";
import SPETStag from "./components/SP-ETStag";
import SPDependents from "./components/SP-Dependents";
import "../../StyleSheets/StudentPage.css";
import SideNav from "../SideNav/SideNav";
import LoginContext from "../../Context/LoginContext";
import ChatModal from "../../Components/Chat/ChatModal";
import { FiEdit } from "react-icons/fi";
import EditStudentModal from "./components/EditStudentModal";

export default function StudentPage({ allUsersData, socket, viewClickedCohort }) {
   const { userData } = useContext(LoginContext);
   const [activeStudent, setActiveStudent] = useState({});
   const [showEditStudentModal, setShowEditStudentModal] = useState(false);

   useEffect(() => {
      console.log(userData);
      if (!userData.admin) {
         document.querySelector(".test--grid").classList.add("studentView");
         setActiveStudent(userData);
      }
   }, []);

   const handleEditBtnClicked = (e) => {
      setShowEditStudentModal(!showEditStudentModal);
   };

   console.log(activeStudent);

   return (
      <div className="test--grid">
         {userData.admin && (
            <SideNav
               viewClickedCohort={viewClickedCohort}
               activeStudent={activeStudent}
               setActiveStudent={setActiveStudent}
            />
         )}
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
                     <div>
                        {showEditStudentModal && (
                           <EditStudentModal
                              userData={userData}
                              setShowEditStudentModal={setShowEditStudentModal}
                              activeStudent={activeStudent}
                              setActiveStudent={setActiveStudent}
                           />
                        )}
                        <div onClick={handleEditBtnClicked} className="editStudentBtnSpan">
                           <FiEdit className="editStudentInfoBtn" />
                           <span className="editStudentToolTip">Edit</span>
                        </div>
                     </div>

                     <li>
                        <h4 className="text-left">ETS Date</h4>
                        <span>{activeStudent.ets_date}</span>
                     </li>

                     <h4 className="text-left">Personal Info</h4>
                     <li>
                        <span className="title"> Email: </span>
                        <span className="answer">{activeStudent.email}</span>
                     </li>
                     <li>
                        <span className="title under-line"> MOS: </span>
                        <span className="answer"> {activeStudent.mos} </span>
                     </li>
                     <li>
                        <span className="title"> Rank: </span>
                        <span className="answer"> {activeStudent.rank} </span>
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
                        <span className="title"> TAP Status: </span>
                        <span className="answer"> {activeStudent.taps_complete ? "Yes" : "No"} </span>
                     </li>

                     <h4 className="text-left">Dependents</h4>
                     <li className="title">
                        <span>{activeStudent.has_dependents ? <SPDependents student={activeStudent} /> : "None"}</span>
                     </li>

                     <li>
                        <h4 className="text-left"> Education </h4>
                        <span className="title"> Degree: </span>
                        <span className="answer"> {activeStudent.highest_education}</span>
                     </li>

                     <li>
                        <h4 className="text-left"> Relocation </h4>
                        <span className="title"> Planning to Relocate?: </span>
                        <span className="answer"> {activeStudent.planning_to_relocate ? "Yes" : "No"}</span>
                     </li>

                     <h4>Interests</h4>
                     <li className="title">
                        <span>{activeStudent.interests}</span>
                     </li>
                  </ul>
               </div>
            </div>
            <SPTasks activeStudent={activeStudent} />
            <ChatModal socket={socket} activeStudent={activeStudent} />
         </div>
      </div>
   );
}
