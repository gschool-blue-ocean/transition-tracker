import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const nav = useNavigate();
    let admin = true;

    if (admin) {
        <div className="navbar">
            <div onClick={() => { nav('/'); }}>Home</div>
            <div>Admin task</div>
            <div>Admin task</div>
            <div onClick={() => { nav('/');/*function for clearing userData*/ }}>Signout</div>
        </div>
    }
    //  <div onClick={() => {{nav('/myprofile')}}}>Profile</div>
    return (
        <div className="navbar">
            <div onClick={() => { nav('/'); }}>Home</div>
            <div onClick={() => { nav('/');/*function for clearing userData*/ }}>Signout</div>
        </div>
    )
}

export default Navbar;