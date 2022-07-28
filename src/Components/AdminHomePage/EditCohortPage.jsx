import { React, useContext, useState } from 'react'
import AppContext from "../../Context/AppContext"
import EditableStudent from './EditableStudent'
import EditableCohort from './EditableCohort'
import { FiEdit } from 'react-icons/fi'

function EditCohortPage ({ selectedID }) {
  const { allUsersData, allCohortsData } = useContext(AppContext)
  const [ students ] = useState({})

  return (
    <>
    {
      allCohortsData.map(x => {
        if (x.cohort_id == selectedID) {
          return <>
            <EditableCohort
              name={x.cohort_name}
              start={x.start_date}
              end={x.end_date}
              id={selectedID}
              />
            <ul>
              {
                allUsersData.map(user => {
                  if (user.cohort_id == selectedID)
                  return <>
                    <EditableStudent
                      firstName={user.first}
                      lastName={user.last}
                      id={user.user_id}
                      cohort={selectedID}/>
                    <br></br>
                  </>
                })
              }
            </ul>
            { allUsersData.filter(user => user.cohort_id == selectedID).length } students
          </>
        }
      })
    }
    </>
  )

}

export default EditCohortPage
