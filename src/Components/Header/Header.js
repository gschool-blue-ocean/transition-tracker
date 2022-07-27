import Navbar from './Navbar';
import Logo from './galvanizeLogo.svg';

const Header = () => {

    return (
        <header className="HeaderContainer">
            <div className="headerTitleLogoContainer">
                <img src={Logo} alt="galvanizeLogo" className="HeaderLogo"></img>
                <h1 className="headerTitle">Hacking Transition</h1>
            </div>

            <Navbar />

        </header>
    )
}
export default Header