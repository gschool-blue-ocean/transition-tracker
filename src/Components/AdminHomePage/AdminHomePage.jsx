import React from 'react'
import '../../StyleSheets/AdminHomePage.css'


function AdminHomePage() {

    // const { names } = useContext(CohortStudentNames)  

    return (
        <div id="cohort-container">
            <div id="cohort-nav" className="something">
                <h1>Cohorts</h1>
                <button id="all-cohorts-btn">
                    All
                </button><br/>
                <a href="#">MCSP-13</a><br/>
                <a href="#">MCSP-14</a><br/>
                <a href="#">MCSP-15</a><br/>
                <a href="#">MCSP-16</a><br/>
                <a href="#">MCSP-17</a><br/>
                <a href="#">MCSP-18</a><br/>
                <button id="add-cohort-btn">
                  +
                </button>
            </div>
            <div id="cohort-view" className="something">
                <div className="test-cohort">
                    <h1>MCSP-13</h1>
                    04/05/2033 - 08/19/2033
                    <div className="listOfNames">
                    Madison Halliway<br></br>
                    George Harrison<br></br>
                    Mark Haddock<br></br>
                    Jeremy Splain<br></br>
                    Ron Wesley<br></br>
                    Margret Throughbright<br></br>
                    Spencer Halfway<br></br>
                    Jason Hallighauer<br></br>
                    Leopold Howe <br></br>
                    Irven Poole <br></br>
                    Rupert Hebert <br></br>
                    Warren Mahoney <br></br>
                    Bradley Moody <br></br>
                    Dixie Burnett <br></br>
                    Graham Hancock <br></br>
                    Emery Hodge <br></br>
                    Payton Reilly <br></br>
                    Norris Richard <br></br>
                    Nelson Knight<br></br>
                    Newton Savage<br></br>
                    Mitchel Hart<br></br>
                    Chas Harrison<br></br>
                    Laurence Clarke<br></br>
                    Robin Mcneil<br></br>
                    Hudson Pittman<br></br>
                    John Jacob<br></br>
                    Jody Macinti<br></br>
                    Fred Flinsto<br></br>
                    Joe Schmoe   <br></br>
                    Ghram Hardt<br></br>
                    {/* {CohortStudentNames.map((elem) => {
                        return (
                            <div className='cohort-names'>
                                <h2 onClick={HandleViewButton} className="Result-CardTitle" >{elem.location_name}</h2>
                            </div>
                        )
                    })} */}
                    </div>
                    30 students
                </div>
                <div className="test-cohort">
                    text
                </div>
                <div className="test-cohort">
                    text
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
