import '../../StyleSheets/ChatModal.css'
import React, { useState, useContext, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import LoginContext from '../../Context/LoginContext'

function ChatModal({ socket }) {
    const { userData } = useContext(LoginContext)

    const [inputValue, setInputValue] = useState({
        content: ''
    })

    const [allMsgs, setAllMsgs] = useState([])

    useEffect(() => {

        joinRoom()

        fetch('https://hacking-transition.herokuapp.com/api/comments/student/10')
            .then(res => res.json())
            .then((data) => setAllMsgs(data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setAllMsgs((msgs) => { return [...msgs, data] })
        })
    }, [socket])

    const joinRoom = () => {
        socket.emit("join_room", 10)
    }

    const handleChange = (e) => {
        setInputValue((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClick = async () => {
        if (inputValue.content.length === 0) { return console.log('no empty msgs') }

        let msgData = {
            student_id: 10,
            author_id: userData.user_id,
            author_name: `${userData.first} ${userData.last}`,
            content: inputValue.content,
            date_time: new Date().toLocaleString()
        }

        // console.log(msgData)
        setAllMsgs((msgs) => [...msgs, msgData]
        )
        // postMsgToDatabase(msgData)

        await socket.emit("send_message", msgData)

        setInputValue(() => {
            return {
                content: ''
            }
        })

    }


    return (
        <div className='chatModalContainer'>

            <div className='chatContainer'>

                <ScrollToBottom className='scroll'>
                    <div className='chatBody'>

                        {
                            allMsgs.map((elem, index) => {
                                return (<>
                                    <div className={elem.author_id === userData.user_id ? 'rightMsg' : ' leftMsg'} key={index}>
                                        <p>{elem.content}</p>
                                        <p className='msgFooter'>{elem.date_time}</p>
                                    </div>
                                    <p className={elem.author_id === userData.user_id ? 'rightAuthor msgFooter' : ' leftAuthor msgFooter'}>{elem.author_name}</p>
                                </>

                                )
                            })
                        }
                    </div>
                </ScrollToBottom>

                <div className='chatFooter'>
                    <input
                        type='text'
                        placeholder='Type your msg here...'
                        name="content"
                        value={inputValue.content}
                        onChange={handleChange}
                        onKeyPress={(e) => { e.key === 'Enter' && handleClick() }}
                    />
                    <button onClick={handleClick}>Send</button>
                </div>

            </div>


        </div>
    )
}

export default ChatModal