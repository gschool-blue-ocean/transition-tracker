import '../../StyleSheets/ChatModal.css'
import React, { useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("https://hacking-transition.herokuapp.com")

function ChatModal() {

    const [msgData, setMsgData] = useState({
        student_id: '',
        author_id: '',
        content: '',
        date_time: new Date().toLocaleString()
    })

    const handleClick = () => {
        console.log(msgData)
    }
    return (
        <div className='chatModalContainer'>

            <div className='chatContainer'>

                <div className='chatBody'></div>

                <div className='chatFooter'>
                    <input type='text' placeholder='Type your msg here...' />
                    <button onClick={handleClick}>Send</button>
                </div>

            </div>


        </div>
    )
}

export default ChatModal