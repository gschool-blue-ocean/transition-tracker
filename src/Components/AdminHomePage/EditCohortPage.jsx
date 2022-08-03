import { React, useContext, useState } from 'react'
import AppContext from "../../Context/AppContext"
import EditableStudent from './EditableStudent'
import EditableCohort from './EditableCohort'
import { FiEdit } from 'react-icons/fi'
import '../../StyleSheets/EditCohortPage.css';

function EditCohortPage({ selectedID }) {
  const { allUsersData, allCohortsData } = useContext(AppContext)
  const [students] = useState({})

  return (
    <div className='modal-page'>
      {
        allCohortsData.map(x => {
          if (x.cohort_id == selectedID) {
            return <>
              <div className='cohort-info'>
                <EditableCohort
                  name={x.cohort_name}
                  start={x.start_date}
                  end={x.end_date}
                  id={selectedID}
                />
              </div>
              <ul>
                {
                  allUsersData.map(user => {
                    if (user.cohort_id == selectedID)
                      return <div className='student-div'>
                        <EditableStudent
                          firstName={user.first}
                          lastName={user.last}
                          id={user.user_id}
                          cohort={selectedID} />
                        <br></br>
                      </div>
                  })
                }
              </ul>
              <div className='num-of-stu'>
                {allUsersData.filter(user => user.cohort_id == selectedID).length} students
              </div>
            </>
          }
        })
      }
    </div>
  )

}

export default EditCohortPage
