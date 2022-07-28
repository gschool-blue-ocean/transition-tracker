import '../../StyleSheets/ChatModal.css'
import React, { useState, useContext, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import LoginContext from '../../Context/LoginContext'
import Picker from 'emoji-picker-react'
import IoAddCircleOutline from 'react-icons/io'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai"


function ChatModal({ socket }) {
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

        if (inputValue.content.length === 0) { return setErrorMessage(true) }
        setErrorMessage(false)
        setShowEmojiPicker(false)
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

    const hideMsg = {
        "display": 'none'
    }
    const showMsg = {
        "display": 'flex'
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
                                        <p className="msgContent">{elem.content}</p>
                                        <p className='msgFooter'>{elem.date_time}</p>
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
                    <AiFillPlusCircle className="emojiBtn" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                </div>

                {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}

            </div>


        </div >
    )
}

export default ChatModal