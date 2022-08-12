import React from 'react'
import DeleteAdminButton from './DeleteAdminButton';
import '../../StyleSheets/Settings.css'

export const AdminListItems = ({user, key}) => {
  console.log(user.user_id)
  return (
    <div className='admin--listItems' id={user.user_id}>

      <span className='adminList--name'>
      {user.first} {user.last} 
      </span>

      <span className='adminList--deleteBtn'>
      <DeleteAdminButton id={user.user_id} key={user.user_id} />
      </span>

    </div>
  )
}

export default AdminListItems;