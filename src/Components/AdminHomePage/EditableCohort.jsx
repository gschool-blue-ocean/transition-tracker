import { useContext, useState, React } from 'react'
import AppContext from "../../Context/AppContext"
import { FiEdit } from 'react-icons/fi'

export default function EditableCohort({ name, start, end, id }) {
  const { allCohortsData } = useContext(AppContext)
  const [cohortData] = useState(allCohortsData.find(x => x.cohort_id == id))
  const [currentName, updateName] = useState(name)
  const [currentStartDate, updateStartDate] = useState(start)
  const [currentEndDate, updateEndDate] = useState(end)
  const [editing, edit] = useState(false)
  const toggleEditing = () => edit(!editing)
  const checkName = e => updateName(e.currentTarget.value)
  const checkStartDate = e => updateStartDate(e.currentTarget.value)
  const checkEndDate = e => updateEndDate(e.currentTarget.value)
  const [ archived, setArchived ] = useState(false)
  const submitFxn = () => {
    cohortData.cohort_name = currentName
    cohortData.start_date = currentStartDate
    cohortData.end_date = currentEndDate
    console.log(JSON.stringify(cohortData))
    toggleEditing()
    fetch(`http://hacking-transition.herokuapp.com/api/update/cohort/${id}`, {
      method: 'PATCH',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cohortData)
    })
    console.log("ran the thing")
  }
  const checkKey = e => {
    if (e.keyCode === 13) submitFxn()
  }

  const archiveCohort = () => {
    setArchived(true)
    console.log(cohortData)
    console.log(id)
    fetch(`http://hacking-transition.herokuapp.com/api/archive/cohort/${id}`, {
          method: 'PATCH',
          headers: { "content-type": "application/json" },
          body: JSON.stringify({'active':false}),
        })
        .then(alert("Cohort Archived"))
  }

  const unArchiveCohort = () => {
    setArchived(true)
    console.log(cohortData)
    console.log(id)
    fetch(`http://hacking-transition.herokuapp.com/api/archive/cohort/${id}`, {
          method: 'PATCH',
          headers: { "content-type": "application/json" },
          body: JSON.stringify({'active':true}),
        })
        .then(alert("Cohort Activated"))
  }

  const deleteCohort = () => {
    fetch(`http://hacking-transition.herokuapp.com/api/delete/cohort/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
    .then(alert("Cohort Deleted"))
  }

  if (editing) return <div className='editCohortFields'>
  Cohort Name:
    <input
      type="text"
      placeholder="Cohort name can't be blank"
      value={currentName}
      onChange={checkName}
      onKeyDown={checkKey}
    />
    <br />
    Start Date:
    <input
      type="text"
      placeholder="Start date can't be blank"
      value={currentStartDate}
      onChange={checkStartDate}
      onKeyDown={checkKey}
    />
    <br />
    End Date:
    <input
      type="text"
      placeholder="End date can't be blank"
      value={currentEndDate}
      onChange={checkEndDate}
      onKeyDown={checkKey}
    />
    <br />
    <button onClick={toggleEditing}>Back</button> {' '}
    <button onClick={submitFxn}>Submit</button> {' '}
    <button onClick={archiveCohort}>Archive</button> {' '}
    <button onClick={unArchiveCohort}>Activate</button> {' '}
    <button onClick={deleteCohort}>Delete</button> {' '}
  </div>

  else return <>
    {currentName}<br />
    Starts: {currentStartDate}<br />
    Ends: {currentEndDate}
    <button onClick={toggleEditing}>
      <FiEdit />
    </button>
  </>
}
