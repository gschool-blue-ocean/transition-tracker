import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import AppContext from "../../context/AppContext";
import LoginContext from "../../context/LoginContext";
import EditCohortPage from "../../components/Admin/EditCohortPage";
import NewCohortModal from "../../components/Admin/NewCohortModal";
import StudentPage from "../../components/Student";
import SPETStag from "../../components/Student/SP-ETStag.js";
import style from "../../styles/AdminHomePage.module.css";


// This is an entire page
// Make an admin state and use nexxt router to push to a certain page depending on login status

function AdminHomePage({ socket }) {
  const router = useRouter();
  const { pathname } = router;
  const { allUsersData, allCohortsData } = useContext(AppContext);
  const { userData } = useContext(LoginContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCohortModalIsOpen, setNewCohortModalIsOpen] = useState(false);
  const [currentCohort, setCurrentCohort] = useState(null);

  const [viewClickedCohort, setViewClickedCohort] = useState(null);

  const [showClickedCohort, setShowClickedCohort] = useState(false);

  const [cohortsToMap, setCohortsToMap] = useState([]);

  const [activeStudent, setActiveStudent] = useState({});

  useEffect(() => {
    if (!userData && !userData.admin) router.push("/");
  }, [userData]);

  ////  set  our mappable cohorts
  useEffect(() => {
    let filteredCohort = allCohortsData.filter((cohort) => {
      return cohort.active === true;
    });
    setCohortsToMap(filteredCohort);
  }, [allUsersData, pathname]);

  //   whenever we switch between pages, set all active cohort tabs to inactive and reset clicked cohorts
  useEffect(() => {
    const cohortBtn =
      typeof document !== "undefined" &&
      document.getElementById("all-cohort-btn-div");
    handleActiveCohortTab(cohortBtn); //
    setShowClickedCohort(false);
  }, [pathname]);

  const setModalIsOpenToTrue = (e) => {
    setCurrentCohort(e.currentTarget.id);
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  /****This is the function to handle clicking a student name on the cohort card to view the student****/
  const handleStudentNameClick = (e) => {
    let workingStringArr = JSON.parse(e.target.id);
    //console.log(workingStringArr.cohort_id);
    // console.log(e.target.key);
    handleCohortSet(workingStringArr.cohort_id); // sets the current cohort to whatever cohort the student is in
    setActiveStudent(workingStringArr);
    // handleActiveCohortTabOverView(workingStringArr);
  };
  /****this function handles seting the shown/ clicked cohort ****/
  const handleCohortSet = (id) => {
    //handleActiveCohortTab(e.currentTarget)

    /**** loops through all of the cohorts and if its id is the same as the cohort clicked set it to main view ****/
    allCohortsData.forEach((element) => {
      if (element.cohort_id == id) {
        // let grabbedElement = document.getElementById(`${e}`)

        // grabbedElement.classList.add("activeCohortTab")
        setViewClickedCohort(element);
      }
    });
    setShowClickedCohort(true);
  };

  const setNewCohortModalIsOpenToTrue = (e) => {
    setCurrentCohort(e.currentTarget.id);
    setNewCohortModalIsOpen(true);
  };
  const setNewCohortModalIsOpenToFalse = () => {
    setNewCohortModalIsOpen(false);
  };

  /**** Set the active cohort to the one clicked, loop through all cohorts and find one with a mathcing id ****/
  const handleCohortClicked = (e) => {
    handleActiveCohortTab(e.currentTarget);

    allCohortsData.forEach((element) => {
      if (element.cohort_id === +e.currentTarget.id) {
        return setViewClickedCohort(element);
      }
    });

    setShowClickedCohort(true);
  };
  //this is to set the cohort highlighting on the cohort nav: Dosnt work
  // const handleActiveCohortTabOverView = (element) => {//======================================================
  //     document.querySelectorAll('.listOfCohorts').forEach(elem => elem.classList.remove('activeCohortTab'))
  //     let active = document.getElementById(`#${parseInt(element)}`);
  //     console.log(element);
  //     //active.classList.add('activeCohortTab');
  // }
  //==========================================================

  /**** Set the active cohort to the one clicked, loop through all cohorts and find one with a matching id and set it as active ****/
  const handleActiveCohortTab = (element) => {
    const cohortList =
      typeof document !== "undefined" &&
      document.querySelector(".listOfCohorts");

    cohortList.forEach((elem) => elem.classList.remove("activeCohortTab"));
    element.classList.add("activeCohortTab"); //
  };

  //   Shows all cohorts and sets none to main view
  const handleClickedAllBtn = (e) => {
    handleActiveCohortTab(e.currentTarget);
    setShowClickedCohort(false);
  };
  return (
    <div id={style.cohort - container}>
      {" "}
      {/* parent div for the entire body of the page */}
      <div id={style.cohort - nav} className={style.mainContainer}>
        {" "}
        {/* sidebar on the left of the cohort list, and main container */}
        <div className={style.list}>
          {" "}
          {/* actual sidebar contents on the left ie. Cohorts -> ALL -> MCSP-16 */}
          <div className={style.cohort - list - title}>Cohorts</div>
          <div
            onClick={handleClickedAllBtn}
            id={style.all - cohort - btn - div}
            className={`${style.listOfCohorts} ${style.activeCohortTab}`}
          >
            <button id={style.all - cohorts - btn}>All</button>
          </div>{" "}
          {/* Show ALL cohorts button*/}
          {cohortsToMap.map((cohort) => {
            return (
              <div
                id={cohort.cohort_id}
                onClick={handleCohortClicked}
                className={style.listOfCohorts}
              >
                <p>{cohort.cohort_name}</p>
              </div>
            );
          })}
          <button
            onClick={setNewCohortModalIsOpenToTrue}
            id={style.add - cohort - btn}
          >
            +
          </button>
        </div>{" "}
        {/* END actual sidebar contents on the left ie. Cohorts -> ALL -> MCSP-16 */}
      </div>
      <div id={style.cohorts - list} className={style.mainContainer}>
        {showClickedCohort ? (
          <>
            <StudentPage
              viewClickedCohort={viewClickedCohort}
              socket={socket}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              activeStudent={activeStudent}
              setActiveStudent={setActiveStudent}
            />
          </>
        ) : (
          <>
            <div id={style.cohort - view} onClick={horizontalScroll}>
              {cohortsToMap.map((cohort) => {
                return (
                  <div className={style.test - cohort} key={cohort.cohort_id}>
                    <div className={style.cardHeader}>
                      <div
                        className={style.cardName}
                        id={cohort.cohort_id}
                        onClick={handleCohortClicked}
                      >
                        {cohort.cohort_name}
                      </div>
                      <div className={style.cardSettingsIcon}>
                        <>
                          <FiSettings
                            onClick={setModalIsOpenToTrue}
                            id={cohort.cohort_id}
                          >
                            {EditCohortPage}{" "}
                          </FiSettings>
                        </>
                      </div>
                    </div>
                    <div className={style.cohort - dates}>
                      {cohort.start_date} - {cohort.end_date}
                    </div>
                    <div className={style.listOfNames}>
                      {allUsersData.map((user) => {
                        //==================================================================================
                        if (user.cohort_id == cohort.cohort_id) {
                          return (
                            <div className={style.nameInRow}>
                              <SPETStag
                                userETS={user.ets_date}
                                className={style.ets - tag}
                              />
                              {/* This right here !!!!!!!!!!!!!!!!!!! is not how its supposed to be done. Should use some kind of state but not sure how to get the onClick to work while sending the data from inside here.*/}
                              <div
                                id={`${JSON.stringify(user)}`}
                                className={style.name - div}
                                onClick={handleStudentNameClick}
                              >
                                {" "}
                                {user.first} {user.last}{" "}
                              </div>{" "}
                              <div className={style.color - code}></div>
                              {/*^^^^^^^^^^^^^^^^^^^^^^^ */}
                            </div>
                          );
                        }
                      })}
                      <div id={style.numberOfStudents}>
                        {
                          allUsersData.filter(
                            (user) => user.cohort_id == cohort.cohort_id
                          ).length
                        }{" "}
                        Students
                      </div>
                    </div>
                    {/* <div id={style.numberOfStudents">{ allUsersData.filter(user => user.cohort_id == id).length }</div> */}
                  </div>
                );
              })}
            </div>
            <div id={style.legend}>
              <span id={style.ETS}>ETS'd</span>
              <span id={style.thirty}>30 days</span>
              <span id={style.sixty}>60 days</span>
              <span id={style.ninety}>90 days</span>
              <span id={style.onetwenty}>120 days</span>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={modalIsOpen} portalClassName={style.modal}>
        <button className={style.x} onClick={setModalIsOpenToFalse}>
          X
        </button>
        <EditCohortPage selectedID={style.currentCohort} />
      </Modal>
      <Modal
        isOpen={newCohortModalIsOpen}
        portalClassName={style.newCohortModal}
      >
        <button className={style.x} onClick={setNewCohortModalIsOpenToFalse}>
          X
        </button>
        <NewCohortModal />
      </Modal>
    </div>
  );
}

export default AdminHomePage;