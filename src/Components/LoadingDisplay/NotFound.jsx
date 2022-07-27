import React from "react";
import '../../StyleSheets/Loading.css'
import { Triangle } from 'react-loader-spinner'


const NotFound = () => {
    return (
        <div className="notFoundContainer">

            <h1 className="notFoundTitle">Page Not Found !</h1>

            <Triangle
                width="300"
                height="300"
                color="#eee"
            />

        </div>
    )
}

export default NotFound