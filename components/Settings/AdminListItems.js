import {React, useContext} from 'react'
import AppContext from '../../context/AppContext';
import LoginContext from "../../context/LoginContext";
import {BsTrashFill} from 'react-icons/bs';
import style from '../../styles/Settings.module.css'

export const AdminListItems = ({user, key}) => {
  console.log(user.user_id)
  return (
    <div className={style.admin-listItems} id={user.user_id}>

      <span className={style.adminList-name}>
      {user.first} {user.last} 
      </span>

      <span className={style.adminList-deleteBtn}>
      <DeleteAdminButton id={user.user_id} key={user.user_id} />
      </span>

    </div>
  )
}

export default AdminListItems;

const DeleteAdminButton = ({id}) => {
    const {allUsersData , invokeSetAllUsersData} = useContext(AppContext);
    const { setLoading, changeSetLoading } = useContext(LoginContext);
    
    let userToDelete = -1;
  
  
    const deleteAdmin = (e) => {
      console.log(id);
      fetch(`https://hacking-transition.herokuapp.com/api/delete/user/${id}`, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
              }).then(fetchAllUserData)
      
      //removeAdminFromState(id);
  }
  const fetchAllUserData = () => {
    //changeSetLoading(true);
    fetch("https://hacking-transition.herokuapp.com/api/users")
       .then((res) => res.json())
       .then((data) => invokeSetAllUsersData(data))
       .catch((err) => console.log(err));
  };
  const removeAdminFromState = (id) => {
    allUsersData.forEach((user,index) => {
      if(user.user_id == id){
        userToDelete = index;
        console.log(userToDelete)
        let firstHalf = allUsersData.splice(0,userToDelete);
        let secondHalf = allUsersData.splice(userToDelete,allUsersData.length);
        console.log(firstHalf);
        console.log(secondHalf);
        invokeSetAllUsersData(firstHalf.concat(secondHalf));
        
      }
    })
    
    
  }
    return(
          <span onClick={deleteAdmin} className={style.deleteAdmin-btn}>
            <BsTrashFill/>
          </span>
  
    )
  }
  
