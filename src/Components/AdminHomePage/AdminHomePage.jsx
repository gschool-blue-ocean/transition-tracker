import React, { useContext, useState } from 'react';
import AppContext from "../../Context/AppContext";
import '../../StyleSheets/AdminHomePage.css';
import {FiSettings} from 'react-icons/fi';
import EditCohortPage from './EditCohortPage'
import Modal from 'react-modal';

function AdminHomePage() {

    const { allUsersData, allCohortsData } = useContext(AppContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [ currentCohort, setCurrentCohort ] = useState(null)

    const setModalIsOpenToTrue =(e)=>{
        setCurrentCohort(e.currentTarget.id)
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return (
        <div id="cohort-container">
            <div id="cohort-nav" className="mainContainer">
                <div className='cohort-list-title'>Cohorts</div>
                <div className='list'>
                <button id="all-cohorts-btn">
                    All
                </button>
                {
                    allCohortsData.map(cohort => {
                        return <>
                            <div className='listOfCohorts'><a href="#">{cohort.cohort_name}</a></div><br/>
                        </>
                    })
                }
                <button id="add-cohort-btn">
                  +
                </button>
                </div>
            </div>
            <div id="cohorts-list" className="mainContainer">
                <div id='cohort-view'>
                {
                    allCohortsData.map((cohort) => {
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
                                    <div id="numberOfStudents">{ allUsersData.filter(user => user.cohort_id == cohort.cohort_id).length }</div>
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
            </div>
            <Modal isOpen={modalIsOpen} portalClassName="modal">
                <button className="x" onClick={setModalIsOpenToFalse}>X</button>
                <EditCohortPage selectedID={currentCohort}/>
            </Modal>
        </div>
    )
}

export default AdminHomePage
