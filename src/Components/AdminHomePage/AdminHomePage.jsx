import React from 'react'
import '../../StyleSheets/AdminHomePage.css'

function AdminHomePage() {
    return (
        <div id="cohort-container">
            <div id="cohort-nav" className="something">
                <h1>Cohorts</h1>
                <button id="all-cohorts?">
                    All
                </button><br/>
                <a href="#">MCSP-13</a><br/>
                <a href="#">MCSP-14</a><br/>
                <a href="#">MCSP-15</a><br/>
                <a href="#">MCSP-16</a><br/>
                <a href="#">MCSP-17</a><br/>
                <a href="#">MCSP-18</a><br/>
                <button id="add-cohort?">
                    ᐩ
                </button>
            </div>
            <div id="cohort-view" className="something">
                <div className="test-cohort">
                  text
                </div>
                <div className="test-cohort">
                    text
                </div>
                <div className="test-cohort">
                    text
                </div>
                <span>ETS'd</span>
                <span>30 days</span>
                <span>60 days</span>
                <span>90 days</span>
                <span>120 days</span>
            </div>
        </div>
    )
}

export default AdminHomePage
