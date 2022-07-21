import Navbar from './Navbar';
import Logo from './galvanizeLogo.svg';

const Header = () => {

    return (
        <header className="HeaderContainer">
            <img src={Logo} alt="galvanizeLogo" className="HeaderLogo"></img>
            <div className="navbarContainer">
                <Navbar />
            </div>
        </header>
    )
}
export default Header