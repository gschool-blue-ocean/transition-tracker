import Navbar from './Navbar';
import Logo from './galvanizeLogo.svg';

const Header = () => {

    return (
        <header className="HeaderContainer">
            <img src={Logo} alt="galvanizeLogo" className="HeaderLogo"></img>

            <div className="headerTitleNavContainer">
                <h1 className="headerTitle">Hacking Transition</h1>
                <Navbar />
            </div>


        </header>
    )
}
export default Header