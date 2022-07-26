import React, { useContext, useState } from 'react'
import LoginModal from './LoginModal'
import '../../StyleSheets/LoginStyles.css'

function LandingPage({ invokeSetLogin }) {

    return (
        <div className='landingPage'>
            <LoginModal invokeSetLogin={invokeSetLogin} />
            {/* {showLoginModal ? <LoginModal invokeSetLogin={invokeSetLogin} setShowLoginModal={setShowLoginModal} /> : <CreateAccountModal setShowLoginModal={setShowLoginModal} />} */}
        </div>
    )
}

export default LandingPage