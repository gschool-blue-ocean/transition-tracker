import React, { useState } from "react";
import Modal from "react-modal";
import SPTasks from "./components/SP-Tasks";
import SPDependents from "./components/SP-Dependents";
import SPTaskModal from "./components/SP-TaskModal";
import "../../StyleSheets/StudentPage.css";

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

export default function StudentPage(allUsersData) {
   const [modalIsOpen, setIsOpen] = useState(false);

   function openModal() {
      setIsOpen(true);
   }

   function afterOpenModal() {
      // references are now sync'd and can be accessed.
      // subtitle.style.color = "#f00";
   }

   function closeModal() {
      setIsOpen(false);
   }

   console.log(allUsersData);
   return (
      <div className="StudentDash--Wrapper">
         <div className="SDash--Header">
            <h3 id="StuHeader--Name">Anthony Wright</h3>
            <p id="StuHeader--Cohort">MCSP-12</p>
            <p id="StuHeader--ETStag">ETS'd</p>
         </div>

         {/* User Data Card */}
         <div className="SDash--Info-card">
            <div className="infoCard--container">
               <ul>
                  <h4 className="text-left">Personal Info</h4>

                  <li>
                     <span className="title"> Email: </span>
                     <span className="answer"> awright@gmail.com </span>
                  </li>

                  <li>
                     <span className="title"> Branch: </span>
                     <span className="answer"> Army </span>
                  </li>

                  <li>
                     <span className="title under-line"> MOS: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li>
                     <span className="title"> Duty Station: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li>
                     <span className="title"> Terminal Leave: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li>
                     <span className="title"> ETS: </span>
                     <span className="answer"> Answer </span>
                  </li>

                  <li>
                     <span className="title"> TAP Status: </span>
                     <span className="answer"> Completed </span>
                  </li>

                  {/* <li> 
                     <span className="title"> Title: </span>
                     <span className="answer"> Answer </span>
                  </li> */}

                  <li>
                     <h4 id="depends" className="text-left">
                        Dependents
                     </h4>
                     <SPDependents />
                  </li>

                  <li>
                     <h4 className="text-left"> Education </h4>
                     <span className="title"> Degree: </span>
                     <span className="answer"> Hell Naw </span>
                  </li>

                  <li>
                     <span className="title"> Interest in pursing a degree </span>
                  </li>

                  <li>
                     <h4 className="text-left"> Relocation </h4>
                     <span className="title"> Planning to Rellocate?: </span>
                     <span className="answer"> Yes </span>
                  </li>
               </ul>
               {/* WANT: edit button to turn user info fields into editable field or a form */}
               <button id="editUserBtn">Edit</button>
            </div>
         </div>
         <SPTasks openModal={openModal} />
         <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles}>
            <SPTaskModal />
         </Modal>
         <div className="SDash--Notes">
            <label>Messaging</label>
            <textarea id="StuNotes--TextArea"></textarea>
         </div>
      </div>
   );
}
