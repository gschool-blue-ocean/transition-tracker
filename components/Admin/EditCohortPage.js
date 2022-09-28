import { React, useContext, useState } from 'react'
import AppContext from "../../context/AppContext"
import EditableStudent from './EditableStudent'
import EditableCohort from './EditableCohort'
import style from  '../../styles/EditCohortPage.module.css';

function EditCohortPage({ selectedID }) {
  const { allUsersData, allCohortsData } = useContext(AppContext)
  const [students] = useState({})

  return (
    <div className={style.modal-page}>
      {
        allCohortsData.map(x => {
          if (x.cohort_id == selectedID) {
            return <div className={style.display-container}>
              <div className={style.cohort-info}>
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
                      return <div className={style.student-div}>
                        <EditableStudent
                          firstName={user.first}
                          lastName={user.last}
                          id={user.user_id}
                          cohort={selectedID} />
                      </div>
                  })
                }
              </ul>
              <div className={style.num-of-stu}>
                {allUsersData.filter(user => user.cohort_id == selectedID).length} students
              </div>
            </div>
          }
        })
      }
    </div>
  )

}

export default EditCohortPage
