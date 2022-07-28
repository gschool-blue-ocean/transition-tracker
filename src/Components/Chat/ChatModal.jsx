import '../../StyleSheets/ChatModal.css'
import React, { useState, useContext, useEffect } from 'react'
import io from 'socket.io-client'
import LoginContext from '../../Context/LoginContext'

const socket = io.connect("https://hacking-transition.herokuapp.com")

function ChatModal() {

    useEffect(() => {
        socket.on("receive_message", msgData => { alert(msgData.content) })
    }, [socket])

    const { userData } = useContext(LoginContext)

    const [inputValue, setInputValue] = useState({
        content: ''
    })

    const handleChange = (e) => {
        setInputValue((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleClick = () => {

        let msgData = {
            student_id: '',
            author_id: '',
            content: inputValue.content,
            date_time: new Date().toLocaleString()
        }

        console.log(msgData)

        postMsgToDatabase(msgData)

        setInputValue(() => {
            return {
                content: ''
            }
        })

        socket.emit("send_message", msgData)
    }

    const postMsgToDatabase = (msgData) => {
        fetch('https://hacking-transition.herokuapp.com/api/update/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msgData)
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .catch(err => console.log(err))

    }
    return (
        <div className='chatModalContainer'>

            <div className='chatContainer'>

                <div className='chatBody'></div>

                <div className='chatFooter'>
                    <input
                        type='text'
                        placeholder='Type your msg here...'
                        name="content"
                        value={inputValue.content}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Send</button>
                </div>

            </div>


        </div>
    )
}

export default ChatModal