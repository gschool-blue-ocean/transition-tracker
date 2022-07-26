import React from 'react'
import { Triangle } from 'react-loader-spinner'
import ReactDOM from 'react-dom'
import '../../StyleSheets/Loading.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Loading() {

    return ReactDOM.createPortal(
        <div className='modalContainer loadingContainer'>
            <div className='loadingDiv'>
                <Triangle
                    height="400"
                    width="400"
                    // color='rgba(233, 132, 15, 0.5)'
                    // color='rgba(11, 71, 155, 0.943)'
                    color='#eee'
                    ariaLabel='Loading'
                />
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default Loading