import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class AvailableTimesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            available_times: [],
            professor_id: null,
            start_time: null,
            end_time: null,
            location: null,
            available: null,
            day: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/available_times`)
            .then(response => response.json())
            .then(data => this.setState({available_times: data}));
    }

    render() {
        return (
            <div>
                <h2>Available Times:</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th>Professor ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Office Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.available_times.map(
                            available_times =>
                                <tr key={available_times.professor_id}>
                                    <td>{available_times.day}</td>
                                    <td>{available_times.location}</td>
                                    <td>{available_times.start_time}</td>
                                    <td>{available_times.end_time}</td>
                                    <td>{available_times.warr_office}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AvailableTimesList;