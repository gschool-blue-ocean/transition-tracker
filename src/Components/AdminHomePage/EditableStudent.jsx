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
        fetch(`http://hacking-transition.herokuapp.com/api/update/user/${id}`, {
          method: 'PATCH',
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        })
      }
    }
  }

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
