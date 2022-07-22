import React from 'react'
import { Triangle } from 'react-loader-spinner'
import ReactDOM from 'react-dom'
import '../../StyleSheets/Loading.css'


function Loading() {

    return ReactDOM.createPortal(
        <div className='modalContainer loadingContainer'>
            <div className='loadingDiv'>
                <Triangle
                    height="300"
                    width="300"
                    color='rgba(233, 132, 15, 0.5)'
                    ariaLabel='Loading' />
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default Loading