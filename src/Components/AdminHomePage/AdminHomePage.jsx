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
        console.log(e.currentTarget.id)
        setCurrentCohort(e.currentTarget.id)
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return (
        <div id="cohort-container">
            <div id="cohort-nav" className="mainContainer">
                <h1>Cohorts</h1>
                <button id="all-cohorts-btn">
                    All
                </button><br/>
                {
                    allCohortsData.map(cohort => {
                        return <>
                            <a href="#">{cohort.cohort_name}</a><br/>
                        </>
                    })
                }
                <button id="add-cohort-btn">
                  +
                </button>
            </div>
            <div id="cohorts-list" className="mainContainer">
                <div id='cohort-view'>
                {
                    allCohortsData.map((cohort) => {
                        return (
                            <div className='test-cohort'>
                                <div className='cardHeader'>
                                <div className='cardName'>{cohort.cohort_name}</div>
                                <div className='cardSettingsIcon'>
                                {/* <button onClick={setModalIsOpenToTrue}>{EditCohortPage}<FiSettings/></button>  */}
                                <>
                                    <button onClick={setModalIsOpenToTrue} id={cohort.cohort_id}>{EditCohortPage}<FiSettings/></button>


                                </>
                                </div>
                                </div>
                                {cohort.start_date} - {cohort.end_date}
                                <div className="listOfNames">
                                    {
                                        allUsersData.map(user => {
                                            if (user.cohort_id == cohort.cohort_id) {
                                                return <>
                                                    {user.first} {user.last}<br></br>
                                                </>
                                            }
                                        })
                                    }
                                    30 students
                                </div>
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
            <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <EditCohortPage currentCohort={currentCohort}/>
            </Modal>
        </div>
    )
}

export default AdminHomePage
