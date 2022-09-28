import { useState, useContext, React } from 'react'
import { FiDelete } from 'react-icons/fi'
import AppContext from '../../context/AppContext'
import style from '../../styles/EditCohortPage.module.css'
import server from "../../config";
//NOTES: 
/* When you click on the gear icon on a cohort on the Home page, this is the individual divs for each students editable values, and will allow you to edit, delete, and save students. The only editable values here are names. */
export default function EditableStudent({ firstName, lastName, id, cohort }) {
  const { allUsersData } = useContext(AppContext)
  const [ userData ] = useState(allUsersData.find(x => x.user_id === id))
  //user data is brought down through useContext with allUsersData
  const [ editing, setEditing ] = useState(false)
  const [ deleted, setDeleted ] = useState(false)
  const [ archived, setArchived ] = useState(false)
  const [ value, setValue ] = useState(`${firstName} ${lastName}`)
  const toggleEditing = () => setEditing(!editing)
  //helper function that sets the 'editing' state
  const checkChange = e => setValue(e.currentTarget.value)
  //===================== checkKey function will allow the edit function to be submitted on enter key down. =========================
  const checkKey = e => {
    if (e.keyCode === 13) {
      if (e.currentTarget.value.length) {
        let [first, last] = e.currentTarget.value.split(' ')
        userData.first = first
        userData.last = last
        console.log(JSON.stringify(userData))
        toggleEditing()
        fetch(`http://hacking-transition.herokuapp.com/api/update/user/${id}`, {
          method: 'PATCH',
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        })
      }
    }
  }
/// ========================  Delete student requests ============================
  const deleteStudent = () => {
    setDeleted(true)
    fetch(`http://hacking-transition.herokuapp.com/api/delete/allcomments/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
    fetch(`http://hacking-transition.herokuapp.com/api/delete/alltasks/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
    fetch(`http://hacking-transition.herokuapp.com/api/delete/alldependents/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
    fetch(`http://hacking-transition.herokuapp.com/api/delete/user/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
  }
//===================== Save/Archive Student ======================================
  const archiveStudent = () => {
    setArchived(true)
    userData.cohort_id = 1
        console.log(JSON.stringify(userData))
    fetch(`http://hacking-transition.herokuapp.com/api/update/user/${id}`, {
          method: 'PATCH',
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        })
        .then(alert("Student Archived"))
  }


  const restore = () => setDeleted(false)
 // ============================= If Editing student values =========================
  if (editing) return <>
    <input
      type="text"
      placeholder="Student name can't be empty"
      value={value}
      onChange={checkChange}
      onKeyDown={checkKey}/>
    <button onClick={deleteStudent}>
      <FiDelete/>
    </button>
  </>
//============================= if not editing student name ========================
  else if (!deleted) return <>
    {value}
    <button className={style.edit-btn} onClick={toggleEditing}>
      Edit
    </button>
    <button className={style.delete-btn} onClick={deleteStudent}>
      {/* <FiDelete/> */}
      Delete 
    </button>
    <button className={style.archive-btn} onClick={archiveStudent}>
      Archive 
    </button>
  </>
  else return <>
    <button onClick={restore}>UNDO</button>
  </>
}
