import { useContext, useState, React } from 'react'
import AppContext from "../../Context/AppContext"
import '../../StyleSheets/NewCohortModal.css';

function NewCohortModal() {
  const { allCohortsData } = useContext(AppContext)
  const [cohortData] = useState({
    cohort_name: "", 
    start_date: "", 
    end_date: "", 
    active: true
  })
  const [newName, updateName] = useState('')
  const [newStartDate, updateStartDate] = useState('')
  const [newEndDate, updateEndDate] = useState('')
  const checkName = e => updateName(e.currentTarget.value)
  const checkStartDate = e => updateStartDate(e.currentTarget.value)
  const checkEndDate = e => updateEndDate(e.currentTarget.value)

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
<div className='modal-page'>
    <div className='cohort-card'>
    <div className='createCohortHeader'>
        Create a New Cohort
    </div>
    <div className='new-cohort-input'>
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
    <button className='create-new-cohort-btn' onClick={submitFxn}>Create cohort</button>
    </div>
    </div>)
 }

 export default NewCohortModal