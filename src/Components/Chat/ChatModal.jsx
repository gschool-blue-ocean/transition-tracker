import '../../StyleSheets/ChatModal.css'
import React, { useState, useContext, useEffect } from 'react'
import io from 'socket.io-client'
import LoginContext from '../../Context/LoginContext'

const socket = io.connect("https://hacking-transition.herokuapp.com")

function ChatModal() {
    const { userData } = useContext(LoginContext)

    const [inputValue, setInputValue] = useState({
        content: ''
    })

    const [allMsgs, setAllMsgs] = useState([])

    useEffect(() => {

        fetch('https://hacking-transition.herokuapp.com/api/comments/student/10')
            .then(res => res.json())
            .then((data) => setAllMsgs(data))
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        socket.on("receive_message", msgData => {
            console.log(msgData.content)
            setAllMsgs(() => {
                return [...allMsgs, msgData]
            })
        })
    }, [socket])


    const handleChange = (e) => {
        setInputValue((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClick = async () => {

        let msgData = {
            student_id: '',
            author_id: userData.user_id,
            author_name: `${userData.first} ${userData.last}`,
            content: inputValue.content,
            date_time: new Date().toLocaleString()
        }

        console.log(msgData)

        // postMsgToDatabase(msgData)

        await socket.emit("send_message", msgData)

        setInputValue(() => {
            return {
                content: ''
            }
        })

    }

    // const postMsgToDatabase = (msgData) => {
    //     fetch('https://hacking-transition.herokuapp.com/api/update/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(msgData)
    //     })
    //         .then(res => res.json())
    //         .then((data) => console.log(data))
    //         .catch(err => console.log(err))
    // }

    return (
        <div className='chatModalContainer'>

            <div className='chatContainer'>

                <div className='chatBody'>

                    {allMsgs.map((elem, index) => {
                        return (
                            <div className={elem.author_id === userData.user_id ? 'rightMsg' : ' leftMsg'} key={index}>
                                <p>{elem.content}</p>
                                <p className='msgFooter'>{elem.author_id}, {elem.date_time}</p>
                            </div>
                        )
                    })}
                </div>

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