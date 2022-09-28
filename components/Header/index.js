
import Logo from "../../public/galvanizeLogo.svg";
import style from "../../styles/Header.module.css";
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.HeaderContainer}>
      <img src={Logo} alt="galvanizeLogo" className={style.HeaderLogo}></img>

      <div className={style.headerTitleNavContainer}>
        <h1 className={style.headerTitle}>Hacking Transition</h1>
        <Navbar />
      </div>
    </header>
  );
};
export default Header;

const Navbar = () => {
  const { userData, setUserData, invokeSetLogin } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    invokeSetLogin(false);
    window.location.reload();
  };

  return (
    <>
      <div className={style.navbarContainer}>
        <ul className={style.navbarUL}>
          {userData && userData.admin ? (
            <li>
              <NavLink id="/" className={style.navLink} to="/">
                Home
              </NavLink>
            </li>
          ) : null}
          {/* {JSON.parse(localStorage.currentUser).admin || userData.admin ? <li><NavLink id='/archive' className={style.navLink} to="/archive" >Archive</NavLink></li> : null} */}
          {userData && userData.admin ? (
            <li>
              <NavLink id="/archive" className={style.navLink} to="/archive">
                Archive
              </NavLink>
            </li>
          ) : null}
          {userData && userData.admin ? (
            <li>
              <NavLink id="/settings" className={style.navLink} to="/settings">
                Admin
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>

      <div className={style.logoutDivNav}>
        <NavLink
          id="logoutBtn"
          onClick={handleLogout}
          className={style.logoutBtn}
          to="/"
        >
          Log Out
        </NavLink>
        {userData !== null && (
          <span id="loginInfoDisplay">
            {userData.first} {userData.last[0]}. @
            {userData.admin ? "Admin" : "Student"}
          </span>
        )}
      </div>
    </>
  );
};
