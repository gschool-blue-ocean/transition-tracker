import React, { useState } from 'react'
import LoginModal from './LoginModal'
import CreateAccountModal from './CreateAccountModal'
import '../../StyleSheets/LoginStyles.css'

function LandingPage({ changeSetLogin }) {
    const [showLoginModal, setShowLoginModal] = useState(true)

    return (
        <div className='landingPage'>
            {showLoginModal ? <LoginModal changeSetLogin={changeSetLogin} /> : <CreateAccountModal />}
        </div>
    )
}

export default LandingPage