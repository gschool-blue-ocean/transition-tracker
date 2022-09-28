
import LoginModal from './LoginModal'

function LandingPage({ invokeSetLogin }) {

    return (
        <div className='landingPage'>
            <LoginModal invokeSetLogin={invokeSetLogin} />

        </div>
    )
}

export default LandingPage