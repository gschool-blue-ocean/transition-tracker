import '../../StyleSheets/ChatModal.css'
import React, { useState, useContext, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import LoginContext from '../../Context/LoginContext'
import Picker from 'emoji-picker-react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { MdAddReaction } from 'react-icons/md'


function ChatModal({ socket, activeStudent }) {
    const { userData } = useContext(LoginContext)

    const [errorMessage, setErrorMessage] = useState(false);

    const [inputValue, setInputValue] = useState({
        content: ''
    })
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInputValue({ content: inputValue.content + emojiObject.emoji })
    };

    const [allMsgs, setAllMsgs] = useState([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [studentId, setStudentId] = useState(null)

    useEffect(() => {
        joinRoom()
        userData.admin ? setStudentId(activeStudent.user_id) : setStudentId(userData.user_id)

    }, [activeStudent])

    useEffect(() => {
        if (studentId) {
            fetch(`https://hacking-transition.herokuapp.com/api/comments/student/${studentId}`)
                .then(res => res.json())
                .then((data) => setAllMsgs(data))
                .catch(err => console.log(err))
        }
    }, [studentId])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setAllMsgs((msgs) => { return [...msgs, data] })
        })
    }, [socket])


    const joinRoom = () => {
        userData.admin ? socket.emit("join_room", activeStudent.user_id) : socket.emit("join_room", userData.user_id)
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

        if (inputValue.content.length === 0) { return setErrorMessage(true) }
        setErrorMessage(false)
        setShowEmojiPicker(false)

        let msgData = {
            student_id: studentId,
            author_id: userData.user_id,
            author_name: `${userData.first} ${userData.last}`,
            content: inputValue.content,
            date_time: new Date().toUTCString()
        }

        // console.log(msgData)
        setAllMsgs((msgs) => [...msgs, msgData]
        )

        await socket.emit("send_message", msgData)

        setInputValue(() => {
            return {
                content: ''
            }
        })

    }

    const hideMsg = {
        "display": 'none'
    }
    const showMsg = {
        "display": 'flex'
    }

    return (
        // <div className='chatModalContainer'>

        <div className='chatContainer'>

            <ScrollToBottom className='scroll'>
                <div className='chatBody'>

                    {
                        allMsgs.map((elem, index) => {
                            return (<>
                                <div className={elem.author_id === userData.user_id ? 'rightMsg' : ' leftMsg'} key={index}>
                                    <p className="msgContent">{elem.content}</p>
                                    <p className='msgFooter'>{new Date(elem.date_time).toLocaleString()}</p>
                                </div>
                                <p className={elem.author_id === userData.user_id ? 'rightAuthor msgFooter' : ' leftAuthor msgFooter'}>{elem.author_name}</p>
                            </>

                            )
                        })
                    }
                </div>
            </ScrollToBottom>
            <span className="msgErr" style={errorMessage ? showMsg : hideMsg}>Can't send an empty message. Please enter a message below.</span>
            <div className='chatFooter'>
                <input
                    className='inputBox'
                    type='text'
                    placeholder='Type your msg here...'
                    name="content"
                    value={inputValue.content}
                    onChange={handleChange}
                    onKeyPress={(e) => { e.key === 'Enter' && handleClick() }}
                />
                <BsFillArrowRightCircleFill className="sendMsgBtn" onClick={handleClick} />

                <MdAddReaction className="emojiBtn" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
            </div>
            {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} className='emojiPicker' />}
        </div>


        // </div >
    )
}

export default ChatModal