import React from 'react'
import { Triangle } from 'react-loader-spinner'
import ReactDOM from 'react-dom'
import style from '../styles/Loading.module.css'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export const Loading = () => {

    return ReactDOM.createPortal(
        <div className={`${style.modalContainer} ${style.loadingContainer}`}>
            <div className={style.loadingDiv}>
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
    typeof document !== "undefined" && document.getElementById("portal")
    )
}



export const NotFound = () => {
    return (
        <div className={style.notFoundContainer}>

            <h1 className={style.notFoundTitle}>Page Not Found !</h1>

            <Triangle
                width="300"
                height="300"
                color="#eee"
            />

        </div>
    )
}

