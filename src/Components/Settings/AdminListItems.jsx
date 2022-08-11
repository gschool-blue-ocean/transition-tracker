import React from 'react'
import DeleteAdminButton from './DeleteAdminButton';

export const AdminListItems = ({user, key}) => {
  console.log(user.user_id)
  return (
    <div className='admin--listItems' id={user.user_id}>
      {user.first} {user.last} <DeleteAdminButton id={user.user_id} key={user.user_id} />
    </div>
  )
}

export default AdminListItems;