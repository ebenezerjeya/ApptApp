import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../css/HomePage.css"

// logout function
export function logOut() {
    const link = "http://localhost:8080/student/" + sessionStorage.getItem("id").toString() + "/loginAuth";

    fetch(link, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: "logout",
            password: "",
        }),
    });

    sessionStorage.setItem("isAuthenticated", "false");
}

export default function HomePage() {
    const [apptExist, setApptExist] = useState(false);
    const [appointments, setAppointments] = useState({
        appointments: [],
        appointment_id: null,
        professor_Email: null,
        student_Email: null,
        course_code: null,
        purpose: null,
        office: null,
        start_time: null,
        end_time: null,
        appointment_description: null,
        student_fname: null,
        student_lname: null,
        sent: null,
        appointment_date: null,
        professor_name: null,
    });

    const [professorList, setProfessorList] = useState({
        professorList: [],
        professor_id: null,
        professor_name: null,
        professor_email: null,
        warr_office: null,
        mic_office: null,
    });

    useEffect(() => {
        fetchData();
        fetchProfessors();
    });

    async function fetchProfessors() {
        fetch(`http://localhost:8080/professors`)
            .then(response => response.json())
            .then(data => {
                setProfessorList(data);
            });
    }

    async function fetchData() {
        const link = "http://localhost:8080/appointment/" + sessionStorage.getItem("id").toString();

        const res = await fetch(link);
        res.json()
            .then(data => {
                if (data == null || data.length === 0)
                    setApptExist(false);
                else {
                    setApptExist(true);
                    setAppointments(data);
                }
            })
    }

    function getProfName(email) {
        for (let step = 0; step < professorList.length; step++) {
            if (Object.values(professorList[step])[2] === email)
                return Object.values(professorList[step])[1];
        }
    }

    function deleteAppointment(id) {
        const link = "http://localhost:8080/appointment/" + id;

        fetch(link, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    // display when no appointments exist
    const noAppt = () =>
        <div>
            <span className="margin-auto"> You currently have no upcoming scheduled appointments... </span>
        </div>;

    const trThStyle = {
        borderBottom: '1px solid #dddddd',
        textAlign: 'left',
    };

    // display appointments
    const showAppt = () =>
        <div>
            <p>
                <table style={{width: "100%"}}>
                    <thead style ={trThStyle}>
                    <tr>
                        <th style={{padding:'10px'}}>Course Code</th>
                        <th>Purpose</th>
                        <th>Office</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Professor Email</th>
                        <th>Professor Name</th>
                    </tr>
                    </thead>

                    {
                        Array.isArray(appointments) && appointments.map(appt =>
                            <tbody style={trThStyle}>
                            <tr key={appt.appointment_id}>
                                <td style={{padding: '10px'}}> {appt.course_code}</td>
                                <td>{appt.purpose}</td>
                                <td>{appt.office}</td>
                                <td>{appt.appointment_date}</td>
                                <td>{appt.start_time}</td>
                                <td>{appt.end_time}</td>
                                <td>{appt.professor_Email}</td>
                                <td>{getProfName(appt.professor_Email)}</td>
                                <td><Button type="button" onClick={() => {if (window.confirm('Are you sure you wish to delete this appointment?')) deleteAppointment(appt.appointment_id)}}>Cancel Appointment</Button></td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </p>
        </div>;

    return(
        <div className="homeWrapper">
            <div className="sidebar position-block">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="" className="simple-text">AppointMeet</a>
                    </div>
                    <ul className="nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="/home/profile">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>User Profile</p>
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
            <div className="Header-old header-logged-in js-details-container Details position-block f4 py-2 myHeader" role="banner">
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
                    {apptExist ? showAppt() : noAppt()}
                </div>
                <Button className="apptBtn" type="button" onClick={()=> window.open("/form", "_blank")}>New Appointment</Button>
            </div>
        </div>
    )
}