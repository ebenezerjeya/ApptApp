import React, { useState } from "react";
import "../css/HomePage.css"


export default function HomePage(props) {

    function logOut() {
        fetch(`http://localhost:8080/student/loginAuth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "logout",
                password: "",
            }),
        })
    }

    return(
        <div className="homeWrapper">
            <div className="sidebar">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="" className="simple-text">AppointMeet</a>
                    </div>
                    <ul className="nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>User Profile</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-notes"></i>
                                <p>My Schedule</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-pin-3"></i>
                                <p>Maps</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-bell-55"></i>
                                <p>Notifications</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="/" onClick={logOut}>
                                <i className="nc-icon nc-bell-55"></i>
                                <p>Log Out</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="body">
                <p> Name: </p>
                <p> ID: </p>
            </div>
        </div>
    )
}
