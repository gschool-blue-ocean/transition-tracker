import React, { useContext, useEffect, useState } from 'react';
import AppContext from "../../Context/AppContext";
import '../../StyleSheets/AdminHomePage.css';
import { FiSettings } from 'react-icons/fi';
import EditCohortPage from './EditCohortPage';
import NewCohortModal from './NewCohortModal';
import Modal from 'react-modal';
import StudentPage from '../StudentPage/StudentPage';

function AdminHomePage({ socket, isOnArchivePage }) {

    const { allUsersData, allCohortsData } = useContext(AppContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [newCohortModalIsOpen, setNewCohortModalIsOpen] = useState(false)
    const [currentCohort, setCurrentCohort] = useState(null)

    const [viewClickedCohort, setViewClickedCohort] = useState(null)

    const [showClickedCohort, setShowClickedCohort] = useState(false)

    const [cohortsToMap, setCohortsToMap] = useState([])
    

    useEffect(() => {
        if (isOnArchivePage) {
            let filteredCohort = allCohortsData.filter(cohort => { return cohort.active === false })
            setCohortsToMap(filteredCohort)
        }
        else {
            let filteredCohort = allCohortsData.filter(cohort => { return cohort.active === true })
            setCohortsToMap(filteredCohort)
        }
    }, [allUsersData, window.location.pathname])

    useEffect(() => {
        handleActiveCohortTab(document.getElementById('all-cohort-btn-div'))
        setShowClickedCohort(false)
    }, [window.location.pathname])

    const setModalIsOpenToTrue = (e) => {
        setCurrentCohort(e.currentTarget.id)
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const setNewCohortModalIsOpenToTrue = (e) => {
        setCurrentCohort(e.currentTarget.id)
        setNewCohortModalIsOpen(true)
    }
    const setNewCohortModalIsOpenToFalse = () => {
        setNewCohortModalIsOpen(false)
    }

    const handleCohortClicked = (e) => {
        handleActiveCohortTab(e.currentTarget)

        allCohortsData.forEach(element => {
            if (element.cohort_id === +e.currentTarget.id) {
                return setViewClickedCohort(element)
            }
        });

        setShowClickedCohort(true)
    }
    const horizontalScroll = () => {
        const scrollContainer = document.getElementById('#cohort-view')

        scrollContainer.addEventListener(("wheel"), (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY
        });
    }

    const handleActiveCohortTab = (element) => {
        document.querySelectorAll('.listOfCohorts').forEach(elem => elem.classList.remove('activeCohortTab'))
        element.classList.add('activeCohortTab')
    }

    const handleClickedAllBtn = (e) => {
        handleActiveCohortTab(e.currentTarget)
        setShowClickedCohort(false)
    }
    return (
        <div id="cohort-container">
            <div id="cohort-nav" className="mainContainer">

                <div className='list'>
                    <div className='cohort-list-title'>Cohorts</div>

                    <div onClick={handleClickedAllBtn} id="all-cohort-btn-div" className='listOfCohorts activeCohortTab'>
                        <button id="all-cohorts-btn" >
                            All
                        </button>
                    </div>

                    {
                        cohortsToMap.map(cohort => {

                            return (
                                <div id={cohort.cohort_id} onClick={handleCohortClicked} className='listOfCohorts '><p>{cohort.cohort_name}</p></div>
                            )

                        })
                    }
                    <button onClick={setNewCohortModalIsOpenToTrue} id="add-cohort-btn">
                        +
                    </button>
                </div>

            </div>
            <div id="cohorts-list" className="mainContainer">
                {showClickedCohort ?

                    <>
                        <StudentPage viewClickedCohort={viewClickedCohort} socket={socket} />
                    </>

                    :
                    <>
                        <div id='cohort-view' onFocus={horizontalScroll}>
                            {
                                cohortsToMap.map((cohort) => {
                                    return (
                                        <div className='test-cohort' key={cohort.cohort_id}>
                                            <div className='cardHeader'>
                                                <div className='cardName'>{cohort.cohort_name}</div>
                                                <div className='cardSettingsIcon'>
                                                    <>
                                                        <FiSettings onClick={setModalIsOpenToTrue} id={cohort.cohort_id}>{EditCohortPage} </FiSettings>

                                                    </>
                                                </div>
                                            </div>
                                            <div className='cohort-dates'>
                                                {cohort.start_date} - {cohort.end_date}
                                            </div>
                                            <div className="listOfNames">
                                                {
                                                    allUsersData.map(user => {
                                                        if (user.cohort_id == cohort.cohort_id) {
                                                            return <div className='nameInRow'>
                                                                <div className='name-div'> {user.first} {user.last}</div> <div className='color-code'></div>
                                                            </div>
                                                        }
                                                    })
                                                }
                                                <div id="numberOfStudents">{allUsersData.filter(user => user.cohort_id == cohort.cohort_id).length} Students</div>
                                            </div>
                                            {/* <div id="numberOfStudents">{ allUsersData.filter(user => user.cohort_id == id).length }</div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id="legend">
                            <span id='ETS'>ETS'd</span>
                            <span id='thirty'>30 days</span>
                            <span id='sixty'>60 days</span>
                            <span id='ninety'>90 days</span>
                            <span id='onetwenty'>120 days</span>
                        </div>
                    </>}
            </div>
            <Modal isOpen={modalIsOpen} portalClassName="modal">
                <button className="x" onClick={setModalIsOpenToFalse}>X</button>
                <EditCohortPage selectedID={currentCohort} />
            </Modal>
            <Modal isOpen={newCohortModalIsOpen} portalClassName="newCohortModal">
                <button className="x" onClick={setNewCohortModalIsOpenToFalse}>X</button>
                <NewCohortModal/>
            </Modal>
        </div>
    )
}

export default AdminHomePage
