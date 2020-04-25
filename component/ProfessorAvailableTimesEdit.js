import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import { Form, Button, FormGroup } from "react-bootstrap";
import Select from "react-select";
import { useHistory } from 'react-router-dom'

export function logOut() {
    sessionStorage.setItem("isAuthenticated", "false");
}

export default function ProfessorAvailableTimesEdit() {
    const [selectedDate, setSelectedDate] = useState({ value: 'Date', label: 'Select Date'});
    const [selectedTime, setSelectedTime] = useState({ value: 'Time', label: 'Select Time'});

    const timeOptions = [
        { value: '08:00:00', label: '08:00:00'},
        { value: '08:30:00', label: '08:30:00'},
        { value: '09:00:00', label: '09:00:00'},
        { value: '09:30:00', label: '09:30:00'},
        { value: '10:00:00', label: '10:00:00'},
        { value: '10:30:00', label: '10:30:00'},
        { value: '11:00:00', label: '11:00:00'},
        { value: '11:30:00', label: '11:30:00'},
        { value: '12:00:00', label: '12:00:00'},
        { value: '12:30:00', label: '12:30:00'},
        { value: '13:00:00', label: '13:00:00'},
        { value: '13:30:00', label: '13:30:00'},
        { value: '14:00:00', label: '14:00:00'},
        { value: '14:30:00', label: '14:30:00'},
        { value: '15:00:00', label: '15:00:00'},
        { value: '15:30:00', label: '15:30:00'},
        { value: '16:00:00', label: '16:00:00'},
        { value: '16:30:00', label: '16:30:00'},
        { value: '17:00:00', label: '17:00:00'},
        { value: '17:30:00', label: '17:30:00'},
        { value: '18:00:00', label: '18:00:00'},
        { value: '18:30:00', label: '18:30:00'},
        { value: '19:00:00', label: '19:00:00'},
        { value: '19:30:00', label: '19:30:00'},
        { value: '20:00:00', label: '20:00:00'},
        { value: '20:30:00', label: '20:30:00'},
    ];

    const handleChange = selectedTime => {
        console.log(selectedTime);
        setSelectedTime(selectedTime);
    };

    const handleDate = selectedDate => {
        console.log(selectedDate.target.value);
        setSelectedDate({value: selectedDate.target.value, label: selectedDate.target.value});
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Excuse me tf");
        const words = selectedTime.label.split(" - ");

        fetch(`http://localhost:8080/available_times`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: null,
                day: null,
                start_time: words[0],
                end_time: words[1],
                date: selectedDate.value,
                available: null,
                professor_ID: sessionStorage.getItem("id").toString(),
            }),
        });
    }

    function populateArray(array) {
        for (let i = 0; i < array.length-1; i++) {
            array[i].label = array[i].value + " - " + array[i+1].value;
        }
    }

    useEffect(() => {
        populateArray(timeOptions);
    });

    // use history to display and record the previous page
    let history = useHistory();

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
                                <i className="nc-icon nc-chart-pie-35"/>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/profHome/availableTimes">
                                <i className="nc-icon nc-pin-3"/>
                                <p>Available Times</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-pin-3"/>
                                <p>Maps</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="/" onClick={logOut}>
                                <i className="nc-icon nc-bell-55"/>
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
                <span className="sectionTitles"> Add New Time: </span>
                <div className="mySchedule">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label>Pick Date: </Form.Label>
                            <Form.Control type="date" placeholder="date"
                                          onChange={handleDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Pick Time: </label>
                            <Select
                                value={selectedTime}
                                defaultValue={timeOptions[0]}
                                label="Single select"
                                onChange={handleChange}
                                options={timeOptions}

                                theme={theme => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'lightgrey',
                                        primary: 'black',
                                    },
                                })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" onClick={() => history.goBack()}>Save</Button>
                            <Button onClick={() => history.goBack()}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    )
}