import React, { useState, useContext, useEffect } from "react";
import SPTasks from "./SP-Tasks";
import SPETStag from "./SP-ETStag";
import SPDependents from "./SP-Dependents";
import SideNav from "../SideNav";
import LoginContext from "../context/LoginContext";
import ChatModal from "../Chat";
import { FiEdit } from "react-icons/fi";
import EditStudentModal from "./EditStudentModal";
import style from "../../styles/StudentPage.module.css";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(-clr-primary-accent)",
      borderRadius: "10px",
      width: "30%",
   },
};

// Modal.setAppElement(".AppContainer");

export default function StudentPage({
   activeStudent,
   setActiveStudent,
   socket,
   viewClickedCohort,
}) {
   const { userData, setUserData } = useContext(LoginContext);
   const [showEditStudentModal, setShowEditStudentModal] = useState(false);

   useEffect(() => {
      document.querySelectorAll(".listOfCohorts").forEach((elem) => {
         elem.classList.remove("activeCohortTab");

         if (viewClickedCohort.cohort_id === +elem.id) {
            elem.classList.add("activeCohortTab");
         }
      });
   }, []);

   const handleEditBtnClicked = (e) => {
      setShowEditStudentModal(!showEditStudentModal);
   };

   console.log(activeStudent);

   return (
      <div className={style.test-grid}>
         {userData.admin && (
            <SideNav
               viewClickedCohort={viewClickedCohort}
               activeStudent={activeStudent}
               setActiveStudent={setActiveStudent}
            />
         )}
         <div className={style.container}>
         <div className={style.StudentDash-Wrapper}>
            <div className={style.SDash-Header}>
               <h3 id="StuHeader-Name">
                  {activeStudent.first} {activeStudent.last}
               </h3>
               <p id="StuHeader-Branch">{activeStudent.branch}</p>
               <SPETStag userETS={activeStudent.ets_date} />
            </div>

            {/* User Data Card */}
            <div className={style.SDash-Info-card}>
               <div className={style.infoCard-container}>
                  <ul>
                     <div>
                        {showEditStudentModal && (
                           <EditStudentModal
                              setUserData={setUserData}
                              userData={userData}
                              setShowEditStudentModal={setShowEditStudentModal}
                              activeStudent={activeStudent}
                              setActiveStudent={setActiveStudent}
                           />
                        )}
                        <div onClick={handleEditBtnClicked} className={style.editStudentBtnSpan}>
                           <FiEdit className={style.editStudentInfoBtn} />
                           <div className={style.editStudentToolTip}>Edit</div>
                        </div>
                     </div>

                     <li>
                        <h4 className={style.text-left}>ETS Date</h4>
                        <span>{activeStudent.ets_date}</span>
                     </li>

                     <h4 className={style.text-left}>Personal Info</h4>
                     <li>
                        <span className={style.title}> Email: </span>
                        <span className={style.answer}>{activeStudent.email}</span>
                     </li>
                     <li>
                        <span className={`${style.title} ${style.under-line}`}> MOS: </span>
                        <span className={style.answer}> {activeStudent.mos} </span>
                     </li>
                     <li>
                        <span className={style.title}> Rank: </span>
                        <span className={style.answer}> {activeStudent.rank} </span>
                     </li>
                     <li>
                        <span className={style.title}> Duty Station: </span>
                        <span className={style.answer}> {activeStudent.duty_station}</span>
                     </li>
                     <li>
                        <span className={style.title}> Terminal Leave: </span>
                        <span className={style.answer}> {activeStudent.leave_start_date}</span>
                     </li>

                     <li>
                        <span className={style.title}> TAP Status: </span>
                        <span className={style.answer}> {activeStudent.taps_complete ? "Yes" : "No"} </span>
                     </li>

                     <h4 className={style.text-left}>Dependents</h4>
                     <li className={style.title}>
                        <span>{activeStudent.has_dependents ? <SPDependents student={activeStudent} /> : "None"}</span>
                     </li>

                     <li>
                        <h4 className={style.text-left}> Education </h4>
                        <span className={style.title}> Degree: </span>
                        <span className={style.answer}> {activeStudent.highest_education}</span>
                     </li>

                     <li>
                        <h4 className={style.text-left}> Relocation </h4>
                        <span className={style.title}> Planning to Relocate?: </span>
                        <span className={style.answer}> {activeStudent.planning_to_relocate ? "Yes" : "No"}</span>
                     </li>

                     <h4>Interests</h4>
                     <li className={style.title}>
                        <span>{activeStudent.interests}</span>
                     </li>
                  </ul>
               </div>
            </div>
            <SPTasks activeStudent={activeStudent} />
            <ChatModal socket={socket} activeStudent={activeStudent} />
         </div >
      </div >

      </div>
   );
}
