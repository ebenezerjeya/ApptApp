import React, {useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../css/HomePage.css"

export function logOut() {
    sessionStorage.setItem("isAuthenticated", "false");
}

export default function ProfessorAvailableTimes(props) {
    const [availableTimesExist, setAvailableTimesExist] = useState(false);
    const [availableTimes, setAvailableTimes] = useState({
        availableTimes: [],
        available_ID: null,
        location: null,
        day: null,
        start_time: null,
        end_time: null,
        date: null,
        available: null,
        professor_ID: null,

    });

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        const link = "http://localhost:8080/available_times/" + sessionStorage.getItem("id").toString();
        console.log(link);
        const res = await fetch(link);
        res.json()
            .then(data => {
                if (data == null || data.length === 0)
                    setAvailableTimesExist(false);
                else {
                    setAvailableTimesExist(true);
                    console.log(data);
                    setAvailableTimes(data);
                }
            })
    }

    function deleteAvailableTimes(id) {
        const link = "http://localhost:8080/available_times/" + id;

        fetch(link, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    // display when no available times exist
    const noAppt = () =>
        <div>
            <span className="margin-auto"> You currently have no available times... </span>
        </div>;

    const trThStyle = {
        borderBottom: '1px solid #dddddd',
        textAlign: 'left',
    };

    // display available times
    const showAppt = () =>
        <div>
            <p>
                <table style={{width: "100%"}}>
                    <thead style={trThStyle}>
                    <tr>
                        <th style={{padding: '10px'}}>Location</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                        <th></th>

                    </tr>
                    </thead>

                    {
                        Array.isArray(availableTimes) && availableTimes.map(aT =>
                            <tbody style={trThStyle}>
                            <tr key={aT.available_ID}>
                                <td style={{padding: '5px'}}> {aT.location}</td>
                                <td>{aT.day}</td>
                                <td>{aT.start_time}</td>
                                <td>{aT.end_time}</td>
                                <td>{aT.date}</td>
                                <td><Button type="button" onClick={() => {
                                    if (window.confirm('Are you sure you wish to remove this appointment?')) deleteAvailableTimes(aT.available_ID)
                                }}>Delete</Button></td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </p>
        </div>;

    return (
        <div className="homeWrapper">
            <div className="sidebar position-block">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="" className="simple-text">AppointMeet</a>
                    </div>
                    <ul className="nav">
                        <li>
                            <a className="nav-link" href="/profHome">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/profHome/availableTimes">
                                <i className="nc-icon nc-pin-3"></i>
                                <p>Available Times</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-pin-3"></i>
                                <p>Maps</p>
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
            <div className="Header-old header-logged-in js-details-container Details position-block f4 py-2 myHeader"
                 role="banner">
                <div className="container-xl d-lg-flex flex-items-center p-responsive flex-justify-between">
                    <div className="d-flex  flex-items-center">
                    </div>
                    <div className="d-flex flex-items-center right-0 flex-auto signUpbtn">
                    </div>
                </div>
            </div>
            <div className="position-block myBody">
                <span className="sectionTitles"> My Schedule </span>
                <div className="mySchedule">
                    {availableTimesExist ? showAppt() : noAppt()}
                </div>
            </div>
        </div>
    )
}