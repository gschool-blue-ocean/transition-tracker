
import Logo from "../../public/galvanizeLogo.svg";
import style from "../../styles/Header.module.css";
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import Link from "next/link";

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
            <Link as='/' href='/'>
              <a id="/" className={style.navLink} >
                Home
              </a>
            </Link>
          ) : null}
          {/* {JSON.parse(localStorage.currentUser).admin || userData.admin ? <li><NavLink id='/archive' className={style.navLink} to="/archive" >Archive</NavLink></li> : null} */}
          {userData && userData.admin ? (
            <Link as='/archive' href={'/admin/archive'}>
              <a id="/archive" className={style.navLink}>
                Archive
              </a>
            </Link >
          ) : null}
          {userData && userData.admin ? (
            <Link as={'/'} href={'/settings'}>
              <a id="/settings" className={style.navLink}>
                Admin
              </a>
            </Link >
          ) : null}
        </ul>
      </div>

      <div className={style.logoutDivNav}>
        <Link href={'/login'}>
        <a
          id="logoutBtn"
          onClick={handleLogout}
          className={style.logoutBtn}
        >
          Log Out
        </a>
        </Link>
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
