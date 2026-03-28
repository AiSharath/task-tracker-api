import React from "react"
import {useNavigate} from "react-router-dom"
import "./Navbar.css"

function Navbar(){

    const navigate=useNavigate()
    return(
        <>
            <div className="navbar">
                <p className="heading">TaskFlow</p>
                <div className="buttons">
                    <button className="sign-in" onClick={()=>navigate("/login")}>Sign in</button>
                    <button className="sign-up" onClick={()=>navigate("/register")}>Sign Up</button>
                </div>
            </div>
            <hr/>
        </>
    )
}

export default Navbar;