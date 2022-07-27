import Navbar from './Navbar';
import Logo from './galvanizeLogo.svg';

const Header = () => {

    return (
        <header className="HeaderContainer">
            <div className="headerTitleLogoContainer">
                <img src={Logo} alt="galvanizeLogo" className="HeaderLogo"></img>
                <div className="headerTitle">hackingTransition</div>
            </div>

            <Navbar />

        </header>
    )
}
export default Header