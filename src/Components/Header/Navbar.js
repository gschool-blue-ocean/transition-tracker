import { useContext, useState } from "react";
import LoginContext from "../../Context/LoginContext";
import AdminNav from "./AdminNav";
import StudentNav from "./StudentNav";

const Navbar = () => {

    const { userData } = useContext(LoginContext)

    const [admin, setAdmin] = useState(true)

    return (
        <>
            {admin ? <AdminNav /> : <StudentNav />}
        </>
    )

    // if (admin) {
    //     <div className="navbar">
    //         <div onClick={() => { nav('/'); }}>Home</div>
    //         <div>Admin task</div>
    //         <div>Admin task</div>
    //         <div onClick={() => { nav('/');/*function for clearing userData*/ }}>Signout</div>
    //     </div>
    // }
    // //  <div onClick={() => {{nav('/myprofile')}}}>Profile</div>
    // return (
    //     <div className="navbar">
    //         <div onClick={() => { nav('/'); }}>Home</div>
    //         <div onClick={() => { nav('/');/*function for clearing userData*/ }}>Signout</div>
    //     </div>
    // )
}

export default Navbar;