import React, {useContext } from 'react';
import AppContext from "../../Context/AppContext";
import '../../StyleSheets/AdminHomePage.css';
import {AiOutlinePlus, FiSettings} from 'react-icons/fi'

function AdminHomePage() {

    const { allUsersData, allCohortsData } = useContext(AppContext)

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
                    return ( <div className='test-cohort'>
                        <FiSettings id="settings"/>
                        <h1>{cohort.cohort_name}</h1>
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
                        </div>
                        30 students
                    </div> )
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
        </div>
    )
}

export default AdminHomePage
