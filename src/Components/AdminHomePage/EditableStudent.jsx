import { useState, useContext, React } from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'
import AppContext from '../../Context/AppContext'

export default function EditableStudent({ firstName, lastName, id, cohort }) {
  const { allUsersData } = useContext(AppContext)
  const [ userData ] = useState(allUsersData.find(x => x.user_id === id))
  const [ editing, setEditing ] = useState(false)
  const [ deleted, setDeleted ] = useState(false)
  const [ value, setValue ] = useState(`${firstName} ${lastName}`)
  const toggleEditing = () => setEditing(!editing)
  const checkChange = e => setValue(e.currentTarget.value)
  const checkKey = e => {
    if (e.keyCode === 13) {
      if (e.currentTarget.value.length) {
        let [first, last] = e.currentTarget.value.split(' ')
        userData.first = first
        userData.last = last
        console.log(JSON.stringify(userData))
        toggleEditing()
        {/* fetch('http://localhost:8000/', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(userData)
        }) */}
      }
    }
  }

  const deleteStudent = () => {
    setDeleted(true)
    // fetch to delete comments
    fetch('')
    // fetch to delete tasks
    // fetch to delete dependents
    // fetch to delete user LASTLY
  }
  const restore = () => setDeleted(false)

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
  else if (!deleted) return <>
    {value}
    <button onClick={toggleEditing}>
      <FiEdit/>
    </button>
    <button onClick={deleteStudent}>
      <FiDelete/>
    </button>
  </>
  else return <>
    <button onClick={restore}>UNDO</button>
  </>
}
