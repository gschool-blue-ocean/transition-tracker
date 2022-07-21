import React, { useContext, useState } from 'react'
import LoginModal from './LoginModal'
import CreateAccountModal from './CreateAccountModal'
import '../../StyleSheets/LoginStyles.css'

function LandingPage({ invokeSetLogin }) {
    const [showLoginModal, setShowLoginModal] = useState(true)

    return (
        <div className='landingPage'>
            {showLoginModal ? <LoginModal invokeSetLogin={invokeSetLogin} /> : <CreateAccountModal />}
        </div>
    )
}

export default LandingPage