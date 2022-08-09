import {React, useContext, useState} from 'react'
import AppContext from '../../Context/AppContext';
import {BsTrashFill} from 'react-icons/bs';

export const DeleteAdminButton = ({id}) => {
  const {allUsersData , invokeSetAllUsersData} = useContext(AppContext);
  const [userToDelete, setUserToDelete] = useState(0)


  const deleteAdmin = (e) => {
    console.log(id);
    fetch(`https://hacking-transition.herokuapp.com/api/delete/user/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
    removeAdminFromState(id);
}
const removeAdminFromState = (id) => {
  allUsersData.forEach((user,index) => {
    if(user.user_id == id){
      setUserToDelete(index)
    }
  })
  invokeSetAllUsersData(allUsersData.splice(userToDelete,1));
}
  return(
        <span onClick={deleteAdmin}>
          <BsTrashFill/>
        </span>

  )
}


export default DeleteAdminButton;