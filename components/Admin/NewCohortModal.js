import {useState, React } from 'react'
import style from '../../styles/NewCohortModal.module.css';
//This modal will pop up when you press the bottom + button below the Cohorts div on the main page, it should be all the way at the bottom of the list of cohorts. This will allow you to create a new cohort and set the cohort name, start date, and end date.
function NewCohortModal() {
  const [cohortData] = useState({
    cohort_name: "", 
    start_date: "", 
    end_date: "", 
    active: true
  })
  const [newName, updateName] = useState('')
  const [newStartDate, updateStartDate] = useState('')
  const [newEndDate, updateEndDate] = useState('')
  //following functions will update the above states as they are being filled in 
  const checkName = e => updateName(e.currentTarget.value)
  const checkStartDate = e => updateStartDate(e.currentTarget.value)
  const checkEndDate = e => updateEndDate(e.currentTarget.value)
  //when the enter key is pressed, the checkKey function (line 31) will activate, and call the submit Fxn which wil set the state and then send a post request to the server to create and save the new cohort
  const submitFxn = () => {
    cohortData.cohort_name = newName
    cohortData.start_date = newStartDate
    cohortData.end_date = newEndDate
    console.log(JSON.stringify(cohortData))
    fetch(`http://hacking-transition.herokuapp.com/api/create/cohort`, {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cohortData)
    })
    console.log("ran the thing")
  }
  const checkKey = e => {
    if (e.keyCode === 13) submitFxn()
  }


return  (
<div className={style.modal-page}>
    <div className={style.cohort-card}>
    <div className={style.createCohortHeader}>
        Create a New Cohort
    </div>
    <div className={style.cohort-input}>
    <div id="cohort-name-field">
        Enter Cohort Name:
    <input
      type="text"
      placeholder="Cohort name can't be blank"
      onChange={checkName}
      onKeyDown={checkKey}
      value={newName}
    />
    </div>
    <div>
    Enter start date of Cohort:
    <input
      type="text"
      placeholder="Start date can't be blank"
      onChange={checkStartDate}
      onKeyDown={checkKey}
      value={newStartDate}
    /> mm/dd/yyyy
    </div>
    <div>
    Enter end date of Cohort:
    <input
      type="text"
      placeholder="End date can't be blank"
      onChange={checkEndDate}
      onKeyDown={checkKey}
      value={newEndDate}
    /> mm/dd/yyyy
    </div>
    </div>
    <button className={style.create-cohort-btn} onClick={submitFxn}>Create cohort</button>
    </div>
    </div>)
 }

 export default NewCohortModal