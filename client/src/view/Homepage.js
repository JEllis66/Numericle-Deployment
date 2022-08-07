import React, {useState} from "react";
import Navigation from "../components/Navigation";
import Main from "../components/Main";


const Homepage = (props) => {


    return (
        <div>
            <Navigation/>
            <hr id="topHR" className="my-0"/>
            <Main/>
        </div>
    )



}

export default Homepage;