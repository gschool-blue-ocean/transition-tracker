import {React, useContext} from 'react'
import AppContext from "../../Context/AppContext"

function EditCohortPage ({ currentCohort }) {
  const { allUsersData, allCohortsData } = useContext(AppContext)
  return (
    <>
    {
      allCohortsData.map(x => {
        if (x.cohort_id == currentCohort) {
          return <>
            <h1>{x.cohort_name}</h1>
            
            <ul>
              {
                allUsersData.map(user => {
                  if (user.cohort_id == currentCohort)
                  return <>
                    {user.first} {user.last}<br></br>
                  </>
                })
              }
            </ul>
            <button>save changes</button>
          </>
        }
      })
    }
    </>
  )

}

export default EditCohortPage
