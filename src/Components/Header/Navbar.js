import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const nav = useNavigate();
    let loggedIn = true;
    const signinSignout = () => {

    }
    if (loggedIn) {
        <div className="navbar">
            <div onClick={() => { nav('/'); }}>Home</div>
            <div onClick={() => { signinSignout() }}>Login</div>
        </div>
    }
    //  <div onClick={() => {{nav('/myprofile')}}}>Profile</div>
    return (
        <div className="navbar">
            <div onClick={() => { nav('/'); }}>Home</div>

            <div onClick={() => { signinSignout() }}>Signout</div>
        </div>
    )
}

export default Navbar;